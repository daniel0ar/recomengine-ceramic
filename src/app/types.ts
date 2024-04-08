export type Movie = {
    id: string;
    title: string;
    overview?: string;
    release_date?: string;
  };
  
export type User = {
    id: string;
    name: string;
    username: string;
  };
  
export type Rating = {
    userId: string;
    movieId: string;
    rating: number;
  };