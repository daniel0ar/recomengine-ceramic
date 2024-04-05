import { useCeramicContext } from "@/context";
import { AuthContext } from "@/context/auth";
import { getRecommendedItems } from "@/utils/recommend";
import { MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from "react";

type Movie = {
  id: string;
  title: string;
  overview?: string;
  release_date?: string;
};

type User = {
  id: string;
  name: string;
  username: string;
}

type Rating = {
  userId: string;
  movieId: string;
  rating: number;
}

export const Movies = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [ratings, setRatings] = useState<Record<string, any> | undefined>();
  const [users, setUsers] = useState<User[] | undefined>();
  const { isLoggedIn } = useContext(AuthContext);
  let recommendations: MutableRefObject<any[]> = useRef([]);

  const getMovies = useCallback(async () => {
    if (ceramic.did !== undefined) {
      const res = await composeClient.executeQuery(`
      query Movies{
        movieIndex(last:10){
          edges{
            node {
              id
              title
              overview
              release_date
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
            id: movie.node.id,
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

  const getUsers = useCallback(async () => {
    if (ceramic.did !== undefined) {
      const res = await composeClient.executeQuery(`
      query Users{
        userIndex(last:10){
          edges{
            node {
              id
              name
              username
            }
          }
        }
      }
      `);
      console.log(res?.data?.userIndex?.edges)

      const fetchedUsers: User[] = []

      res?.data?.userIndex?.edges.map((u: any) => {
        if (u.node) {
          fetchedUsers.push({
            id: u.node.id,
            name: u.node.name,
            username: u.node.rating
          })
        }
      })
      setUsers(fetchedUsers);
    } else {
      console.log("ceramic did invalid");
    }
  }, [ceramic.did, composeClient]);

  const fillRatingMatrix = (ratingArr: Record<string, any>, value: number, userId: string, movieId: string) => {
    if (ratingArr[userId] !== undefined) {
        ratingArr[userId][movieId] = value;
    } else {
        ratingArr[userId] = [];
        ratingArr[userId][movieId] = value;
    }
}

  const getRatings = useCallback(async () => {
    if (ceramic.did !== undefined) {
      const res = await composeClient.executeQuery(`
      query Ratings{
        ratingIndex(last:100){
          edges{
            node {
              userId
              movieId
              rating
            }
          }
        }
      }
      `);
      console.log(res?.data?.ratingIndex?.edges)

      const fetchedRatings: Rating[] = []
      const ratingsArr: Record<string, any> = [];

      res?.data?.ratingIndex?.edges.map((rating: any) => {
        if (rating.node) {
          const ratingItem = {
            userId: rating.node.userId,
            movieId: rating.node.movieId,
            rating: rating.node.rating
          };
          fetchedRatings.push(ratingItem);
          fillRatingMatrix(ratingsArr, ratingItem.rating, ratingItem.userId, ratingItem.movieId);
        }
      })
      console.log("Ratings are:")
      console.log(ratingsArr);
      setRatings(ratingsArr);
    } else {
      console.log("ceramic did invalid");
    }
  }, [ceramic.did, composeClient]);

  useEffect(() => {
    if(isLoggedIn){
      setTimeout(() => {
        getMovies();
        getUsers();
        getRatings();
      }, 1000) // Wait for auth
    }
  }, [getMovies, getUsers, getRatings, isLoggedIn]);

  useEffect(() => {
    if (ratings && users && movies) {
      recommendations.current = getRecommendedItems(ratings, users[0].id, users, movies)
    }
  }, [ratings, users, movies])

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