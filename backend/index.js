import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { bmModel } from "./db.js";
import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

app.use(cors());
app.use(express.json());


// Get all bookmarks
app.get('/bookmarks', async function(req,res){
  const response = await bmModel.find({})
  res.json(response)
});

// Add a new bookmark
app.post('/bookmarks', async function(req,res){
  const url = req.body.url
  const category = req.body.category

  const response = await bmModel.create({
    url: url,
    category: category
  })

  res.json(response)


});


// Delete a bookmark
app.delete('/bookmarks/:id', async function(req,res){
  const id = req.params.id
  const response = await bmModel.findByIdAndDelete(id);
  res.json({
    message: "Deleted Successfully"
  })

});

//  TODO: Can u implement searching bookmark and favorite and unfavorite bookmark route ??

