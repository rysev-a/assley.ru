import { map } from 'ramda';
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

  serializeEpisode(episode: any) {
    const { pages, uuid } = JSON.parse(episode.pages.replace(/'/g, '"'));

    return {
      ...episode,
      pages: map((page) => {
        return `/${uuid}/${page}`;
      }, pages),
    };
  }

  serialize(book) {
    return {
      ...book,
      seasons: map((season: any) => {
        return {
          ...season,
          episodes: map(this.serializeEpisode)(season.episodes),
        };
      })(book.seasons),
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.detail(id).subscribe((response: any) => {
      this.book = this.serialize(response.item);
    });
  }
}
