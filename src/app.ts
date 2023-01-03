import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { errorHandler } from "./errors";
import usersRoutes from "./routes/users";
import loginRoutes from "./routes/login";
import categoriesRoutes from "./routes/categories";
import propertiesRoutes from "./routes/properties";
import schedulesRoutes from "./routes/schedules";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(errorHandler);

export default app;
