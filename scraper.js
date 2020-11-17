const puppeteer = require("puppeteer");
const majorArray = [];

const GetItems = async (searchTerm) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  console.log("Scraping started...");
  await page.goto("https://cryptonews.com/news/bitcoin-news/");

  const itemList = await page
    .waitForSelector("#body-news > div.app > section.cn-news-grid > div > div")
    .then(() =>
      page.evaluate(() => {
        const ItemArray = [];
        const ItemNodeList = document.querySelectorAll(
          "#body-news > div.app > section.cn-news-grid > div > div"
        );
        ItemNodeList.forEach((item) => {
          const img = item.querySelector("a > img").getAttribute("src");
          const title = item.querySelector("div > h4 > a").innerText;
          const url = item.querySelector("div > h4 > a").getAttribute("href");
          const fullurl = `https://cryptonews.com${url}`;

          ItemArray.push({ title, fullurl, img });
        });
        return ItemArray;
      })
    )
    .catch(() => console.log("Error"));
  console.log("Scraping has finished");

  return itemList;
};

const initScraper = async () => {
  return await GetItems();
};

module.exports = initScraper;
