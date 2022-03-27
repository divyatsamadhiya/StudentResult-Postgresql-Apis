const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./db/db");
const studentRouter = require("./routes/studentRouter");

app.use(express.json());
app.use("/api/v1", studentRouter);

const server = async () => {
    try {
        await sequelize
            .authenticate()
            .then(() => console.log("connected to postgres database"))
            .catch((error) => console.log(error));
        await sequelize
            .sync({ force: false })
            .then(() => console.log("sync completed"))
            .catch((err) => console.log(err));
        const listener = app.listen(process.env.PORT || 3000, () => {
            console.log(
                "Server is listening on port: " + listener.address().port
            );
        });
    } catch (error) {
        console.log(error);
    }
};
server();
