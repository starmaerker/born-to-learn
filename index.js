const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const favicon = require("serve-favicon");

const homeRouter = require("./src/routes/home");

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.set("view engine", "hbs");
app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "main" }));

app.use(express.static(`${__dirname}/static`));
app.use(favicon(`${__dirname}/static/img/favicon.ico`));

app.use(homeRouter);

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(port, () => {
  if (app.get("env") === "development") {
    const browserSync = require("browser-sync"); // eslint-disable-line
    browserSync({
      files: ["static/**/*.css", "views/**/*.handlebars"],
      online: false,
      port: port + 1,
      proxy: `localhost:${port}`,
      ui: false
    });
  }
});
