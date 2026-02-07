import mongoose from "mongoose";

const bookmarksSchema = new mongoose.Schema({
  url: String,
  category: String
});

const bmModel = mongoose.model("bookmarks", bookmarksSchema);

export { bmModel };

