// import axios from 'axios';
import { json } from 'express';
import fs from 'fs';
// import jsdom from 'jsdom';
// import { JSDOM } from 'jsdom';
// import express from 'express';
// import cors from 'cors';
// import puppeteer from 'puppeteer';

// const FILE = 'deserty.json';
// const LINK = 'https://sushistore.ru/menu/deserty/';
// (async () => {
//   try {
//     let browser = await puppeteer.launch({ headless: false, devtools: true });
//     let page = await browser.newPage();
//     await page.goto(LINK, { timeout: 0 });
//     await page.waitForSelector('.product-card__info.product-info');
//     let html = await page.evaluate(
//       async () => {
//         let result = [];
//         try {
//           let divs = document.querySelectorAll('.product-card ');
//           divs.forEach((el) => {
//             let title = el.querySelector('.product-card__title-link.link-inherit').innerText;
//             let price = el.querySelector('.product-price__value').innerText;
//             let info = el.querySelector('.product-info__portion').innerText;
//             let img = el.querySelector('.product-card__img').src;
//             let obj = {
//               title: title,
//               price: price,
//               info: info,
//               img: img,
//             };
//             result.push(obj);
//           });
//         } catch (err) {
//           console.log('Error evaluate:' + err);
//         }

//         return result;
//       },
//       {
//         waitUntill: '.product-card__info product-info',
//       },
//     );
//     fs.writeFileSync(FILE, JSON.stringify(html), (err) => {
//       console.log('write file ERROR:' + err);
//     });
//     await browser.close();
//   } catch (err) {
//     await browser.close();
//     console.log(err);
//   }
// })();
import mongoose, { connect } from 'mongoose';
const FILE = './wok.json';
const category = 'wok';

const CONNECT_LINK = 'mongodb+srv://paulwebdew:mihuta88@reactdb.cbtnuer.mongodb.net/';
(async () => {
  try {
    await mongoose.connect(CONNECT_LINK);
    console.log('connectDB OK!');
    const goodsSchema = new mongoose.Schema({
      title: String,
      category: String,
      price: String,
      info: String,
      img: String,
    });
    const good = mongoose.model('goods', goodsSchema);
    try {
      const file = await fs.readFile(FILE, 'utf-8', (err, data) => {
        if (!err) {
          const result = JSON.parse(data);
          result.forEach(async (item) => {
            let obj = new good({
              title: item.title,
              category: category,
              price: item.price,
              info: item.info,
              img: item.img,
            });
            await obj.save();
            console.log(item.title);
          });
        } else console.log(err);
      });
    } catch (err) {
      console.log('Readind Error' + err);
    }
  } catch (err) {
    console.log(err);
  }
})();
