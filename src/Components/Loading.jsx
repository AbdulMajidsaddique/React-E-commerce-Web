import React from "react";

const Loading = () => {
  return (
    <div class="flex items-center justify-center h-screen relative left-[40%]">
      <div class="text-center">
        <div class="w-36 h-36 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 class="text-zinc-900 dark:text-white mt-4">Loading...</h2>
        <p class="text-zinc-600 dark:text-zinc-400">
          Your adventure is about to begin
        </p>
      </div>
    </div>
  );
};

export default Loading;
