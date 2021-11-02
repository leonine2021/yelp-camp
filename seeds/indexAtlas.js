const mongoose = require("mongoose");
const cities = require("./cities");
const imageObjs = require("./imageObjs");
const Campground = require("../models/campGround");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect(
  "mongodb+srv://leoninela2016:8693729aA!@cluster0.pfhai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

// console.log("imageObjs", imageObjs["imgObjs"][13]);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Atlas Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const random1 = Math.floor(Math.random() * 50);
    const random2 = Math.floor(Math.random() * 50);
    const random3 = Math.floor(Math.random() * 50);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "617da141aeb0eeca531c08fb",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, quod aliquam eum provident delectus aperiam velit ullam ut tempore aspernatur libero architecto. Corporis vero, dignissimos blanditiis tempore voluptates laboriosam dicta?",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: imageObjs["imgObjs"][random1].url,
          filename: imageObjs["imgObjs"][random1].filename,
        },
        {
          url: imageObjs["imgObjs"][random2].url,
          filename: imageObjs["imgObjs"][random2].filename,
        },
        {
          url: imageObjs["imgObjs"][random3].url,
          filename: imageObjs["imgObjs"][random3].filename,
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
