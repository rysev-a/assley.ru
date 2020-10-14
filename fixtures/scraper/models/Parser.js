const puppeteer = require('puppeteer');
const yaml = require('yamljs');
const fs = require('fs');
const Book = require('./Book');
const config = require('./config');
const start = 20;

class Parser {
  START_URL = 'https://mangalib.me/manga-list?types[]=1';

  async getBookLinks() {
    const bookLinkSelector = '.media-card-wrap a.media-card';
    const bookLinks = await this.page.$$eval(bookLinkSelector, (elements) =>
      elements.map((item) => item.href)
    );

    return bookLinks.slice(start, start + 10);
  }

  async loadBooks() {
    const books = [];
    for (const [index, link] of this.bookLinks.entries()) {
      const book = new Book(this.page, link, index + start);
      const bookData = await book.load();
      if (bookData.sources.seasons.length) {
        books.push(bookData);
      }
    }

    return books;
  }

  async writeBooksToYaml() {
    const yamlString = yaml.stringify(this.books, 8);
    const bookFixturesPath = `../books.yaml`;

    await new Promise((resolve, reject) => {
      fs.writeFile(bookFixturesPath, yamlString, function (err) {
        if (err) {
          reject();
        }
        resolve();
      });
    });
  }

  async run() {
    const browser = await puppeteer.launch();
    this.page = await browser.newPage();
    await this.page.goto(this.START_URL);

    this.bookLinks = await this.getBookLinks();
    this.books = await this.loadBooks();

    await this.writeBooksToYaml();
    await browser.close();
  }
}

module.exports = Parser;
