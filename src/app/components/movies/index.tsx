import { useCeramicContext } from "@/context";
import { AuthContext } from "@/context/auth";
import { getRecommendedItems } from "@/utils/recommend";
import Image from "next/image";
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
};

type Rating = {
  userId: string;
  movieId: string;
  rating: number;
};

export const Movies = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [ratings, setRatings] = useState<Record<string, any> | undefined>();
  const [users, setUsers] = useState<User[] | undefined>();
  const { isLoggedIn } = useContext(AuthContext);
  const recommendations: MutableRefObject<any[]> = useRef([]);

  const getMovies = useCallback(async () => {
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
    console.log(res?.data?.movieIndex?.edges);

    const fetchedMovies: Movie[] = [];

    res?.data?.movieIndex?.edges.map((movie: any) => {
      if (movie.node) {
        fetchedMovies.push({
          id: movie.node.id,
          title: movie.node.title,
          overview: movie.node.overview,
          release_date: movie.node.release_date,
        });
      }
    });
    setMovies(fetchedMovies);
  }, [composeClient]);

  const getUsers = useCallback(async () => {
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
    console.log(res?.data?.userIndex?.edges);

    const fetchedUsers: User[] = [];

    res?.data?.userIndex?.edges.map((u: any) => {
      if (u.node) {
        fetchedUsers.push({
          id: u.node.id,
          name: u.node.name,
          username: u.node.rating,
        });
      }
    });
    setUsers(fetchedUsers);
  }, [composeClient]);

  const fillRatingMatrix = (
    ratingArr: Record<string, any>,
    value: number,
    userId: string,
    movieId: string
  ) => {
    if (ratingArr[userId] !== undefined) {
      ratingArr[userId][movieId] = value;
    } else {
      ratingArr[userId] = [];
      ratingArr[userId][movieId] = value;
    }
  };

  const getRatings = useCallback(async () => {
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
    console.log(res?.data?.ratingIndex?.edges);

    const fetchedRatings: Rating[] = [];
    const ratingsArr: Record<string, any> = [];

    res?.data?.ratingIndex?.edges.map((rating: any) => {
      if (rating.node) {
        const ratingItem = {
          userId: rating.node.userId,
          movieId: rating.node.movieId,
          rating: rating.node.rating,
        };
        fetchedRatings.push(ratingItem);
        fillRatingMatrix(
          ratingsArr,
          ratingItem.rating,
          ratingItem.userId,
          ratingItem.movieId
        );
      }
    });
    console.log("Ratings are:");
    console.log(ratingsArr);
    setRatings(ratingsArr);
  }, [composeClient]);

  useEffect(() => {
    if (isLoggedIn && ceramic.did) {
      setTimeout(() => {
        getMovies();
        getUsers();
        getRatings();
      }, 1000); // Wait for auth
    }
  }, [getMovies, getUsers, getRatings, isLoggedIn, ceramic.did]);

  useEffect(() => {
    if (ratings && users && movies) {
      recommendations.current = getRecommendedItems(
        ratings,
        users[0].id,
        users,
        movies
      ); // TODO: refactor this somewhere else
      console.log("Recommendations are: ", recommendations.current);
    }
  }, [ratings, users, movies]);

  return (
    <div>
      <div>
        <h2>Recommended</h2>
        {recommendations.current?.map((r, index) => (
          <p key={index}>Recommend: {r}</p>
        ))}
      </div>
      <div>
        <h2>All movies</h2>
        {movies?.map((movie, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <Image
                className="rounded-t-lg"
                src="movie-generic.png"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {movie.overview}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Like
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
