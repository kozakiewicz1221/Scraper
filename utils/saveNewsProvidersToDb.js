var striptags = require("striptags");

async function saveNewsProvidersToDb(wpPosts, db, collection) {
  console.log("Saving providers to db...");
  let urls = [];

  await wpPosts.forEach((post, i) => {
    var pathArray = post.guid.rendered.split("/");

    const base_url = pathArray[2];
    urls = [...urls, base_url];
  });

  const providers = [...(await new Set(urls))];
  console.log("providers: ", providers);
  providers.forEach((provider) => {
    db.collection(collection).doc(provider).set({
      provider,
    });
  });
  console.log("-----------------------");
  console.log("Zapisano w dostawców newsów bazie danych");
  console.log("Konopna galaktyka robi rozpierdol !!!!");
  console.log("-----------------------");
}

module.exports = saveNewsProvidersToDb;
