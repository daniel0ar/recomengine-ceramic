"use client";
import { CeramicWrapper } from "@/context";
import AuthPrompt from "./auth";
import { AuthProvider } from "@/context/auth";
import Home from "./pages/home";

export default function App() {

  return (
    <AuthProvider>
        <AuthPrompt />
        <div className="container">
          <CeramicWrapper>
              <div>
                <Home></Home>
              </div>
          </CeramicWrapper>
        </div> 
    </AuthProvider>
  );
}
