import mongoose from "mongoose";

// Kurallar schema'da: zorunlu alanlar, boşluk silme, uzunluk ve değer sınırları
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true,
    trim: true, minlength: 3, maxlength: 100 },
  category: { type: String, required: true,
    enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"] },
  capacity: { type: Number, min: 0, default: 0 },
  date: { type: String, required: true },
  time: { type: String, default: "" },
  location: { type: String, trim: true, default: "" },
  description: { type: String, trim: true,
    maxlength: 500, default: "" },
}, { timestamps: true });

// Model adı "Event" → collection adı "events"
export const Event = mongoose.model("Event", eventSchema);
