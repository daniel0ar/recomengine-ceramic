import { useCeramicContext } from "@/context";
import { AuthContext } from "@/context/auth";
import { fillDatabaste } from "@/utils/db";
import { getRecommendedItems } from "@/utils/recommend";
import { MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from "react";

type Props = {}

type Movie = {
  title: string;
  overview?: string;
  release_date?: string;
};

export const Movies = (props: Props) => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const { isLoggedIn } = useContext(AuthContext);
  let recommendations: MutableRefObject<any[]> = useRef([]);

  const getMovies = useCallback(async () => {
    if (ceramic.did !== undefined) {
      const res = await composeClient.executeQuery(`
      query Movies{
        movieIndex(last:10){
          edges{
            node {
              title
            }
          }
        }
      }
      `);
      console.log(res?.data?.movieIndex?.edges)

      const fetchedMovies: Movie[] = []

      res?.data?.movieIndex?.edges.map((movie: any) => {
        if (movie.node) {
          fetchedMovies.push({
            title: movie.node.title,
            overview: movie.node.overview,
            release_date: movie.node.release_date
          })
        }
      })
      setMovies(fetchedMovies);
    } else {
      console.log("ceramic did invalid");
    }
  },[ceramic.did, composeClient]);

  useEffect(() => {
    const recommend = async () => {
      fillDatabaste(composeClient).then((res) => {
        console.log("Ratings before recommend is:")
        console.log(res)
        recommendations.current = getRecommendedItems(res, 5);
      }).catch(e => console.log("Error: ", e))
    };

    if(isLoggedIn){
      setTimeout(() => {
        getMovies();
        recommend();
      }, 1000) // Wait for auth
    }
  }, [composeClient, getMovies, isLoggedIn]);

  return (
    <div>
      <div>
        <h2>Recommended</h2>
        { recommendations.current?.map((r, index) => <p key={index}>Recommend: {r}</p>) }
      </div>
      <div>
        <h2>All movies</h2>
        {movies?.map((movie, index) => (
          <p key={index}>{movie?.title}</p>
        ))}
      </div>
    </div>
  )
}