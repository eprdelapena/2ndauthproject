import Image from "next/image";
import { Button } from "@/components/ui/button";
import Login from "@/components/builtin/Login";


export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center bg-sky-700 h-[100%]">
        <div> 
          <h1 className="text-6xl font-semibold text-white drop-shadow-lg">
            🔒 Authentication Codebase
          </h1>
          <p className="text-white text-lg text-center drop-shadow-lg pt-2">
            A codebase for authentication using Next Auth
          </p>
          <div className="pt-5 flex justify-center">
            <Login/>
          </div>
        </div>

      </main>
    </>
  );
}
