// import createError from "../utils/createError.js";
// import Conversation from "../models/conversation.model.js";

// export const createConversation = async (req, res, next) => {
//   const newConversation = new Conversation({
//     id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
//     sellerId: req.isSeller ? req.userId : req.body.to,
//     buyerId: req.isSeller ? req.body.to : req.userId,
//     readBySeller: req.isSeller,
//     readByBuyer: !req.isSeller,
//   });

//   try {
//     const savedConversation = await newConversation.save();
//     res.status(201).send(savedConversation);
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateConversation = async (req, res, next) => {
//   try {
//     const updatedConversation = await Conversation.findOneAndUpdate(
//       { id: req.params.id },
//       {
//         $set: {  ...req.isSeller
//           ? { readBySeller: true }
//           : { readByBuyer: true },}
//       },
//       { new: true }
//     );
//     res.status(200).send(updatedConversation);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getSingleConversation = async (req, res, next) => {
//   try {
//     const conversation = await Conversation.findOne({ id: req.params.id })
//       .populate("buyerId", "username")
//       .populate("sellerId", "username");

//     if (!conversation) return next(createError(404, "Not found!"));
//     res.status(200).send(conversation);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getConversations = async (req, res, next) => {
//   try {
//     const conversations = await Conversation.find(
//       req.isSeller
//         ? { sellerId: req.userId }
//         : { buyerId: req.userId }
//     )
//       .populate("buyerId", "username")
//       .populate("sellerId", "username")
//       .sort({ updatedAt: -1 });

//     res.status(200).send(conversations);
//   } catch (err) {
//     next(err);
//   }
// };


import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

// Create or get a conversation
export const createConversation = async (req, res, next) => {
  const isSeller = req.isSeller;
  const to = req.body.to; // The ID of the user to start a conversation with

  // Generate a unique, consistent ID for the conversation
  const newConversationId = isSeller ? req.userId + to : to + req.userId;

  try {
    const existingConversation = await Conversation.findOne({
      id: newConversationId,
    });

    if (existingConversation) {
      return res.status(200).send(existingConversation);
    }

    const newConversation = new Conversation({
      id: newConversationId,
      sellerId: isSeller ? req.userId : to,
      buyerId: isSeller ? to : req.userId,
      readBySeller: isSeller,
      readByBuyer: !isSeller,
      lastMessage: null,
    });

    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

// Update conversation (mark as read)
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

// Get a single conversation
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      id: req.params.id,
      $or: [{ sellerId: req.userId }, { buyerId: req.userId }],
    });

    if (!conversation) {
      return next(createError(404, "Not found!"));
    }

    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

// Get all conversations for the current user

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ buyerId: req.userId }, { sellerId: req.userId }],
    })
      .populate("buyerId", "username") // only bring username field
      .populate("sellerId", "username");

    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
