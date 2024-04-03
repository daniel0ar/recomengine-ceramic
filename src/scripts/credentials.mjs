import { writeFile } from "fs";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from 'key-did-resolver'
import { readFileSync } from "fs";
import { fromString } from "uint8arrays/from-string";

export const RunCommands = async () => {
  const generateAdminKeyDid = async () => {
  const seed = readFileSync("admin.sk");
  const key = fromString(seed, "base16");
  const did = new DID({ resolver: getResolver(), provider: new Ed25519Provider(key) })
  await did.authenticate();
    return {
      seed,
      did,
    };
  };
  const generateLocalConfig = async (adminSeed, adminDid) => {
    const configData = {
      anchor: {},
      "http-api": {
        "cors-allowed-origins": [".*"],
        "admin-dids": [adminDid.id],
      },
      ipfs: {
        mode: "bundled",
      },
      logger: {
        "log-level": 2,
        "log-to-files": false,
      },
      metrics: {
        "metrics-exporter-enabled": false,
        "metrics-port": 9090,
      },
      network: {
        name: "inmemory",
      },
      node: {},
      "state-store": {
        mode: "fs",
        "local-directory": `${process.cwd()}/.ceramic/.ceramic/statestore/`,
      },
      indexing: {
        db: `sqlite://${process.cwd()}/.ceramic/indexing.sqlite`,
        "allow-queries-before-historical-sync": true,
        models: [],
      },
    };
    writeFile(
      `${process.cwd()}/composedb.config.json`,
      JSON.stringify(configData),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  };
  const { seed, did } = await generateAdminKeyDid();
  console.log(seed, did);
  await generateLocalConfig(seed, did);
};
RunCommands();
