const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controller/reviews");
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

// add reviews
router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));

//delete reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
