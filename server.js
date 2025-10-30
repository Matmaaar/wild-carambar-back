const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swagger");
const sequelize = require("./src/config/database");
const Blague = require("./src/models/Blague");
const blaguesRouter = require("./src/routes/blagues");
const seed = require("./seeds");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/blagues", blaguesRouter);

const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    await seed();
  } catch (err) {
    console.error("❌ Erreur lors de la connexion à la base", err);
  }
});
