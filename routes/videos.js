const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uniqueIdGenerator } = require("uuid");

const readVideoFromFile = () => {
  return fs.readFileSync("./data/videos.json");
};

const writeToFile = (video) => {
  const currentVideo = JSON.parse(readVideoFromFile());
  fs.writeFileSync(
    "./data/videos.json",
    JSON.stringify([...currentVideo, video])
  );
};

const updateFile = (_profile) => {
  fs.writeFileSync("./data/profile.json", JSON.stringify(_profile));
};



router.post("/videos", (req, res) => {
  try {
    const reqBody = req.body;
    const profile = {
      ...reqBody,
      id: uniqueIdGenerator(),
      channel: reqBody.channel,
      description:reqBody.description,
      comments:[
        {
          id:uniqueIdGenerator(),
          name: "Noah Duncan", 
          comment: "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
          likes:0, 
          timestamp: Date.now()
        }, 
        {
          id:uniqueIdGenerator(),
          name: "Thomas Mark", 
          comment: "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
          likes:0, 
          timestamp: Date.now()
        }, 
        {
          id:uniqueIdGenerator(),
          name: "James Taylor", 
          comment: "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
          likes:0, 
          timestamp: Date.now()
        }],
      image:'/images/image001.jpg', 
      likes: "12,000",
      timestamp: Date.now(),
      title: reqBody.title,
      video: 'https://unit-3-project-api-0a5620414506.herokuapp.com/stream', 
      views: "1,200,200",
    };
    writeToFile(profile);
    res.status(201).json(profile);
  } catch (err) {
    res.status(404).send(`error 404 beacuse ${err}`);
  }
});

router.get("/videos/:id", (req, res) => {
  try {
    const id = req.params.id
    let videosList = JSON.parse(readVideoFromFile())
    const video = videosList.find((_video) => _video.id === id)
    res.status(200).send(video)
  } catch (err){
    res.status(404).send(`error 404 beacuse ${err}`);
  }
})

router.get("/videos", (req, res) => {
  try {
    const id = req.params.id
    let videosList = JSON.parse(readVideoFromFile())
    res.status(200).send(videosList)
  } catch (err){
    res.status(404).send(`error 404 beacuse ${err}`);
  }
})

module.exports = router;
