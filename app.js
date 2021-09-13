const express = require("express");
const app = express();
const multer = require('multer');
const Post = require("./api/models/posts"); //Correct path, posts.
var upload = multer({
    dest: 'uploads/'
})
const postsData = new Post();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})

const getExt = (mimeType) => {
    switch (mimeType) {
        case "image/png":
            return ".png"
        case "image/jpeg":
            return ".jpg";
        case "image\\png":
            return ".png";
    }
}

var upload = multer({
    storage: storage
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.json());
app.use('/uploads', express.static('uploads')); //to make the pics public to show them on app.

//API endpoint to get the list of posts
app.get("/api/posts", (req, res) => { //the post here doesnt matter, change this to lora, then change postman url to .../lora. Doesnt matter
    res.status(200).send(postsData.get());
});

//API endpoint to get individual posts
app.get("/api/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const foundPost = postsData.getIndividualBlog(postId);
    if (foundPost) {
        res.status(200).send(foundPost);
    } else {
        res.status(404).send("Not Found");
    }
})

app.post("/api/posts", upload.single("post-image"), (req, res) => {
    let file = req.file.path;
    let splitFile = file.split('');
    splitFile[7] = '/';
    let joinFile = splitFile.join('');
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": joinFile,
        "added_date": `${Date.now()}`
    }
    postsData.add(newPost);
    res.status(201).send(newPost);
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));