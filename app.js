//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://rohan-admin:bball123@cluster0.5rsvufi.mongodb.net/journalsDB", {useNewUrlParser: true});

const sessionSchema = {
  date: String,
  minutes: Number,
  awareness: Number,
  difficulty: Number,
  comments: String
};

const Session = mongoose.model("Session", sessionSchema);

// const journals = []

app.get("/", function(req, res){
  res.render("home")
})

app.get("/pastJournals", function(req, res){
  Session.find({}, function (err, docs) {
    docs.forEach(function(session){
      console.log("true", session.date);
    })
    res.render("past-journals", {docs: docs,totalSessions: docs.length})
    // finish rest of shit w/ CRUD application
  });

  })


app.get("/compose", function(req, res){
  res.render("compose")
})

app.get("/about", function(req, res){
  res.render("about")
})

app.post("/compose", function(req, res){
  const session = new Session({
    date: req.body.sessionDate,
    minutes: req.body.minutes,
    awareness: req.body.awareness,
    difficulty: req.body.difficulty,
    comments: req.body.comments
  });
  session.save()
  res.redirect("/")
})

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  Session.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted checked item!!!");
      res.redirect("/pastJournals")
    }
  })
})

app.listen(3000, function() {
  console.log("Server has started successfully on port 3000");
});
