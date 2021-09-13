const PATH = "./data.json"
const fs = require('fs');

class Post{

    get(){
        //function to get posts
        return this.readData();
    }

    getIndividualBlog(postId){
        //get one blog posts
        const posts = this.readData();
        const foundPost = posts.find((post)=> post.id == postId);
        return foundPost;
    }

    add(newPost){
        //Add new posts
        const currentPosts = this.readData();
        currentPosts.unshift(newPost) 
        this.storeData(currentPosts );
    }        

    readData(){
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }

    storeData(rawData){
          let data = JSON.stringify(rawData);
          fs.writeFileSync(PATH, data)
    }

}
module.exports = Post;