import { movies } from "@/data/movies";
import { users } from "@/data/users";
import { ComposeClient } from "@composedb/client";

const createMovies = (composeClient: ComposeClient) => {
  const ids: string[] = [];
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
          id
          title
          overview
          release_date
        }
      }
    }
    `);

    console.log(res);
    ids.push(res.data?.createMovie.document.id)
  });
  return ids;
};

const createUsers = (composeClient: ComposeClient) => {
  const ids: string[] = [];
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
          id
          name
          username
        }
      }
    }
    `);
    console.log(res);
    ids.push(res.data?.createUser.document.id)
  });
  return ids;
};

const createRatings = async (composeClient: ComposeClient) => {
  const movieIds = createMovies(composeClient);
  console.log("Movie ids: ", movieIds);
  const userIds = createUsers(composeClient);
  console.log("User ids: ", userIds);
  let ratingsArr: number[][] = [];
  let rows = 0;
  let columns = 0;
  setTimeout(async () => {
    rows = userIds.length;
    console.log("Rows: ", rows)
    columns = movieIds.length;
    console.log("Columns: ", columns)
    const min = 0;
    const max = 1;
    // creating two-dimensional array
  for (let i = 0; i < rows; i++) {
    ratingsArr[i] = [];
    for (let j = 0; j < columns; j++) {
      const randomRating = Math.floor(Math.random() * (max - min + 1) + min);
      ratingsArr[i][j] = randomRating;
      console.log("Randon rating is: ", ratingsArr[i][j])
      const res = await composeClient.executeQuery(`
        mutation createRating {
          createRating(input: {
            content: {
              rating: ${randomRating}
              movieId: "${movieIds[j]}"
              userId: "${userIds[i]}"
            }
          })
          {
            document {
              id
              rating
            }
          }
        }
        `);
      console.log(res);
    }
  }
  return ratingsArr;
  }, 2000);

  
}



export const fillDatabaste = async (composeClient: ComposeClient) => {
  const ratings = await createRatings(composeClient)
  console.log("Ratings are: ")
  console.log(ratings);
}