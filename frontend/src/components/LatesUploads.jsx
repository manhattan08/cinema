import React, { useState, useEffect } from "react";
import { useMovies, useNotification } from "../hooks";
import {MovieListItem} from "./MovieListItem";

export default function LatestUploads() {
    const { fetchLatestUploads, latestUploads } = useMovies();
    const handleUIUpdate = () => fetchLatestUploads();

    useEffect(() => {
        fetchLatestUploads();
    }, []);

    return (
        <>
            <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
                <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
                    Recent Uploads
                </h1>

                <div className="space-y-3">
                    {latestUploads.map((movie) => {
                        return (
                            <MovieListItem
                                key={movie.id}
                                movie={movie}
                                afterDelete={handleUIUpdate}
                                afterUpdate={handleUIUpdate}
                            />
                        );
                    })}
                </div>
            </div>

        </>
    );
}
