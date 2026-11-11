import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); // body → req.body

// Sunucu ayakta mı?
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012047",
  });
});

app.use((req, res) => { // eşleşme yoksa
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
