const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgoundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

CampgoundSchema.virtual("properties.popupMarkup").get(function () {
  return `<a href="/campgrounds/${this._id}">${this.title}</a>
  <p>${this.description.substring(0, 20)}...</p>`;
});

CampgoundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
  // console.log(doc);
});

module.exports = mongoose.model("Campground", CampgoundSchema);
