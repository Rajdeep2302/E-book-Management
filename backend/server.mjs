import env from "./src/config/env.mjs";
import { connectDB } from "./src/config/db.mjs";
import app from "./src/app.mjs";

const startServer = async () => {
  try {
    await connectDB();

    const PORT = env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
