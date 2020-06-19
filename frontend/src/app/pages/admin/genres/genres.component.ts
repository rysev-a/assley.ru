import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPen, faTimes, faPenNib } from '@fortawesome/free-solid-svg-icons';
import {
  Genre,
  GenreService,
  GenreResponse,
  QueryParams,
} from 'src/app/services/genre.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass'],
})
export class GenresComponent implements OnInit {
  constructor(
    private genreService: GenreService,
    private messageService: MessageService
  ) {}

  genreForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  editingItem = { id: 0, name: '' };
  editingItemError = { name: '' };

  errors = {
    name: '',
  };

  // icons
  faPen = faPen;
  faTimes = faTimes;
  faPenNib = faPenNib;

  processing: boolean = false;
  isLoaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;

  genres: Genre[] = [];

  setEditingItem(item) {
    this.editingItem = { ...item };
  }

  setPage(page) {
    this.page = page;
    this.load();
  }

  load() {
    this.processing = true;
    const queryParams: QueryParams = {
      pagination: {
        page: this.page,
        limit: this.limit,
      },
    };

    this.genreService.list(queryParams).subscribe((response: GenreResponse) => {
      this.genres = response.items;
      this.pages = response.pages;
      this.isLoaded = true;
      this.processing = false;
    });
  }

  remove(id) {
    this.processing = true;
    this.genreService.remove(id).subscribe(() => {
      this.load();
    });
  }

  addGenre() {
    const { name } = this.genreForm.value;
    this.genreService.add(this.genreForm.value).subscribe(
      () => {
        this.genreForm.patchValue({
          name: '',
        });
        this.load();

        this.messageService.add({
          status: 'success',
          content: `Жанр ${name} успешно добавлен`,
        });
      },
      // TODO: fix with async validators
      ({ error }) => {
        this.errors = error.message;
      }
    );
  }

  update() {
    console.log(this.editingItem);
    this.genreService.update(this.editingItem).subscribe(
      () => {
        this.genres = this.genres.map((genre) => {
          if (genre.id === this.editingItem.id) {
            return this.editingItem;
          }

          return genre;
        });
        this.editingItem = { id: 0, name: '' };
      },
      (response) => {
        this.editingItemError = response.error.message;
      }
    );
  }

  ngOnInit(): void {
    this.load();
  }
}
