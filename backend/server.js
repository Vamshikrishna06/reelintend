const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ReelIntend Backend Running");
});

/* Topic learning keyword mapping */
const topicKeywords = {
  "data analytics":
    "excel tutorial OR sql tutorial OR python pandas tutorial OR exploratory data analysis tutorial OR statistics basics OR power bi tutorial OR tableau tutorial",

  "full stack dev":
    "react tutorial OR node js tutorial OR javascript tutorial OR html css tutorial OR full stack project tutorial",

  "artificial intelligence":
    "machine learning tutorial OR deep learning tutorial OR ai fundamentals lesson OR neural network tutorial",

  "machine learning":
    "machine learning algorithms tutorial OR supervised learning tutorial OR regression classification tutorial",

  "critical thinking":
    "critical thinking skills lesson OR logical reasoning tutorial OR analytical thinking techniques",

  "programming":
    "python tutorial OR java tutorial OR c++ tutorial OR coding fundamentals lesson",

  "business & startups":
    "startup fundamentals tutorial OR entrepreneurship lesson OR business strategy basics",

  "ui/ux design":
    "ui design tutorial OR ux design fundamentals OR figma tutorial OR user experience design lesson"
};

/* reels API */
app.get("/api/reels/:topic", async (req, res) => {
  const topic = decodeURIComponent(req.params.topic).toLowerCase();
  const pageToken = req.query.pageToken || "";

  const searchQuery = topicKeywords[topic] || `${topic} tutorial lesson`;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: "snippet",
          q: `${searchQuery} shorts`,
          type: "video",
          videoDuration: "short",
          maxResults: 10,
          pageToken: pageToken
        }
      }
    );

    res.json({
      items: response.data.items,
      nextPageToken: response.data.nextPageToken
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error fetching reels" });
  }
});

/* IMPORTANT: Dynamic port for Render + Local */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
