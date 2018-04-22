/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const express = require("express");
const NewArrivalPost = require("../models").NewArrivalPost;

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + '.jpg')
  }
});

const upload = multer({storage: storage})

// New Arrival Post Endpoints
module.exports = function(app, passport) {
  var router = express.Router();

  // Get all new arrival posts, sorted by date
  router.get("/", function(req, res, next) {
    NewArrivalPost.findAll({ order: [["id", "DESC"]] })
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  // Create New Arrival Post
  /**
   * Employees Only.
   * 
   *  Multipart Upload Request 
   *  MUST be in the following format:
   *  multipart form = [
   *          description: "Here's a rare collectible that came in today",
   *          store: "Charlotte Avenue Superstore"
   *          file: file data
   *  ]
   * 
   * With the image in a multipart form data called 'image'
   *
   */
  router.post("/", passport.isEmployee, upload.single('avatar'), function(req, res, next) {
    NewArrivalPost.create({
      description: req.body.description,
      store: req.body.store,
      image: req.file.path.replace('public/', '').toString()
    })
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  // Update New Arrival Post
  // Admins / Employees Only
  router.put("/:id", passport.isEmployee, upload.array('newPhotos'), function(req, res, next) {
    NewArrivalPost.update(req.body.post, {
      where: {
        id: req.params.id
      }
    })
      .then(updatedRecords => {
        res.status(200).json(updatedRecords);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  // Delete New Arrival Post
  // Admins / Employees Only
  // TODO: Delete Image Files if not referenced somewhere else
  router.delete("/:id", passport.isEmployee, function(req, res, next) {
    NewArrivalPost.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedRecords => {
        res.status(200).send(deletedRecords + ' deleted');
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  app.use("/feed", router);
};
