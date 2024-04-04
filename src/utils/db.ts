import { movies } from "@/data/movies";
import { users } from "@/data/users";
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

const createUsers = (composeClient: ComposeClient) => {
  console.log("CREATING")
  users?.map(async (u) => {
    const res = await composeClient.executeQuery(`
    mutation createUser {
      createUser(input: {
        content: {
          name: "${u.name}"
          username: "${u.username}"
        }
      })
      {
        document {
          name
          username
        }
      }
    }
    `);

    console.log(res);
  });
};