import React, { useState } from "react";
import Image from "next/image";
import { Movie } from './index'

type Props = {
    index: number;
    movie: Movie;
};

export const MovieCard = ({index, movie}: Props) => {
    const [ isLiked, setIsLiked ] = useState(false);
    const handleLike = () => {
        
    }

    const handleRemoveLike = () => {

    }

  return (
    <div
      key={index}
      className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <Image
        className="rounded-t-lg"
        src="/movie-generic.png"
        alt=""
        width={32}
        height={32}
      />
      <button
        className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!isLiked) handleLike();
          else handleRemoveLike();
        }}
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isLiked ? "currentColor" : "rgb(86 86 86 / 0.7)"}
            aria-hidden="true"
            className="w-6 h-6 stroke-white stroke-2"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
          </svg>
        </span>
      </button>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {movie.overview?.slice(0, 30)}...
        </p>
      </div>
    </div>
  );
};
