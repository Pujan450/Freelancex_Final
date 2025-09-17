// //semi-final with out google id 

// // import mongoose from 'mongoose';
// // const { Schema } = mongoose;

// // const userSchema = new Schema({
// //   username:{
// //     type:String,
// //     require:true,
// //     unique:true,
// //   },
// //   email:{
// //     type:String,
// //     require:true,
// //     unique:true,
// //   },
// //   password:{
// //     type:String,
// //     require:true,
// //   },
// //   img:{
// //     type:String,
// //     require:false,
// //   },
// //   country:{
// //     type:String,
// //     require:true,
// //   },
// //   desc:{
// //     type:String,
// //     require:false,
// //   },
// //   isSeller:{
// //     type:Boolean,
// //     default:false,
// //   },
 
// // },{
// //     timestamps:true
// // });

// // export default mongoose.model("User",userSchema);

// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   username:{
//     type:String,
//     require:true,
//     unique:true,
//   },
//   email:{
//     type:String,
//     require:true,
//     unique:true,
//   },
//   password:{
//     type:String,
//     require:false, // Password is no longer required for Google users
//   },
//   img:{
//     type:String,
//     require:false,
//   },
//   country:{
//     type:String,
//     require:true,
//   },
//   desc:{
//     type:String,
//     require:false,
//   },
//   isSeller:{
//     type:Boolean,
//     default:false,
//   },
//   googleId: {
//     type: String,
//     unique: true,
//     sparse: true, // Allows multiple null values
//     required: false,
//   },
// },{
//     timestamps:true
// });


// export default mongoose.model("User",userSchema);


import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true, // Fix: use `required` instead of `require`
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // normalize
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if NOT Google user
      },
    },
    img: {
      type: String,
      default: "", // fallback if no image
    },
    country: {
      type: String,
      required: false, // user can update later
      trim: true,
    },
    desc: {
      type: String,
      default: "",
      trim: true,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows multiple nulls
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
