var striptags = require("striptags");
const { v4: uuidv4 } = require("uuid");

function saveToDb(wpPosts, db, collection) {
  console.log("Saving to db...");
  wpPosts.forEach((post, i) => {
    var pathArray = post.guid.rendered.split("/");
    let categories = [];
    let tags = [];

    //    ---GET CATEGORIES ----

    if (
      post._embedded &&
      post._embedded["wp:term"] &&
      post._embedded["wp:term"][0] &&
      post._embedded["wp:term"][1]
    ) {
      post._embedded["wp:term"][0]
        .filter(
          (item) =>
            item.taxonomy === "category" &&
            item.slug !== "featured" &&
            item.slug !== "bez-kategori"
        )
        .forEach((item) => {
          categories = [...categories, item.name];
        });

      //---GET TAGS ----
      post._embedded["wp:term"][1]
        .filter((item) => item.taxonomy === "post_tag")
        .forEach((item) => {
          tags = [...tags, item.name];
        });
    }

    db.collection(collection)
      .doc(post.date_gmt)
      .set({
        uuid: uuidv4() + Math.floor(Math.random() * Math.floor(99999)),
        id: post.id,
        base_url: pathArray[2],
        full: post.link,
        postUrl: post.link,
        categories: categories || "",
        tags: tags || "",

        images:
          !post._embedded ||
          !post._embedded["wp:featuredmedia"] ||
          !post._embedded["wp:featuredmedia"][0].media_details
            ? ""
            : post._embedded["wp:featuredmedia"][0].media_details.sizes?.medium
            ? post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
                .source_url
            : "",

        // images:
        //   !post._embedded ||
        //   !post._embedded["wp:featuredmedia"] ||
        //   !post._embedded["wp:featuredmedia"][0].media_details
        //     ? ""
        //     : post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
        //     ? post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
        //         .source_url
        //     : "",
        title: post.title.rendered
          .replace("&#8211;", "")
          .replace("&#8230;", ""),
        excerpt: striptags(post.excerpt.rendered),
        content: striptags(post.content.rendered),
        dateParsed: Date.parse(post.date),
        newDate: new Date(post.date),
        date: post.date,
        date_gmt: Date.parse(post.date_gmt),
        slug: post.slug,
      });
  });
  console.log("-----------------------");
  console.log("Zapisano w bazie danych");
  console.log("Konopna galaktyka robi rozpierdol !!!!");
  console.log("-----------------------");
}

module.exports = saveToDb;
