"use client";
import { CeramicWrapper } from "@/context";
import AuthPrompt from "./auth";
import { AuthProvider } from "@/context/auth";
import { Movies } from "./movies";

export default function Home() {

  return (
    <AuthProvider>
        <AuthPrompt />
        <div className="container">
          <CeramicWrapper>
              <div>
                <Movies></Movies>
              </div>
          </CeramicWrapper>
        </div> 
    </AuthProvider>
  );
}
