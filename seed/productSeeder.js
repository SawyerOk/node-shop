const Product = require("../models/product");
const mongoose = require("mongoose");

mongoose.connect("localhost:27017/shop");
const products = [
  new Product({
    imgPath: "https://placeholdit.co//i/150x150?&bg=bb0b70",
    title: "Sed accumsan",
    description:
      "Etiam faucibus mattis dapibus. Aliquam pellentesque metus in elementum ullamcorper. Morbi eget bibendum est. Duis congue nisi turpis, sit amet pulvinar purus gravida at. Maecenas accumsan quis tortor sit amet rhoncus. In semper ornare iaculis. ",
    price: 10
  }),

  new Product({
    imgPath: "https://placeholdit.co//i/150x150?&bg=f5f5dc",
    title: "Quisque eget",
    description:
      "Ex nec risus ornare facilisis. Aenean dapibus neque ac efficitur pharetra. Proin a aliquam risus. Vestibulum nisl nunc, elementum vitae bibendum et, blandit et mi. Praesent mattis non leo non interdum. Vivamus placerat tortor sed arcu semper",
    price: 8
  }),

  new Product({
    imgPath: "https://placeholdit.co//i/150x150?&bg=c7c0b3",
    title: "Eget fringilla",
    description:
      "Eget fringilla libero consequat. Curabitur mattis lacus risus, quis convallis mi volutpat et. Suspendisse et pellentesque tellus. Suspendisse sed mi rutrum, consequat est et, molestie diam. Nulla consectetur imperdiet nisl.",
    price: 12
  }),

  new Product({
    imgPath: "https://placeholdit.co//i/150x150?&bg=007d33",
    title: "Vestibulum urna ",
    description:
      "Vestibulum urna velit, bibendum in porta et, semper ac sapien. Aliquam sollicitudin mauris at lacus sagittis, eu dictum dolor volutpat. Integer eros est, commodo ut malesuada vel, dictum sed arcu. ",
    price: 20
  }),

  new Product({
    imgPath: "https://placeholdit.co//i/150x150?&bg=00ffff",
    title: "Maecenas rutrum",
    description:
      "Maecenas rutrum diam id mi posuere, id dapibus sem dapibus. Integer a nulla massa. In mollis bibendum augue sit amet suscipit. In libero urna, lobortis nec purus vitae, interdum molestie eros. Ut pulvinar diam sit amet sapien lobortis auctor. ",
    price: 11
  }),

  new Product({
    imgPath: "https://placeholdit.co//i/150x150?&bg=f98009",
    title: "Integer rutrum",
    description:
      "Integer rutrum et libero sit amet sodales. In vel dui pharetra, posuere velit eu, placerat ligula. Donec condimentum, neque ac pulvinar convallis, tellus nisl pellentesque ligula, in blandit lacus erat eu elit.",
    price: 150
  }),
];

let done = 0;



products.forEach(product => {
  product
    .save()
    .then(() => {
      done++;
      if (done === products.length) {
        exit();
      }
    })
    .catch(e => {
      console.log(e);
    });
});

function exit() {
  mongoose.disconnect();
}
