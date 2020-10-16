const fs = require('fs');

class Episode {
  constructor(page, index, info) {
    this.page = page;
    this.index = index;
    this.info = info;
    this.bookPath = `../book_sources/book_${this.index}`;
  }

  async selectAllPages() {
    const selectElement = await this.page.$('#reader-pages');
    const optionElements = await this.page.$$('#reader-pages > option');

    try {
      await selectElement.click();

      for (const option in optionElements) {
        const value = Number(option) + 1;
        await this.page.select('#reader-pages', String(value));
      }
    } catch {
      return false;
    }
  }

  async createFolders() {
    const season = this.info.seasonNumber;
    const episode = this.info.episodeNumber;

    const create = (path) =>
      new Promise((resolve) => {
        fs.mkdir(path, resolve);
      });

    await create(this.bookPath);
    await create(`${this.bookPath}/${season}`);
    await create(`${this.bookPath}/${season}/${episode}`);
  }

  async downloadEpisodePages() {
    await this.createFolders();
    const pagesImages = await this.getPagesImagesInfo();

    for (const imgURL of pagesImages) {
      const imgPath = imgURL.split('/')[imgURL.split('/').length - 1];
      const viewSource = await this.page.goto(imgURL);

      try {
        fs.writeFile(
          `${this.bookPath}/${this.info.seasonNumber}/${this.info.episodeNumber}/${imgPath}`,
          await viewSource.buffer(),
          function (err) {
            if (err) {
              return console.log(err);
            }
          }
        );
      } catch (e) {
        console.warn(`
          Can not download page image:
          Book: ${this.index}
          Season: ${this.info.seasonNumber}
          Episode: ${this.info.episodeNumber}
          imgPath: ${imgPath}
        `);
      }
    }
  }

  async getPagesImagesInfo() {
    const pagesElement = await this.page.$('.reader-view__container');

    return await this.page.evaluate((element) => {
      const images = [];

      for (let i = 0; i < element.children.length; i++) {
        const imageElement = element.children[i].children[0];
        images.push(imageElement.src);
      }
      return images;
    }, pagesElement);
  }

  async download() {
    await this.page.goto(this.info.url);

    try {
      await this.selectAllPages();
    } catch {
      console.log("can 't select pages");
      return false;
    }

    await this.downloadEpisodePages();
  }
}

module.exports = Episode;
