const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/get-video", async (req, res) => {
    try {
        let url = req.query.url;

        const response = await axios.get(url);
        let html = response.data;

        let match = html.match(/"downloadUrl":"(.*?)"/);

        if (!match) {
            return res.json({ error: "Video not found" });
        }

        let videoUrl = match[1].replace(/\\u002F/g, "/");

        res.json({ video: videoUrl });

    } catch {
        res.json({ error: "Error" });
    }
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log("Server running");
});
