//jshint esversion:6
const express = require("express");
const app = express();
const _ = require("lodash");


app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html");
})


app.get("/:customStateName", function(req, res){
  const customStateName = _.lowerCase(req.params.customStateName);
  const custom = _.upperFirst(req.params.customStateName);

  res.render("state",{City: customStateName,NewCity:custom});

});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
