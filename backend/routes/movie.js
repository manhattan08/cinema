const express = require("express");
const movieConrtoller = require("../controllers/movie");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { validateMovie, validate, validateTrailer} = require("../middlewares/validator");
const { parseData } = require("../utils/helper");
const router = express.Router();

router.post(
    "/upload-trailer",
    isAuth,
    isAdmin,
    uploadVideo.single("video"),
    movieConrtoller.uploadTrailer
);
router.post(
    "/create",
    isAuth,
    isAdmin,
    uploadImage.single("poster"),
    parseData,
    validateMovie,
    validateTrailer,
    validate,
    movieConrtoller.createMovie
);
router.patch(
    "/update/:movieId",
    isAuth,
    isAdmin,
    uploadImage.single("poster"),
    parseData,
    validateMovie,
    validate,
    movieConrtoller.updateMovie
);
router.get("/for-update/:movieId",isAuth,isAdmin,movieConrtoller.getMovieForUpdate)
router.delete("/:movieId", isAuth, isAdmin, movieConrtoller.removeMovie);
router.get('/movies',isAuth,isAdmin,movieConrtoller.getMovies)
router.get("/search",isAuth,isAdmin,movieConrtoller.searchMovies)

//for normal users
router.get("/latest-uploads", movieConrtoller.getLatestUploads)
router.get("/single/:movieId", movieConrtoller.getSingleMovie)
router.get("/related/:movieId", movieConrtoller.getRelatedMovies)
router.get("/top-rated", movieConrtoller.getTopRatedMovies)
router.get("/search-public", movieConrtoller.searchPublicMovies)

module.exports = router;
