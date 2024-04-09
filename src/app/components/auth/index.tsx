"use client";
import React, { useContext, useEffect, useState } from "react";
import { authenticateCeramic } from "@/utils/auth";
import { useCeramicContext } from "@/context";
import { AuthContext } from "@/context/auth";

const AuthPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const clients = useCeramicContext();
  const { login } = useContext(AuthContext);
  const { ceramic, composeClient } = clients;

  const handleKeyDid = () => {
    localStorage.setItem("ceramic:auth_type", "key");
    authenticateCeramic(ceramic, composeClient);
    login({ id: "kjzl6kcym7w8yas8smqz7ndk83ws3kwdediogf0c2n7j954wyf2t1ijglkbmi5s", name: "User" });
    setIsVisible(false);
  };

  const handleEthPkh = () => {
    localStorage.setItem("ceramic:auth_type", "eth");
    authenticateCeramic(ceramic, composeClient);
    login({ id: "1", name: "User" });
    setIsVisible(false);
  };

  useEffect(() => {
    if (localStorage.getItem("logged_in") == "true") {
      authenticateCeramic(ceramic, composeClient);
      login({ id: "kjzl6kcym7w8yas8smqz7ndk83ws3kwdediogf0c2n7j954wyf2t1ijglkbmi5s", name: "User" });
    } else {
      setIsVisible(true);
    }
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="relative z-50 text-black">
          <div className="fixed inset-0 bg-[rgb(25,33,77,0.46)] transition-opacity">
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative p-6 bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col">
                    <div className="flex flex-col items-center">
                      <h2 className="text-xl">Authenticate</h2>
                      <div className="flex flex-row gap-3 mb-3">
                        <button
                          className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-bue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                          onClick={handleKeyDid}
                        >
                          Key DID
                        </button>
                        <button
                          className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-bue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                          onClick={handleEthPkh}
                        >
                          Ethereum DID PKH
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-muted">
                      <strong>Key DID:</strong> A DID generated by Ceramic that
                      is stored in your browser&apos;s local storage. It should
                      already be generated during setup process.
                      <br />
                      <strong>Ethereum DID PKH:</strong> A DID generated by your
                      wallet (in simpler terms: login with MetaMask).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPrompt;
