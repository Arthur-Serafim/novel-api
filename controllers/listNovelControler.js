const pupperteer = require("puppeteer");

async function listNovel(pagination) {
  const BASE_URL = `https://m.wuxiaworld.co/category/0/${pagination}.html`;

  const browser = await pupperteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(BASE_URL);

  const response = await page.evaluate(async () => {
    const elements = document.querySelectorAll("div.hot_sale");

    let accumulator = [];

    for (item of elements) {
      let title = item.querySelector("a p.title").textContent.trim();
      let author = item
        .querySelector("a p.author")
        .textContent.trim()
        .split("Author：")[1];
      let review = item
        .querySelector("p.review")
        .textContent.trim()
        .split("Introduce：")[1];
      let image = item.querySelector("a img").getAttribute("data-original");
      let link = item.querySelector("a").getAttribute("href");

      let novel = { title, author, review, image, link };

      accumulator.push(novel);
    }

    return accumulator;
  });

  return {
    data: response
  };
}

module.exports = listNovel;