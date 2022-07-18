const vit = require("vitscraped");

vit.courseDetailsScrape(
  { regno: "21BAI1061", passwd: "Pandugadu@1013" },
  "WS",
  function (data, credits) {
    console.log(data, credits);
  }
);
