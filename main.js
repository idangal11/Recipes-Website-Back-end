require("dotenv").config();
//#region express configures
var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("client-sessions");
const DButils = require("./routes/utils/DButils");
var cors = require('cors')

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    //secret: process.env.COOKIE_SECRET, // the encryption key
    secret: "template", // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    }
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
//local:
app.use(express.static(path.join(__dirname, "dist")));
//remote:
// app.use(express.static(path.join(__dirname, '../assignment-3-3-basic/dist')));
app.get("/",function(req,res)
{ 
  //remote: 
  // res.sendFile(path.join(__dirname, '../assignment-3-3-basic/dist/index.html'));
  //local:
  res.sendFile(__dirname+"/index.html");

});

// app.use(cors());
// app.options("*", cors());

const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// var port = process.env.PORT || "80"; //local=3000 remote=80
const port = process.env.PORT || "3000";
//#endregion
const user = require("./routes/user");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");


//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
//#endregion

// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));

// Routings
app.use("/users", user);
app.use("/recipes", recipes);
app.use(auth);

// Default router
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});



const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});

// require("dotenv").config();
// //#region express configures
// var express = require("express");
// var path = require("path");
// var logger = require("morgan");
// const session = require("client-sessions");
// const DButils = require("./routes/utils/DButils");
// var cors = require('cors')
// //new
// var app = express();
// app.use(logger("dev")); //logger
// app.use(express.json()); // parse application/json
// app.use(
//   session({
//     cookieName: "session", // the cookie key name
//     //secret: process.env.COOKIE_SECRET, // the encryption key
//     secret: "template", // the encryption key
//     duration: 24 * 60 * 60 * 1000, // expired after 20 sec
//     activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
//     cookie: {
//       httpOnly: false,
//     }
//     //the session will be extended by activeDuration milliseconds
//   })
// );



// // Allow requests from 'http://localhost:8080'
// app.use(
//   cors({
//     origin: 'http://localhost:8080',
//     credentials: true,
//   })
// );

// // Add your routes and other middleware here

// // Start the server


// app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
// //local:
// app.use(express.static(path.join(__dirname, "dist")));
// //remote:
// // app.use(express.static(path.join(__dirname, '../assignment-3-3-basic/dist')));
// app.get("/",function(req,res)
// { 
//   //remote: 
//   // res.sendFile(path.join(__dirname, '../assignment-3-3-basic/dist/index.html'));
//   //local:
//   res.sendFile(__dirname+"/index.html");

// });


// app.use(cors());
// // app.options("*", cors());

// const corsConfig = {
//   origin: true,
//   credentials: true
// };


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Headers","Access-Control-Allow-Credentials", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });



// // app.use(cors(corsConfig));
// // app.options("*", cors(corsConfig));

// var port = process.env.PORT || "80"; //local=3000 remote=80

// //#endregion
// const user = require("./routes/user");
// const recipes = require("./routes/recipes");
// const auth = require("./routes/auth");
// //#region cookie middleware
// app.use(function (req, res, next) {
//   if (req.session && req.session.user_id) {
//     DButils.execQuery("SELECT user_id FROM users")
//       .then((users) => {
//         if (users.find((x) => x.user_id === req.session.user_id)) {
//           req.user_id = req.session.user_id;
//         }
//         next();
//       })
//       .catch((error) => next());
//   } else {
//     next();
//   }
// });
// //#endregion

// // ----> For cheking that our server is alive
// app.get("/alive", (req, res) => res.send("I'm alive"));

// // Routings
// app.use("/users", user);
// app.use("/recipes", recipes);
// app.use(auth);
// // Default router
// app.use(function (err, req, res, next) {
//   console.error(err);
//   res.status(err.status || 500).send({ message: err.message, success: false });
// });



// const server = app.listen(port, () => {
//   console.log(`Server listen on port ${port}`);
// });

// process.on("SIGINT", function () {
//   if (server) {
//     server.close(() => console.log("server closed"));
//   }
//   process.exit();
// });
