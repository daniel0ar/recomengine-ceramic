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
  const [profile, setProfile] = useState<Profile | undefined>();

  const getProfile = async () => {
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            id
            basicProfile {
              id
              name
              username
            }
          }
        }
      `);
      localStorage.setItem("viewer", profile?.data?.viewer?.id);

      setProfile(profile?.data?.viewer?.basicProfile);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("logged_in")) {
      handleLogin();
      getProfile();
    }
  }, []);
  
  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient);
    await getProfile();
  };
  
  return (
    <div>
      <AuthPrompt />
      <div className='container'>
        <CeramicWrapper>
          <div className='body'>
            {profile?.name}
            {profile?.id}
          </div>
        </CeramicWrapper>
      </div>
    </div>
  );
}
