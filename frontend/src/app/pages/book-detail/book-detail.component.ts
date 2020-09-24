import { map, flatten } from 'ramda';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.sass'],
})
export class BookDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  publicUrl = environment.publicUrl;
  processing = false;
  loaded = false;
  book = {
    id: 0,
    rus_title: '',
    eng_title: '',
    description: '',
    cover_image: '',

    authors: [],

    genres: [],
    sections: [],

    release_year: '',

    release_formates: [],
    translation_status: '',
    age_limit: '',
    seasons: [],
  };

  get readEpisodeId() {
    if (this.loaded) {
      const season = this.book.seasons[0];
      const episode = season.episodes[0];

      return episode.id;
    }

    return 0;
  }

  get episodes() {
    if (this.loaded) {
      return flatten(
        this.book.seasons.map((season) => {
          return map((episode: any) => {
            return {
              name: episode.name,
              season: season.name,
              link: `/books/${this.book.id}/read/${episode.id}`,
            };
          })(season.episodes);
        })
      );
    }

    return [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.detail(id).subscribe((response: any) => {
      this.book = response.item;
      this.loaded = true;
    });
  }
}
