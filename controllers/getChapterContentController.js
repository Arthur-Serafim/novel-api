async function getChapterContent(link, chapter, browser) {
  try {
    let BASE_URL = `https://m.wuxiaworld.co${link}${chapter}`;

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (
        ["image", "stylesheet", "font", "script"].indexOf(
          request.resourceType()
        ) !== -1
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.setDefaultNavigationTimeout(0);
    await page.goto(BASE_URL);

    const data = await page.evaluate(() => {
      try {
        let content = document
          .querySelector("div#chaptercontent")
          .innerText.split(`a title=”” href`)[0]
          .trim()
          .split("Next Chapter")
          .join("")
          .trim();
        let title = document.querySelector("span.title").textContent;
        let previousLink = document.querySelector("#pt_prev").href.split("/");
        previousLink = previousLink[previousLink.length - 1];

        let nextLink = document.querySelector("#pt_next").href.split("/");
        nextLink = nextLink[nextLink.length - 1];

        let response = {
          title,
          content,
          previousLink,
          nextLink,
        };

        return response;
      } catch (error) {
        console.error(error.message);
        return "";
      }
    });

    return data;
  } catch (error) {
    return { error: error.message };
  }
}
module.exports = getChapterContent;
