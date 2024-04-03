import { movies } from "@/data/movies";
import { ComposeClient } from "@composedb/client";

const createMovies = (composeClient: ComposeClient) => {
  console.log("CREATING")
  movies?.map(async (m) => {
    const res = await composeClient.executeQuery(`
    mutation createMovie {
      createMovie(input: {
        content: {
          title: "${m.title}"
          overview: "${m.overview}"
          release_date: "${m.release_date}"
        }
      })
      {
        document {
          title
          overview
          release_date
        }
      }
    }
    `);

    console.log(res);
  });
};