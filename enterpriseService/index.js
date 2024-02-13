const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

app.get("/enterprise/users", async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/enterprise/users/:taxId", async (req, res) => {
  const taxId = req.params.taxId;

  try {
    const users = await db.getUsersByTaxId(taxId);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/enterprise/users/registered-after/:date", async (req, res) => {
  const date = req.params.date;

  try {
    const users = await db.getUsersRegisteredAfterDate(date);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/enterprise/users/add", async (req, res) => {
  const { userHashes, userData, taxId, permissions } = req.body;

  try {
    const result = await db.addUsersToEnterprise(
      userHashes,
      userData,
      taxId,
      permissions
    );
    res.json({ success: true, message: "Users added successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
