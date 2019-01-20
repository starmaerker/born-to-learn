const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const favicon = require("serve-favicon");

const homeRouter = require("./src/routes/home.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.set("view engine", "hbs");
app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "main" }));

app.use(express.static(`${__dirname}/static`));
app.use(favicon(`${__dirname}/static/img/favicon.ico`));

app.use(homeRouter.router);

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(port);
