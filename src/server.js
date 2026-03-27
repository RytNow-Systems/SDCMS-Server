import dotenv from 'dotenv';
import app from './app.js'; // Don't forget the .js extension!

// Load environment variables immediately
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
