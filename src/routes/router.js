const express = require("express");
const router = express.Router();
const passport = require("passport");

// mongoose

const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLAS);
}
const Blog = require("../models/blogmodel");
const User = require("../models/user");
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", (req, res) => {
  res.render("index", {
    heading: "GuideBlogging - Actionable Blogging &amp; SEO Tips",
  });
});

router.get("/blog", (req, res) => {
  Blog.find({}, (err, blogs) => {
    res.render("blog", {
      heading: "Blog - GuideBlogging",
      Blogs: blogs,
    });
  });
});

router.get("/compose", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("compose", {
      heading: "New Blog - GuideBlogging",
    });
  } else {
    res.redirect("/");
  }
});

router.post("/compose", async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    blog = await blog.save();
    res.redirect("/blog");
    console.log("New blog created successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/compose");
  }
});

// Register Route

// router.get("/register", (req, res) => {
//   res.render("register", {
//     heading: "Register",
//   });
// });

// router.post("/register", (req, res) => {
//   User.register(
//     { username: req.body.username },
//     req.body.password,
//     (err, user) => {
//       if (err) {
//         console.log(err);
//         res.redirect("/register");
//       } else {
//         passport.authenticate("local")(req, res, () => {
//           res.redirect("/compose");
//         });
//       }
//     }
//   );
// });

// Login Route

router.get("/admin", (req, res) => {
  res.render("admin", {
    heading: "Admin Area - GuideBlogging",
  });
});

router.post("/admin", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/compose");
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/toolkit", (req, res) => {
  res.render("toolkit", {
    heading: "ToolKit - GuideBlogging",
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    heading: "Who Is Kundan Choudhary? - GuideBlogging",
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    heading:
      " Got Any Question ? Or Want To Advertise Your Product Or Service ?",
  });
});

router.get("/blogs/:blogId", (req, res) => {
  const requestedBlogId = req.params.blogId;

  Blog.findOne({ _id: requestedBlogId }, (err, blog) => {
    if (err) {
      console.log(err);
      res.render("/compose");
    } else {
      res.render("post", {
        heading: blog.title + " - GuideBlogging",
        title: blog.title,
        description: blog.description,
        markdown: blog.markdown,
      });
    }
  });
});

router.get("*", (req, res) => {
  res.send("Oops ! Page not found. ");
});

module.exports = router;
