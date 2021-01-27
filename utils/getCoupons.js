const axios = require("axios");
const qs = require("querystring");
var striptags = require("striptags");

//------Webepartners------------; //
const scrapeWebepartners = async () => {
  return axios
    .get(
      "https://api2.webepartners.pl/Wydawca/GetVouchers?dateFrom=2019-01-01&dateTo=2020-12-30",
      {
        auth: {
          username: "emir.alobedi@gmail.com",
          password: "83ecd6ba-3de1-4429-8fc8-6ac4456215b4",
        },
      }
    )
    .then((data) => {
      let webePartnersCoupons = data.data;
      return webePartnersCoupons;
    })
    .catch((err) => console.log(error));
};

// ------ Leadstar ------------ //
const scrapeLeadstar = async () => {
  const requestBody = {
    api_key: "69a6000f09a445a41ecdff5a2f6760ab7e644998ede537f67d8d3bde2750ddd4",
    partner_id: "34113",
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return axios
    .post("https://leadstar.pl/api/coupons", qs.stringify(requestBody), config)
    .then((result) => {
      let leadstarCoupons = result.data.rows;
      leadstarCoupons.forEach((leadstarCoupon) => {
        // console.log(leadstarCoupon.product);
      });
      return leadstarCoupons;
    })
    .catch((err) => {
      console.log(err);
    });
};

function solveCatsNames(leadstarCoupon) {
  if (leadstarCoupon.product === "moda i uroda") {
    return "Moda";
  } else if (leadstarCoupon.product === "dom i ogród") {
    return "Dom i ogród";
  } else if (leadstarCoupon.product === "motoryzacja") {
    return "Motoryzacja";
  } else if (leadstarCoupon.product === "oferty dla firm") {
    return "Biuro i firma";
  } else if (leadstarCoupon.product === "pozostałe") {
    return "Pozostałe";
  } else if (leadstarCoupon.product === "rtv i agd") {
    return "RTV i AGD";
  } else if (leadstarCoupon.product === "sport i zdrowie" || "hobby") {
    return "Sport i rekreacja";
  } else if (leadstarCoupon.product === "suplementy") {
    return "Zdrowie i uroda";
  } else if (leadstarCoupon.product === "telekomunikacja") {
    return "Telekomunikacja";
  } else if (leadstarCoupon.product === "turystyka") {
    return "Turystyka";
  } else if (leadstarCoupon.product === "zakupy") {
    return "Moda";
  }
}

function solveCatsIds(leadstarCoupon) {
  if (leadstarCoupon.product === "moda i uroda") {
    return 10;
  } else if (leadstarCoupon.product === "dom i ogród") {
    return 3;
  } else if (leadstarCoupon.product === "motoryzacja") {
    return 13;
  } else if (leadstarCoupon.product === "oferty dla firm") {
    return 1;
  } else if (leadstarCoupon.product === "pozostałe") {
    return 29;
  } else if (leadstarCoupon.product === "rtv i agd") {
    return 31;
  } else if (leadstarCoupon.product === "sport i zdrowie" || "hobby") {
    return 16;
  } else if (leadstarCoupon.product === "suplementy") {
    return 11;
  } else if (leadstarCoupon.product === "telekomunikacja") {
    return 32;
  } else if (leadstarCoupon.product === "turystyka") {
    return 33;
  } else if (leadstarCoupon.product === "zakupy") {
    return 10;
  }
}
// ------ Map two arrays together  ------------ //

const mapped = async () => {
  const webepartnersCoupons = await scrapeWebepartners();
  const leadstarCoupons = await scrapeLeadstar();

  let newLeadstarCoupons = [];
  await leadstarCoupons.forEach((leadstarCoupon) => {
    newLeadstarCoupons = [
      ...newLeadstarCoupons,
      {
        voucherId: leadstarCoupon.id,
        voucherName: leadstarCoupon.program_name,
        voucherCode: leadstarCoupon.coupon_code,
        voucherText: leadstarCoupon.coupon_descr,
        dateFrom: leadstarCoupon.coupon_date_from,
        dateTo: leadstarCoupon.coupon_date_to,
        programId: leadstarCoupon.coupon_id,
        programName: leadstarCoupon.institution,
        voucherUrl: leadstarCoupon.url,
        voucherTrackingUrl: leadstarCoupon.url,
        categoryName: solveCatsNames(leadstarCoupon),
        categoryId: solveCatsIds(leadstarCoupon),
      },
    ];
  });
  return await [...webepartnersCoupons, ...newLeadstarCoupons];
};

// ------ Scraper init ------------ //

const getCoupons = async () => {
  const webepartnersCoupons = await scrapeWebepartners();
  console.log("Webepartners coupons total: ", webepartnersCoupons.length);
  const leadstarCoupons = await scrapeLeadstar();
  console.log("Leadstar coupons total: ", leadstarCoupons.length);
  return await mapped();
};

module.exports = getCoupons;
