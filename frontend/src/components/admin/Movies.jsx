import React, { useEffect } from "react";
import { useMovies } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";
import {MovieListItem} from "../MovieListItem";

const limit = 10;
let currentPageNo = 0;

export default function Movies() {
    const {
        fetchMovies,
        movies: newMovies,
        fetchPrevPage,
        fetchNextPage,
    } = useMovies();

    const handleUIUpdate = () => {
        fetchMovies();
    };

    useEffect(() => {
        fetchMovies(currentPageNo);
    }, []);

    return (
        <>
            <div className="space-y-3 p-5">
                {newMovies.map((movie) => {
                    return (
                        <MovieListItem
                            key={movie.id}
                            movie={movie}
                            afterDelete={handleUIUpdate}
                            afterUpdate={handleUIUpdate}
                        />
                    );
                })}

                <NextAndPrevButton
                    className="mt-5"
                    onNextClick={fetchNextPage}
                    onPrevClick={fetchPrevPage}
                />
            </div>

        </>
    );
}
