import app from "./app";
import AppDataSource from "./data-source";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected!");

    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.error(err));
