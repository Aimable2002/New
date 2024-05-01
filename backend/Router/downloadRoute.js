import express from 'express';
import youtubeDl from 'youtube-dl-exec';


const router = express.Router();



router.post('/', async (req, res) => {
    const { videoURL } = req.query;

    if (!videoURL) {
      return res.status(400).json({ error: 'No video URL provided' });
    }
  
    try {
      const output = 'video.mp4'; // Define the output file name
      await youtubeDl(videoURL, { output });
      res.status(200).json({ success: true, downloadUrl: `/${output}` });
    } catch (error) {
      console.log('Failed to download:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  export default router