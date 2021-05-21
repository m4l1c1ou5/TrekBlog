const express=require("express");
const bodyparser=require("body-parser");
const chalk=require("chalk")
const lodash=require("lodash");
const mongoose=require("mongoose");

const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

mongoose.connect("mongodb+srv://m4l1c1ou5:lygjQOjWBiajICrw@cluster0.kwitg.mongodb.net/blogpost",{useNewUrlParser:true,useUnifiedTopology:true});

const blogschema={
    title:String, 
    post:String
}

const blogmodel=mongoose.model("Blog",blogschema);

app.get("/",function(req,res){
    blogmodel.find(function(err, posts){
        if(err){
            console.log(err);
        }
        else{
            res.render("home",{content:posts});
        }
    })
});

app.get("/about",function(req,res){
    res.render("about");
})

app.get("/contact",function(req,res){
    res.render("contact");
})

app.get("/compose",function(req,res){
    res.render("compose");
})

app.post("/compose",function(req,res){
    let post=new blogmodel({
        title:req.body.title,
        post:req.body.msg,
    })
    post.save();
    res.redirect("/");
})

app.get("/post/:query/",function(req,res){
    blogmodel.findOne({title:req.params.query},function(err,body){
        if(err){
            console.log(err);
        }
        else{
            res.render("post",{content:body});
        }
    })
})

app.listen(process.env.PORT || 3000,function(){
    console.log(chalk.blue("Server started at port 3000"));
});