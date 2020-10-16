const fs = require('fs');
const Episode = require('./Episode');
const config = require('./config');

class Book {
  constructor(page, link, index) {
    this.page = page;
    this.link = link;
    this.index = index > 9 ? index : '0' + index;
  }

  async getBookInfo() {
    const bookInfoElement = await this.page.$('.manga-info');

    const bookInfo = await this.page.evaluate((element) => {
      const sections = [];
      const authors = [];
      const painters = [];
      const publishers = [];
      const translation_status = [];
      const release_year = [];
      const genres = [];
      const tags = [];
      const translators = [];
      const release_format = [];

      const keys = {
        sections: 'Тип',
        authors: 'Автор',
        painters: 'Художник',
        publishers: 'Издатель',
        translation_status: 'Статус перевода',
        release_year: 'Дата релиза',
        genres: 'Жанры',
        tags: 'Теги',
        translators: 'Переводчики',
        release_format: 'Формат выпуска',
      };

      const sources = {
        [keys.sections]: sections,
        [keys.authors]: authors,
        [keys.painters]: painters,
        [keys.publishers]: publishers,
        [keys.translation_status]: translation_status,
        [keys.release_year]: release_year,
        [keys.genres]: genres,
        [keys.tags]: tags,
        [keys.translators]: translators,
        [keys.release_format]: release_format,
      };

      for (let childIndex = 0; childIndex < 14; childIndex++) {
        if (element && element.children) {
          const infoItem = element.children[childIndex];
          const infoItemTitle = infoItem && infoItem.children[0].textContent;

          if (
            infoItem &&
            infoItemTitle &&
            sources[infoItemTitle] &&
            infoItem.children
          ) {
            for (let i = 1; i < infoItem.children.length; i++) {
              sources[infoItemTitle].push(infoItem.children[i].textContent);
            }
          }
        }
      }

      return {
        sections,
        authors,
        painters,
        publishers,
        translation_status:
          (translation_status.length && translation_status[0]) || '',
        release_year: Number(release_year.length && release_year[0]) || '',
        genres,
        tags,
        translators,
        release_format,
      };
    }, bookInfoElement);

    return bookInfo;
  }

  async getBookTitles() {
    let rus_title = '';
    let eng_title = '';
    try {
      rus_title = await this.page.$eval(
        '.manga-bg__title',
        (el) => el.textContent
      );
      eng_title = await this.page.$eval(
        '.manga-bg__subtitle',
        (el) => el.textContent
      );
    } catch (e) {
      const titlesElement = await this.page.$('.manga-title');
      const titles = await this.page.evaluate((element) => {
        return {
          rus_title: element.children[0].textContent,
          eng_title: element.children[1].textContent,
        };
      }, titlesElement);

      rus_title = titles.rus_title;
      eng_title = titles.eng_title;
    }

    return { rus_title, eng_title };
  }

  async getBookCover() {
    const coverElement = await this.page.$('.manga__cover');
    const coverURL = await this.page.evaluate(
      (element) => element.src,
      coverElement
    );
    const viewSource = await this.page.goto(coverURL);
    const coverExtention = coverURL
      .split('/')
      [coverURL.split('/').length - 1].split('?')[0]
      .split('.')[1];

    let bookCoverPath = `book_${this.index}_cover.${coverExtention}`;

    fs.writeFile(
      `../book_sources/book_${this.index}/${bookCoverPath}`,
      await viewSource.buffer(),
      function (err) {
        if (err) {
          console.log(`can not save cover for book`);
          bookCoverPath = '';
        }
      }
    );

    return bookCoverPath;
  }

  async getBookDescription() {
    return await this.page.$eval('.info-desc__content', (el) => el.textContent);
  }

  async getBookEpisodesData() {
    const seasonListElement = await this.page.$('.chapters-list');

    if (seasonListElement) {
      const seasonsLinks = await this.page.evaluate(
        (element, max_episodes) => {
          const info = [];
          const count = element.children.length;

          for (let i = 1; i < count && i < max_episodes + 1; i++) {
            const url = element.children[i].querySelector('.link-default');
            const seasonNumber = element.children[i].getAttribute(
              'data-volume'
            );
            const episodeNumber = element.children[i].getAttribute(
              'data-number'
            );

            if (url) {
              info.push({
                url: url && url.href,
                episodeName: url && url.title,
                seasonNumber,
                episodeNumber,
              });
            }
          }

          return info;
        },
        seasonListElement,
        config.max_episodes
      );

      return seasonsLinks;
    }

    return [];
  }

  async getBookSeasons() {
    const seasons = {};

    for (const episodeInfo of this.episodesData) {
      const season = seasons[episodeInfo.seasonNumber] || [];
      season.push({
        name: episodeInfo.episodeName,
        number: episodeInfo.episodeNumber,
      });

      seasons[episodeInfo.seasonNumber] = season;
    }

    return Object.keys(seasons).map((seasonNumber) => {
      return {
        number: seasonNumber,
        episodes: seasons[seasonNumber],
      };
    });
  }

  async downloadEpisodes() {
    for (const episodeDataItem of this.episodesData) {
      const episode = new Episode(this.page, this.index, episodeDataItem);
      await episode.download();
    }
  }

  async getBookSources() {
    this.episodesData = await this.getBookEpisodesData();
    await this.downloadEpisodes();
    const seasons = await this.getBookSeasons();

    await this.page.goto(this.link);

    const cover = await this.getBookCover();

    return {
      path: `book_${this.index}`,
      seasons,
      cover,
    };
  }

  async load() {
    await this.page.goto(this.link);

    this.info = await this.getBookInfo();
    this.titles = await this.getBookTitles();
    const description = await this.getBookDescription();
    const sources = await this.getBookSources();

    this.info = {
      ...this.info,
      ...this.titles,
      description,
      sources,
    };

    return this.info;
  }
}

module.exports = Book;
