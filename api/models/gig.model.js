// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const GigSchema = new Schema({
//  userId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   required: true,
// },
//   title:{
//     type:String,
//     required: true,
//   },
//   desc:{
//     type:String,
//     required: true,
//   },
//   totalStars:{
//     type:Number,
//     default: 0,
//   },
//   starNumber:{
//     type:Number,
//     default: 0,
//   },
//   cat:{
//     type:String,
//     required: true,
//   },
//   price:{
//     type:Number,
//     required: true,
//   },
//   cover:{
//     type:String,
//     required: true,
//   },
//   images:{
//     type:[String],
//     required: false,
//   },
//   shortTitle:{
//     type:String,
//     required: true,
//   },
//   shortDesc:{
//     type:String,
//     required: true,
//   },
//     delivaryTime:{
//     type:Number,
//     required: true,
//   },
//     rivisionTime:{
//     type:Number,
//     required: true,
//   },
    
//     features:{
//     type:[String],
//     required: false,
//   },
    
 
// },{
//     timestamps:true
// });

// export default mongoose.model("Gig",GigSchema);

import mongoose from 'mongoose';
const { Schema } = mongoose;

const GigSchema = new Schema({
  userId:{
    type:String,
    required: true,
    ref: "User",
  },
  title:{
    type:String,
    required: true,
  },
  desc:{
    type:String,
    required: true,
  },
  totalStars:{
    type:Number,
    default: 0,
  },
  starNumber:{
    type:Number,
    default: 0,
  },
  cat:{
    type:String,
    required: true,
  },
  price:{
    type:Number,
    required: true,
  },
  cover:{
    type:String,
    required: true,
  },
  images:{
    type:[String],
    required: false,
  },
  shortTitle:{
    type:String,
    required: true,
  },
  shortDesc:{
    type:String,
    required: true,
  },
    delivaryTime:{
    type:Number,
    required: true,
  },
    rivisionTime:{
    type:Number,
    required: true,
  },
    
    features:{
    type:[String],
    required: false,
  },
    
 
},{
    timestamps:true
});

export default mongoose.model("Gig",GigSchema);