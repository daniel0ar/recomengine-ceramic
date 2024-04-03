import { data } from "./data";

const createMovies = () => {
  console.log("CREATING")
  data?.map(async (m) => {
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