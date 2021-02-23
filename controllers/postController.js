const Post = require('./../models/post')

exports.getPosts = async (req, res) => {
    try {
        const postMessage = await Post.find();
        console.log(postMessage);

        return res.status(200).json(postMessage);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.createPost = async (req,res) => {
    const body = req.body;
    const newPost = new Post(body);
    try {
       await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}