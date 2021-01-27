const axios = require("axios");
const striptags = require("striptags");
fs = require("fs");
let categories = [];
require("isomorphic-fetch");
const utf8 = require("utf8");

//------Bankier program partnerski------------; //
const ScrapeBankierPrograms = async () => {
  fetch("https://api.systempartnerski.pl/2.0/xml/jkBTaiCrDNyCBzmGOKd/")
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.text();
    })
    .then(async function (data) {
      const string = await data.toString();
      const encoded = await utf8.encode(string);
      console.log(encoded);
    });

  // return (
  //   axios
  //     .get("https://api.systempartnerski.pl/2.0/xml/jkBTaiCrDNyCBzmGOKd/")
  //     .then((data) => {
  //       json.oferta.kategoria.forEach((item) => {
  //         categories = [
  //           ...categories,
  //           {
  //             category: item._attributes.nazwa,
  //             subcategories: item.podkategoria,
  //           },
  //         ];
  //       });
  //     })

  //     // .then((json) =>
  //     //   console.log(json.oferta.kategoria[0].podkategoria[1].produkt[0])
  //     // )
  //     .catch((err) => console.log(err))
  // );
};

const getBankierPrograms = async () => {
  const bankierPrograms = await ScrapeBankierPrograms();
  return bankierPrograms;
};

module.exports = getBankierPrograms;
