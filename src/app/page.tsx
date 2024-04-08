"use client";
import { CeramicWrapper } from "@/context";
import AuthPrompt from "./components/auth";
import { AuthProvider } from "@/context/auth";
import Process from "./process/page";

export default function App() {

  return (
    <AuthProvider>
        <AuthPrompt />
        <div className="container">
          <CeramicWrapper>
              <div>
                <Process></Process>
              </div>
          </CeramicWrapper>
        </div> 
    </AuthProvider>
  );
}
