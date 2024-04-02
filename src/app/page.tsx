"use client"
import { useCeramicContext, CeramicWrapper } from "@/context";
import { authenticateCeramic } from "@/utils/auth";
import { useEffect, useState } from "react";
import AuthPrompt from "./auth";


type Profile = {
  id?: any;
  name?: string;
  username?: string;
  description?: string;
  gender?: string;
  emoji?: string;
};

export default function Home() {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [profiles, setProfiles] = useState<Profile[] | undefined>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);

  const getProfiles = async () => {
    if (ceramic.did !== undefined) {
      const res = await composeClient.executeQuery(`
      query {
        basicProfileIndex(first: 10) {
          edges {
            node {
              id
              author{
                id
              }
              username
              description
              gender
              emoji
            }
          }
        }
      }
      `);

      console.log(res?.data?.basicProfileIndex?.edges);
    }
    else {
      console.log("ceramic did invalid")
    }
  };
  
  const isLogged = () => {
    return localStorage.getItem("logged_in") == "true";
  };
  
  const handleOpen = () => {
    if (!isLogged()) {
      setIsAuthModalOpen(true);
    } else {
      authenticateCeramic(ceramic, composeClient);
      setIsAuthModalOpen(false);
      getProfiles();
    }
  };
  
  useEffect(() => {
    handleOpen()
  }, [isAuthModalOpen]);

  return (
    <div>
      {isAuthModalOpen && <AuthPrompt />}
      <div className='container'>
        <CeramicWrapper>
          <div className='body'>
            {profiles?.map((p, index) => <h2 key={index}>{p?.name}</h2>)}
          </div>
        </CeramicWrapper>
      </div>
    </div>
  );
}
