const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https")
const { stringify } = require("querystring")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/',function(req,res){
  //res.send("Hello")
  res.sendFile(__dirname+"/signup.html")
})
app.post("/", function (req, res) {

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
      members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
              FNAME: firstName,
              LNAME: lastName
          }
      }]
  };

  const jsonData = JSON.stringify(data); // turn these data into a string

  const url = "https://us5.api.mailchimp.com/3.0/lists/b566e2db37";

  const options = {
      method: "POST",
      auth: "merugu1:3aad711f7f71188389b6ea324cb324b6-us5",
  };

  const request = https.request(url, options, function (response) {
      if(response.statusCode==200){
          res.sendFile(__dirname+"/successful.html")
      }
      else{
         res.sendFile(__dirname+"/failure.html")
      }
      response.on("data", function (data) {
        //   console.log(JSON.parse(data));
      });
  });

  request.write(jsonData);
  request.end();

});

app.post('/failure',function(req,res){
    res.redirect('/')
})

app.listen(process.env.PORT ||3000,console.log("Server is running on port 3000"))


// APi Key 
// 3aad711f7f71188389b6ea324cb324b6-us5
//lsit id
//b566e2db37

