const express = require('express');
const Post = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.get();

    res.status(200).json({
      message: "Success!",
      posts
    })
  }
  catch(err) {
    res.status(500).json({
      error: "Cannot get posts from database."
    })
  }
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
