import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {

    try{
        const postMessages = await PostMessage.find(); //PostMessage.find takes time so we make it asynchronous
        res.status(200).json(postMessages)
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPosts = async (req, res) => {
    const post = req.body; //post takes in the input passed from the frontend as a request (to create post containing the values gotten from the input) 

    const newPost = new PostMessage(post) //the post values maps the PostMessages schema to create a new post in the db
    try {
        await newPost.save(); //asynchronous function, saves newPost in db
        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({ message: err.message });
    }
}

export const updatePosts = async (req, res) => {
    const { id: _id} = req.params;
    const postToUpdate = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, postToUpdate, { new:true });
    res.status(200).json(updatedPost);
}

export const deletePosts = async (req, res) => {
    const { id } = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.status(200).json({message: 'Post Deleted Successfully'});
}