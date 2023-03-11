const {isAuth} = require("../middlewares/auth");
const {validateRating, validate} = require("../middlewares/validator");
const router = require('express').Router()
const reviewController = require("../controllers/review")

router.post("/add/:movieId",isAuth,validateRating,validate,reviewController.addReview)
router.patch("/:reviewId",isAuth,validateRating,validate,reviewController.updateReview)
router.delete("/:reviewId",isAuth,reviewController.removeReview)
router.get("/get-reviews-by-movie/:movieId",reviewController.getReviewsByMovie)

module.exports = router;