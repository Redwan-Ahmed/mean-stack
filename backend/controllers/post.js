const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  // making a url for the image path
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  console.log(post);
  post.save().then(newPost => {
    res.status(201).json({
      message: 'Post has Successfully been Added!',
      post: {
        id: newPost._id,
        title: newPost.title,
        content: newPost.content,
        imagePath: newPost.imagePath,
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: "Creating a post failed!"
    });
  });
}

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file){
    // making a url for the image path
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
    if (result.n > 0) {
      //console.log(result);
      res.status(200).json({ message: "Update Successful!" });
    } else {
      res.status(401).json({ message: "Not Authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Post Update failed!"
    });
  });
}

exports.getPosts = (req, res, next) => {
  const postQuery = Post.find();
  // when handling queries with numbers we must put a + sign infront of the request, as it automatically detects strings without it.
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  //we check if pageSize and currentPage isnt undefined/null - so it has to have a value.
  let fetchedPosts;
  if(pageSize && currentPage){
    postQuery
    // we want to skip the items on each page depending on the pagesize and current page
    // e.g. 10 items (pagesize) *  2 (currentPage) = 20 so we want the 20th item
    .skip(pageSize * (currentPage - 1))
    // limit how many items we retrieve per page
    .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: 'Posts Successfully Fetched!',
      posts: fetchedPosts,
      maxPosts: count
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  });
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching the post failed!"
    });
  });
}

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      // console.log(result);
      res.status(200).json({ message: "Post is Deleted!" });
    } else {
      res.status(401).json({ message: "Not Authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Deleting post failed!"
    });
  });
}

