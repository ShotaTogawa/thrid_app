const models = require("../../models");
const Photo = models.Photo;

exports.getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findAll({
      where: {
        id: req.params.photoId
      }
    });
    if (!photo) {
      res.send("the photo is not found");
    }
    res.send(photo);
  } catch (e) {
    res.send(e);
  }
};

exports.getMyPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll({
      where: {
        user_id: req.user.id
      },
      limit: parseInt(req.query.limit),
      offset: parseInt(req.query.offset)
    });
    if (!photos) {
      res.send("This user does not have photos");
    }
    res.send(photos);
  } catch (e) {
    res.send(e);
  }
};

exports.getSearchMyPhotos = async (req, res) => {};

exports.getPhotos = async (req, res) => {};

exports.getSearchPhotos = async (req, res) => {};

exports.postPhoto = async (req, res) => {};

exports.patchPhoto = async (req, res) => {};

exports.deletePhoto = async (req, res) => {};
