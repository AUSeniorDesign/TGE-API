/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const express = require("express");
var multer  = require('multer');
var upload = multer({ dest: '../../uploads/' });
const NewArrivalPost = require("../models").NewArrivalPost;

// New Arrival Post Endpoints
module.exports = function(app, passport) {
  var router = express.Router();

  // Get all new arrival posts, sorted by date
  router.get("/", passport.isEmployee, function(req, res, next) {
    NewArrivalPost.findAll({ order: ["id", "DESC"] })
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
   *  Body MUST be in the following format:
   *  req.body = {
   *          description: "Here's a rare collectible that came in today",
   *          images: "http://image.com/collectible_1", "http://image.com/collectible_2"
   *          store: "Charlotte Avenue Superstore"
   *  }
   * 
   * With any and all images in a multipart form data array called 'photos'
   *
   */
  router.post("/", passport.isEmployee, upload.array('photos'), function(req, res, next) {
    NewArrivalPost.create({
      description: req.body.post.description,
      store: req.body.store,
      images: req.files.map(file => file.filename)
    })
      .then(posts => {
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

        // TODO: Update new image photos

        // TODO: Cross reference images field after upload and delete non-present images from 
        // uploads folder

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
