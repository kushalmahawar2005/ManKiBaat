const express = require("express");
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const methdoOverride = require("method-override")


app.use(express.urlencoded({ extended: true }));
app.use(methdoOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Anki",
        content: "I love Coding"
    },
    {

        id: uuidv4(),
        username: "Vinay_mahawar",
        content: "I love My Business"
    },
    {
        id: uuidv4(),
        username: "Harshit",
        content: "He also Love to do bussiness"
    },
    {
        id: uuidv4(),
        username: "Gagan_Mahawar",
        content: "He love to talk to Girls and He reallys Loves our Family"
    },
]


app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

app.get('/posts/new', (req, res) => {      //Get is used to see Data
    res.render("new.ejs");                 //Render is used to upload the Files
});

app.post('/posts', (req, res) => {   //Post is used To add new things or add new data 
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect('/posts');
});


app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id); 
    console.log(post);
    res.render("Show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect('/posts');
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });

});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})
 

app.listen(port, () => {
    console.log("Listining to port 8080");
});



// CRUD
// // for Create we Use : Post
// // for Read we Use : Get
// // for Update we Use : Put and Patch 
// // for Delete we Use : Destroy 