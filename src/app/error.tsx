"use client";

import Image from "next/image";

// import Image from "next/image";

export default function GlobalError() {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-65px)] justify-center text-center px-6 py-12">
      <div className="mb-6">
        <Image
          width={384}
          height={400}
          alt="Page not found"
          className="w-96 h-auto mx-auto"
          src="/assets/robotic-troubleshoot-ai.webp"
        />
      </div>
      <p className="text-xl text-gray-700 mb-8">
        Oops! Something went wrong on our server.
      </p>
    </div>
  );
}
