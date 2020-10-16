const puppeteer = require('puppeteer');
const yaml = require('yamljs');
const fs = require('fs');
const Book = require('./Book');
const config = require('./config');

class Parser {
  START_URL = 'https://mangalib.me/manga-list?types[]=1';

  async getBookLinks() {
    const bookLinkSelector = '.media-card-wrap a.media-card';
    const bookLinks = await this.page.$$eval(bookLinkSelector, (elements) =>
      elements.map((item) => item.href)
    );

    this.bookLinks = bookLinks.slice(
      config.start_books,
      config.start_books + config.max_books
    );
  }

  async loadBooks() {
    for (const [index, link] of this.bookLinks.entries()) {
      const book = new Book(this.page, link, index + config.start_books);
      const bookData = await book.load();

      if (bookData.sources.seasons.length) {
        await this.writeBookToYaml(bookData, book.index);
        console.log(`success load book ${book.index}`);
      }
    }
  }

  async writeBookToYaml(data, index) {
    const yamlString = yaml.stringify(data);
    const bookFixturePath = `../book_sources/book_${index}/info.yaml`;

    await new Promise((resolve, reject) => {
      fs.writeFile(bookFixturePath, yamlString, function (err) {
        if (err) {
          console.log(err);
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

    await this.getBookLinks();
    await this.loadBooks();

    await browser.close();
  }
}

module.exports = Parser;
