require("dotenv").config();

//secruity package
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/connect");

const tasksRoutes = require("./routes/task");
const expendituresRoutes = require("./routes/expenditure");
const peopleMemosRoutes = require("./routes/peopleMemo");
const userRoutes = require("./routes/user");
const requireAuth = require("./middleware/requireAuth");

const app = express();

function errorHandler(err, res) {
  if (err) {
    res.status(500).json({ error: "Server is broken, please later try again" });
  }
}

app.use(
  cors({
    origin: ["https://dailygram2023.onrender.com", "http://localhost:3000"],
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTION"],
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  console.log(req.path, req.method, req.body);
  next();
});

//handle routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expenditures", requireAuth, expendituresRoutes);
app.use("/api/v1/tasks", requireAuth, tasksRoutes);
app.use("/api/v1/peopleMemos", requireAuth, peopleMemosRoutes);
app.use(errorHandler);

//connect DB  && run server
const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
