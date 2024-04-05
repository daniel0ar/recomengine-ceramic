import { useCeramicContext } from "@/context";
import { AuthContext } from "@/context/auth";
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
    if(isLoggedIn){
      setTimeout(() => {
        getMovies();
      }, 1000) // Wait for auth
    }
  }, [getMovies, isLoggedIn]);

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