// import Gig from "../models/gig.model.js"
// import createError from "../utils/createError.js";
// import User from "../models/user.model.js";

// export const createGig = async (req,res,next)=>{
//     if(!req.isSeller){
//         return next(createError(403,"Only seller can create a gig!"))
//     }

//     const newGig=new Gig({
//         userId:req.userId,
//         ...req.body,
//     });

//     try {
//         const saveGig=await newGig.save();
//         res.status(201).json(saveGig);
//     } catch (err) {
//         next(err);
//     }
// };
// export const deleteGig = async (req,res,next)=>{
//     try {
//         const gig=await Gig.findById(req.params.id);

//         if(gig.userId!=req.userId){
//             return next(createError(403,"You can delete only your gigs"))
//         }

//         await Gig.findByIdAndDelete(req.params.id);
//         res.status(200).send("Gig has been deleted!")
//     } catch (err) {
//         next(err);
//     }
// };
// export const getGig = async (req,res,next)=>{
//     try {
        
//         const gig=await Gig.findById(req.params.id);
//         if(!gig){
//             next(createError(400,"Gig not found"));
//         }
//         res.status(200).send(gig);
//     } catch (err) {
//         next(err);
//     }
// };
// export const getGigs = async (req,res,next)=>{
//     const q = req.query;
//     const filters = {
//     ...(q.userId && { userId: q.userId }),
//     ...(q.cat && { cat: q.cat }),
//     ...((q.min || q.max) && {
//       price: {
//         ...(q.min && { $gt: q.min }),
//         ...(q.max && { $lt: q.max }),
//       },
//     }),
//     ...(q.search && { title: { $regex: q.search, $options: "i" } }),
//   };
//     try {
//         const gigs=await Gig.find(filters).sort({[q.sort]:-1});
//         res.status(200).send(gigs);
//     } catch (err) {
//         next(err);
//     }
// };

// export const getSuggestions = async (req, res, next) => {
//   const { q } = req.query;
//   if (!q) {
//     return res.status(200).send([]);
//   }

//   try {
//     // 1. Find all users who are sellers
//     const sellers = await User.find({ isSeller: true }, { _id: 1 });
//     const sellerIds = sellers.map(seller => seller._id);

//     // 2. Find gigs from those sellers that match the search query
//     const suggestions = await Gig.find({
//       userId: { $in: sellerIds },
//       title: { $regex: q, $options: "i" },
//     }).populate({ path: "userId", select: "username" }).limit(5);

//     res.status(200).send(suggestions);
//   } catch (err) {
//     next(err);
//   }
// };







import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only seller can create a gig!"));
  }

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const saveGig = await newGig.save();
    res.status(201).json(saveGig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.userId != req.userId) {
      return next(createError(403, "You can delete only your gigs"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    // ✅ Include 'img' in the populate to get the user's profile photo
    const gig = await Gig.findById(req.params.id).populate("userId", "username img");
    if (!gig) {
      next(createError(400, "Gig not found"));
    }
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    // ✅ Include 'img' in the populate for the GigCard component
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 }).populate("userId", "username img");
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

export const getFeaturedGigs = async (req, res, next) => {
  try {
    const featuredGigs = await Gig.find()
      .sort({ totalStars: -1, starNumber: -1 }) // Sort by rating and number of reviews
      .limit(8) // Limit to the top 8 gigs
      .populate("userId", "username img");

    res.status(200).send(featuredGigs);
  } catch (err) {
    next(err);
  }
};

export const getSuggestions = async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return res.status(200).send([]);
  }

  try {
    const sellers = await User.find({ isSeller: true }, { _id: 1 });
    const sellerIds = sellers.map((seller) => seller._id);

    const suggestions = await Gig.find({
      userId: { $in: sellerIds },
      title: { $regex: q, $options: "i" },
    })
      .populate({ path: "userId", select: "username img" }) // ✅ Make sure this includes 'img'
      .lean();

    const withRating = suggestions.map((s) => {
      const rating = s.starNumber > 0 ? s.totalStars / s.starNumber : 0;
      return { ...s, rating };
    });

    const sorted = withRating.sort((a, b) => {
      if (b.rating === a.rating) {
        return a.price - b.price;
      }
      return b.rating - a.rating;
    });

    res.status(200).send(sorted);
  } catch (err) {
    next(err);
  }
};
export const getGigsforprojectcard = async (req, res, next) => {
  try {
    const gigs = await Gig.find()
      .populate("userId", "username img country")
 // ✅ This is the key change
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

