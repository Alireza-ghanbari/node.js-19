import fs from "fs";
const posts = JSON.parse(fs.readFileSync("./db/db.json"));

export const getAllPosts = (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: posts,
  });
};

export const getPost = (req, res, next) => {
  const id = req.params.id * 1;
  const post = posts.find((e) => e.id === id);
  if (!post) {
    return res.status(404).json({
      error: "post not found!",
    });
  }
  return res.status(200).json({
    success: true,
    data: post,
  });
};

export const createPost = (req, res, next) => {
  const newId = +posts.at(-1).id + 1;
  const newPost = { id: newId, ...req.body };
  posts?.push(newPost);

  fs.writeFileSync(`./db/db.json`, JSON.stringify(posts), (err) => {
    console.log(err);
  });
  return res.status(201).json({
    success: true,
    data: newPost,
  });
};

export const updatePost = (req, res, next) => {
  const id = req.params.id * 1;
  const postToUpdate = posts.find((e) => e.id === id);
  const index = posts.indexOf(postToUpdate);
  Object.assign(postToUpdate, req.body);
  posts[index] = postToUpdate;

  fs.writeFileSync(`./db/db.json`, JSON.stringify(posts), (err) => {
    console.log(err);
  });

  return res.status(201).json({
    success: true,
    message: "post updated successfully!",
    data: postToUpdate,
  });
};

export const deletePost = (req, res, next) => {
  const id = req.params.id * 1;
  const postToDelete = posts.find((e) => e.id === id);
  const index = posts.indexOf(postToDelete);

  posts.splice(index, 1);

  fs.writeFileSync(`./db/db.json`, JSON.stringify(posts), (err) => {
    console.log(err);
  });

  return res.status(200).json({
    success: true,
    message: "post deleted successfully!",
    data: null,
  });
};
