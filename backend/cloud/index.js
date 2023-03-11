const {v2: cloudinary} = require("cloudinary");


cloudinary.config({
    cloud_name: 'djjnw2o7v',
    api_key: "164766512577284",
    api_secret: "Z0kcK7HhlDWtY8pfPae_JD24YJY",
    secure: true
});

module.exports = cloudinary;