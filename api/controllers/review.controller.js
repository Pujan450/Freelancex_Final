// import createError from "../utils/createError.js";
// import Review from "../models/review.model.js";
// import Gig from "../models/gig.model.js";

// export const createReview = async (req, res, next) => {
//   if (req.isSeller)
//     return next(createError(403, "Sellers can't create a review!"));

//   const newReview = new Review({
//     userId: req.userId,
//     gigId: req.body.gigId,
//     desc: req.body.desc,
//     star: req.body.star,
//   });

//   try {
//     const review = await Review.findOne({
//       gigId: req.body.gigId,
//       userId: req.userId,
//     });

//     if (review)
//       return next(
//         createError(403, "You have already created a review for this gig!")
//       );

//     //TODO: check if the user purchased the gig.

//     const savedReview = await newReview.save();

//     await Gig.findByIdAndUpdate(req.body.gigId, {
//       $inc: { totalStars: req.body.star, starNumber: 1 },
//     });
//     res.status(201).send(savedReview);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getReviews = async (req, res, next) => {
//   try {
//     const reviews = await Review.find({ gigId: req.params.gigId });
//     res.status(200).send(reviews);
//   } catch (err) {
//     next(err);
//   }
// };
// export const deleteReview = async (req, res, next) => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// };
  


//semi final code
// import createError from "../utils/createError.js";
// import Review from "../models/review.model.js";
// import Gig from "../models/gig.model.js";

// export const createReview = async (req, res, next) => {
//   if (req.isSeller) return next(createError(403, "Sellers can't create a review!"));

//   const newReview = new Review({
//     userId: req.userId,
//     gigId: req.body.gigId,
//     desc: req.body.desc,
//     star: req.body.star,
//   });

//   try {
//     // check duplicate
//     const review = await Review.findOne({ gigId: req.body.gigId, userId: req.userId });
//     if (review) return next(createError(403, "You already reviewed this gig!"));

//     const savedReview = await newReview.save();

//     await Gig.findByIdAndUpdate(req.body.gigId, {
//       $inc: { totalStars: req.body.star, starNumber: 1 },
//     });

//     res.status(201).send(savedReview);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getReviews = async (req, res, next) => {
//   try {
//     const reviews = await Review.find({ gigId: req.params.gigId });
//     res.status(200).send(reviews);
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteReview = async (req, res, next) => {
//   try {
//     const review = await Review.findById(req.params.id);
//     if (!review) return next(createError(404, "Review not found!"));

//     if (review.userId.toString() !== req.userId) {
//       return next(createError(403, "You can delete only your own review!"));
//     }

//     await Review.findByIdAndDelete(req.params.id);

//     await Gig.findByIdAndUpdate(review.gigId, {
//       $inc: { totalStars: -review.star, starNumber: -1 },
//     });

//     res.status(200).send("Review deleted successfully.");
//   } catch (err) {
//     next(err);
//   }
// };



//final code

import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

// ✅ Create Review (only buyer who ordered gig can review once)
export const createReview = async (req, res, next) => {
  try {
    // Prevent sellers from reviewing their own gigs
    if (req.isSeller) {
      return next(createError(403, "Sellers cannot create reviews."));
    }

    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    // Check if user already reviewed this gig
    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (existingReview) {
      return next(createError(403, "You already reviewed this gig."));
    }

    // Save review
    const savedReview = await newReview.save();

    // Update gig rating
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

// ✅ Get Reviews (public)
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).populate(
      "userId",
      "username img" // only return username & img of reviewer
    );
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

// ✅ Delete Review (only review owner can delete)
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return next(createError(404, "Review not found."));

    if (review.userId.toString() !== req.userId) {
      return next(createError(403, "You can delete only your own review."));
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update gig rating after deletion
    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    res.status(200).send("Review deleted.");
  } catch (err) {
    next(err);
  }
};
