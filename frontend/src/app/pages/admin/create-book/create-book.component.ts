import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';

const genresMock = [
  { id: 1, name: 'арт' },
  { id: 2, name: 'боевик' },
  { id: 3, name: 'боевые искусства' },
  { id: 4, name: 'вампиры' },
  { id: 5, name: 'гарем' },
  { id: 6, name: 'гендерная интрига' },
  { id: 7, name: 'героическое фэнтези' },
  { id: 8, name: 'детектив' },
  { id: 9, name: 'дзёсэй' },
  { id: 10, name: 'драма' },
];

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.sass'],
})
export class CreateBookComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService
  ) {}

  selectedPeople = [];

  genres = genresMock;

  resources = {
    genre: [],
    tag: [],
    section: [],
  };

  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    genres: this.formBuilder.array([]),
    // address: this.formBuilder.group({
    //   street: [''],
    //   city: [''],
    //   state: [''],
    //   zip: ['']
    // }),
  });

  get aliases() {
    return this.bookForm.get('genres') as FormArray;
  }

  serialize() {
    const book = this.bookForm.value;
    return {
      title: book.title,
      description: book.description,
    };
  }

  onSubmit() {
    this.bookService.add(this.serialize()).subscribe((response) => {
      console.log(response);
    });
  }

  loadResource(model) {
    const service = this[`${model}Service`];
    service.list().subscribe(({ items }) => {
      this.resources[model] = items;
      console.log(this.resources);
    });
  }

  onSelectGenre($event) {
    console.log($event);
  }

  ngOnInit(): void {
    this.loadResource('genre');
  }
}
