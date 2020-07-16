const express = require('express');
const router = express.Router();
const User = require('./userDb')

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
    console.log('Hello', err)
    res.status(500).json({
      error: "Cannot retrieve the user from the database."
    })
  }
}

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  res.status.json({
    message: "Success!",
    user
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
