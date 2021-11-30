const PORT = 9001;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.bbc.com/news";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".gs-c-promo-body", html).each(function () {
      const title = $(this).find("h3").text();
      const description = $(this).find("p").text();
      const url = $(this).find("a").attr("href");

      articles.push({
        title,
        description,
        url,
      });
    });

    console.log(articles);
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
