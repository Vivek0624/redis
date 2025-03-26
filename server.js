// Import required libraries
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const { createClient } = require("redis");

// Create a Redis client
const client = createClient();

// Handle Redis client errors
client.on("error", (err) => console.log("❌ Redis Client Error:", err));

// Connect to the Redis server
client
  .connect()
  .then(() => console.log("✅ Redis connected successfully!"))
  .catch((err) => console.log("❌ Redis connection failed:", err));

// Default expiration time for cached data in seconds
const DEFAULT_EXPIRATION = 3600;

// Create an Express app
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Endpoint for getting photos with optional albumId query parameter
app.get("/photos", async (req, res) => {
  // Get the albumId from the query parameters
  const albumId = req.query.albumId;

  try {
    // Check if the data exists in the Redis cache
    const value = await client.get("photos");

    if (value !== null) {
      // If data exists in cache, return the cached data
      console.log("✅ Data fetched from Redis cache.");
      return res.json(JSON.parse(value));
    } else {
      // If data doesn't exist in cache, fetch it from the external API
      console.log("⚡ Fetching data from API...");
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        { params: { albumId } }
      );
      client.setEx("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
      console.log("✅ Data cached in Redis.");
      res.json(data);
    }
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express app on port 3000
app.listen(3000, () => {
  console.log("🚀 Server started on port 3000");
});
