import React from "react";

export default function SpinLoader() {
  return (
    <div className="flex h-screen justify-center items-center bg-wcj-sand">
      <div className="animate-spin h-16 w-16 rounded-[50%] border-8 border-solid border-t-wcj-coral border-r-wcj-cyan border-b-wcj-red border-l-wcj-mint"></div>
    </div>
  );
}
