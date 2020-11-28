var striptags = require("striptags");

function saveToDb(wpPosts, db, collection) {
  console.log("Saving to db...");
  wpPosts.forEach((post, i) => {
    var pathArray = post.guid.rendered.split("/");
    let categories = [];
    let tags = [];

    //---GET CATEGORIES ----
    post._embedded["wp:term"][0]
      .filter(
        (item) =>
          item.taxonomy === "category" &&
          item.slug !== "featured" &&
          item.slug !== "bez-kategori"
      )
      .forEach((item) => {
        categories = [...categories, { name: item.name, slug: item.slug }];
      });
    //---GET TAGS ----
    post._embedded["wp:term"][1]
      .filter((item) => item.taxonomy === "post_tag")
      .forEach((item) => {
        tags = [...tags, { name: item.name, slug: item.slug }];
      });

    //---SAVE TO DB ----
    db.collection(collection)
      .doc(`${post.id}`)
      .set({
        id: post.id,
        base_url: pathArray[2],
        postUrl: post.link,
        categories: categories,
        tags: tags,
        images: "###############",

        // post._embedded["wp:featuredmedia"][0].media_details.sizes !=
        // "undefined"
        //   ? post._embedded["wp:featuredmedia"][0].media_details.sizes
        //   : "",
        title: post.title.rendered,
        excerpt: striptags(post.excerpt.rendered),
        content: striptags(post.content.rendered),
        date: post.date,
        date_gmt: post.date_gmt,
        slug: post.slug,
      });
  });
  console.log("-----------------------");
  console.log("Saved to db succesfully.");
  console.log("-----------------------");
}

module.exports = saveToDb;
