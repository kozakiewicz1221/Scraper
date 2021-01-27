function saveCouponsToDb(coupons, db, collection) {
  console.log("Saving coupons to db...");
  coupons.forEach((coupon, i) => {
    db.collection(collection)
      .doc(`${coupon.programName}-${coupon.programId} - ${i}`)
      .set(coupon);
    console.log(i);
  });
  console.log("-----------------------");
  console.log("Saved coupons to db succesfully.");
  console.log("-----------------------");
  console.log(coupons.length);
}

module.exports = saveCouponsToDb;
