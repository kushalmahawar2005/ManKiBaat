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
        content: "Meri Pyarii Behen , Padoshh 😁, Bass Jada Nahi Bolunga kuki Bolene ke liye Bohot kuch hai lekin itenaa hii bahot hai..!!"
    },
    {

        id: uuidv4(),
        username: "Vinay_mahawar",
        content: "Meraa Bhaii..! Kahane Ko shabd nahi hai lekin Bhagwan karee mujhee har janam apke jaise bhai mileee , Jo hemaree liye itena sab kuch socheta hai Itena sab kuch Kareta hai , Sabka Dhyan Rakheta hai , Bhagwan mere bhai ke sare Sapne puree karena 🤗"
    },
    {
        id: uuidv4(),
        username: "Harshit",
        content: "Mera Pyaraaa Foruu, Sabse pyaraa mera chota bhai ❤, Bechara koi dost Nahi hai iseka but Ham hai na,Thoda Gussa Kareta hai But Man Dil Ka Bahot Acha, Sabka bahot Dyan Rakhta hai ..!"
    },
    {
        id: uuidv4(),
        username: "Gagan_Mahawar",
        content: "Ghar Ka Dakuu Or Sabseee Sherartii Bachaaaaa....!!! Kaam karne me jhorr ataa hai iseko lekin haan kar letaa hai , Dono mumma ka ladla , Papa ka ladela , Gnagyaaa Sala 😅"
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