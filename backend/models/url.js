import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  urlCode: { type: String, required: true, unique: true }, // Make sure urlCode is unique
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  date: { type: String, default: Date.now } // Stores the creation date of the shortened URL
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
