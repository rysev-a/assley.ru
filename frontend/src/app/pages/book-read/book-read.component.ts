import { map, flatten } from 'ramda';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.sass'],
})
export class BookReadComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  processing = false;
  loaded = false;

  read = {
    episode: null,
    page: 1,
  };

  image = '';

  book = {
    id: 0,
    title: '',
    description: '',
    authors: [],

    genres: [],
    sections: [],

    release_year: '',

    release_format: '',
    translation_status: '',
    age_limit: '',
    seasons: [],
  };

  getEpisodeById(id) {
    return this.episodes.find((episode: any) => {
      return episode.id === Number(id);
    });
  }

  onSelectEpisode(event) {
    this.read.episode = this.getEpisodeById(Number(event.target.value));
    this.read.page = 1;
  }

  onSelectPage(event) {
    this.read.page = Number(event.target.value);
  }

  get episodes() {
    if (!this.loaded) {
      return [];
    }

    return flatten(map((season: any) => season.episodes)(this.book.seasons));
  }

  get pages() {
    if (!this.read.episode) {
      return [];
    }

    const { pages, uuid } = JSON.parse(
      this.read.episode.pages.replace(/'/g, '"')
    );

    return map((page) => {
      return `${uuid}/${page}`;
    })(pages);
  }

  get pageImg() {
    if (!this.read.episode) {
      return '';
    }
    return this.pages[this.read.page - 1];
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    const id = routeParams.get('id');
    const episode = routeParams.get('episode');

    this.processing = true;
    this.bookService.detail(id).subscribe((response: any) => {
      this.book = response.item;
      this.processing = false;
      this.loaded = true;
      this.read.episode = this.getEpisodeById(Number(episode));
    });

    this.route.queryParams.subscribe(({ page }) => {
      this.read.page = Number(page);
    });
  }
}
