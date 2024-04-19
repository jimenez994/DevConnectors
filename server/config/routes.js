const auth = require("../controllers/auth");
const profile = require("../controllers/profile");
const passport = require("passport");
const education = require("../controllers/education");
const experience = require("../controllers/experience");
const post = require("../controllers/post");
const comment = require("../controllers/comment");
const path = require("path")

module.exports = app => {
  // with auth routes can be assigned to become private
  const private = passport.authenticate("jwt", { session: false });

  // Auth
  app.post("/api/register", auth.register);
  app.post("/api/login", auth.login);
  app.get("/api/allUsers", private, auth.allUsers);

  // Profile
  app.get("/api/profile", private, profile.findProfile);
  app.post("/api/createOrUpdateProfile", private, profile.createOrUpdate);
  app.get("/api/profiles", profile.allProfiles);
  app.get("/api/profile/:username", profile.findProfileByUsername);

  // Education
  app.post("/api/addEducation", private, education.addEducation);
  app.delete("/api/deleteEducation/:id", private, education.deleteOne);

  // Experience
  app.post("/api/addExperience", private, experience.addExperience);
  app.delete("/api/deleteExperience/:id", private, experience.deleteOne);

  // Post
  app.get("/api/getPosts", private, post.allPosts);
  app.post("/api/createPost", private, post.createPost);
  app.delete("/api/deletePost/:id", private, post.deletePost);

  // Comment
  app.post("/api/addComment/:id", private, comment.createComment);
  app.delete("/api/deleteComment/:postId/:commentId", private, comment.deleteOne);

  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  // });
  // app.get('*', (req, res)=> {
  //   const index = path.join(__dirname, '/', '../build', 'index.html' );
  //   res.sendFile(index);
  // });
//   app.all("*", (req, res,next) => {
//     res.sendFile(path.resolve("./client/build/index.html"));
  // })
  
};
