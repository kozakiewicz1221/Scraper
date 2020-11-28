const fetch = require("node-fetch");

let fetched = false;

const init = (links) => {
  let allPosts = [];
  let sorted = [];
  return Promise.all(
    links.map((link) =>
      fetch(link)
        .then((res) => res.json())
        .then((data) => {
          allPosts = [...allPosts, ...data];
          console.log("-----------------------");
          console.log("Fetched ", allPosts.length, " posts");
          var url = link.split("/");
          console.log("from: ", url[2]);
          console.log("-----------------------");
        })
        .catch((err) => console.log(err))
    )
  ).then(() => {
    console.log(
      "Scraping finished. Total posts scraped: ",
      allPosts.length,
      " posts"
    );
    sorted = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    fetched = true;
    return sorted;
  });
};

const getPosts = async function (links) {
  return await init(links);
};
module.exports = getPosts;
