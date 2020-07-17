const express = require('express');
const router = express.Router();
const User = require('./userDb');
const Post = require('../posts/postDb');

const validateUserId = async (req, res, next) => {
  const {id} = req.params;
  try {
    const user = await User.getById(id);
    
    if (user) {
      req.user = {...user};
      next();
    } else {
      res.status(404).json({
        message: "User with the provided id doesn't not exist."
      })
    }
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot retrieve the user from the database."
    })
  }
};

const validateUser = (req, res, next) => {
  const user = {...req.body};

  if (Object.keys(user).length === 0) {
    res.status(400).json({
      message: "Missing user data."
    })
  } else if ((Object.keys(user).length !== 1) || (user.name === undefined)) {
    res.status(400).json({
      message: "Required fields is not valid."
    })
  } else {
    next()
  }
}

const validatePost = async (req, res, next) => {
  const {id} = req.params;
  const post = {...req.body};

  if (Object.keys(post).length == 2) {
    if ((post.text === undefined) || (post.user_id === undefined)) {
      res.status(400).json({
        message: "Post's field(s) is incorrect."
      })
    } else {
      const user = await User.getById(post.user_id);

      if ((user) && (user.id == id)){
        req.post = post;
        next()
      } else {
        res.status(404).json({
          message: "User is not found to create a post."
        })
      }
    }
  } else {
    res.status(400).json({
      message: "New post content is either missing or incorrect."
    })
  }
};

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await User.insert(req.body);
    res.status(201).json({
      message: "Success!",
      user: newUser
    });
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot create a new user."
    })
  }
});

router.post('/:id/posts', validatePost, async (req, res) => {
  try {
    const newPost = await Post.insert(req.post);

    res.status(201).json({
      message: "Success!",
      post: newPost
    })
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot create a new post."
    })
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.get();
    
    if (users.length > 0) {
      res.status(200).json({
        message: "Success!",
        users
      })
    } else {
      res.status(404).json({
        message: "No users found."
      })
    }
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot get users from the database."
    })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.status.json({
    message: "Success!",
    user
  })
});

router.get('/:id/posts', validatePost, async (req, res) => {
  try {
    const newPost = await Post.insert(req.post);

    res.status(201).json({
      message: "Success!",
      post: newPost
    })
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot create a new post."
    })
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await User.remove(req.params.id)
    res.status(200).json({
      message: "The user is removed from the database."
    })
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot delete the user."
    })
  }
});

router.put('/:id', validateUser, validateUserId, async (req, res) => {
  try {
    const updateUser = await User.update(req.params.id, req.body);
    res.status(200).json({
      message: "Success!",
      user: {...req.body}
    })
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot update the user."
    })
  }
});

module.exports = router;
