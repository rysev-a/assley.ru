import { map, flatten } from 'ramda';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.sass'],
})
export class BookReadComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  onSelectEpisode($episode) {
    this.read.page = 1;
    this.updateReadPlace();
  }

  onSelectPage(event) {
    this.read.page = Number(event.target.value);
    this.updateReadPlace();
  }

  updateReadPlace() {
    this.router.navigate(
      [`/books/${this.book.id}/read/${this.read.episode.id}`],
      {
        relativeTo: this.route,
        queryParams: {
          page: this.read.page,
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
    window.scrollTo(0, 0);
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

  getNextEpisode() {
    const episode = this.read.episode;
    const index = this.episodes.indexOf(episode);

    if (index === this.episodes.length - 1) {
      return this.episodes[0];
    }

    return this.episodes[index + 1];
  }

  nextPage() {
    if (this.read.page == this.pages.length) {
      this.read.episode = this.getNextEpisode();
      this.read.page = 1;
    } else {
      this.read.page = this.read.page + 1;
    }

    this.updateReadPlace();
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
