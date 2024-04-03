"use client";
import { useCeramicContext, CeramicWrapper } from "@/context";
import { authenticateCeramic } from "@/utils/auth";
import { useCallback, useEffect, useState } from "react";
import AuthPrompt from "./auth";

type Movie = {
  title: string;
  overview?: string;
  release_date?: string;
};

export default function Home() {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);

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

      console.log(res?.data?.movieIndex?.edges);
    } else {
      console.log("ceramic did invalid");
    }
  }, [ceramic.did, composeClient]);

  const isLogged = () => {
    return localStorage.getItem("logged_in") == "true";
  };

  const handleOpen = useCallback(() => {
    if (!isLogged()) {
      setIsAuthModalOpen(true);
    } else {
      authenticateCeramic(ceramic, composeClient);
      setIsAuthModalOpen(false);
      getMovies();
    }
  }, [ceramic, composeClient, getMovies]);

  useEffect(() => {
    handleOpen();
  }, [handleOpen]);

  return (
    <div>
      {isAuthModalOpen && <AuthPrompt />}
      <div className="container">
        <CeramicWrapper>
          <div className="body">
            {movies?.map((movie, index) => (
              <h2 key={index}>{movie?.title}</h2>
            ))}
          </div>
        </CeramicWrapper>
      </div>
    </div>
  );
}
