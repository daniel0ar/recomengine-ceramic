import { CeramicClient } from "@ceramicnetwork/http-client";
import {
  createComposite,
  readEncodedComposite,
  writeEncodedComposite,
  writeEncodedCompositeRuntime,
} from "@composedb/devtools-node";
import { Composite } from "@composedb/devtools";
import { DID } from 'dids'
import { getResolver } from 'key-did-resolver'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { readFileSync } from "fs";
import { fromString } from "uint8arrays/from-string";

const ceramic = new CeramicClient("http://localhost:7007");

/**
 * @param {Ora} spinner - to provide progress status.
 * @return {Promise<void>} - return void when composite finishes deploying.
 */
export const writeComposite = async (spinner) => {
  await authenticate();
  const moviesComposite = await createComposite(
    ceramic,
    "src/composites/00-movie.graphql"
  );

  const usersComposite = await createComposite(
    ceramic,
    "src/composites/01-user.graphql"
  );

  const ratingsSchema = readFileSync("src/composites/02-rating.graphql", {
    encoding: "utf-8",
  }).replace("$MOVIE_ID", moviesComposite.modelIDs[0])
    .replace("$USER_ID", usersComposite.modelIDs[0]);

  const ratingsComposite = await Composite.create({
    ceramic,
    schema: ratingsSchema,
  });

  const composite = Composite.from([
    moviesComposite,
    ratingsComposite
  ]);

  await writeEncodedComposite(composite, "src/__generated__/definition.json");
  spinner.info("creating composite for runtime usage");
  await writeEncodedCompositeRuntime(
    ceramic,
    "src/__generated__/definition.json",
    "src/__generated__/definition.js"
  );
  spinner.info("deploying composite");
  const deployComposite = await readEncodedComposite(
    ceramic,
    "src/__generated__/definition.json"
  );

  await deployComposite.startIndexingOn(ceramic);
  spinner.succeed("composite deployed & ready for use");
};

/**
 * Authenticating DID for publishing composite
 * @return {Promise<void>} - return void when DID is authenticated.
 */
const authenticate = async () => {
  const seed = readFileSync("admin.sk");
  const key = fromString(seed, "base16");
  const did = new DID({ resolver: getResolver(), provider: new Ed25519Provider(key) })
  did.authenticate()
  ceramic.did = did;
};
