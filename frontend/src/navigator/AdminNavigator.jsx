import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "../components/NotFound";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import Actors from "../components/admin/Actors";
import Navbar from "../components/admin/Navbar";
import Header from "../components/admin/Header";
import MovieUpload from "../components/admin/MovieUpload";
import ActorUpload from "../components/models/ActorUpload";
import SearchMovies from "../components/admin/SearchMovies";

const AdminNavigator = () => {
    const [showMovieUploadModal,setShowMovieUploadModal] = useState(false)
    const [showActorUploadModal,setShowActorUploadModal] = useState(false)

    const hideMovieUploadModal = () => {
        setShowMovieUploadModal(false)
    }
    const displayMovieUploadModal = () => {
        setShowMovieUploadModal(true)
    }
    const hideActorUploadModal = () => {
        setShowActorUploadModal(false)
    }
    const displayActorUploadModal = () => {
        setShowActorUploadModal(true)
    }
    return (
        <>
            <div className="flex dark:bg-primary bg-white">
                <Navbar />
                <div className="flex-1 max-w-screen-xl">
                    <Header onAddMovieClick={displayMovieUploadModal} onAddActorClick={displayActorUploadModal} />
                    <Routes>
                        <Route path="/" element={<Dashboard/>} />
                        <Route path="/movies" element={<Movies/>} />
                        <Route path="/actors" element={<Actors/>} />
                        <Route path="/search" element={<SearchMovies />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
            <MovieUpload
                visible={showMovieUploadModal}
                onClose={hideMovieUploadModal}
            />
            <ActorUpload
                visible={showActorUploadModal}
                onClose={hideActorUploadModal}
            />
        </>
    );
};

export default AdminNavigator;