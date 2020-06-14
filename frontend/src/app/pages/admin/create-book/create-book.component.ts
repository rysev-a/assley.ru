import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import { SectionService } from 'src/app/services/section.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.sass'],
})
export class CreateBookComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService,
    private tagService: TagService,
    private sectionService: SectionService
  ) {}

  resources = {
    genre: [],
    tag: [],
    section: [],
  };

  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    genres: [[]],
    tags: [[]],
    sections: [[]],
  });

  serialize() {
    const book = this.bookForm.value;
    const date = new Date();
    this.bookForm.patchValue({
      title: `${date.getTime()}`,
    });

    return {
      title: book.title,
      description: book.description,
      genres: book.genres,
      tags: book.tags,
      sections: book.sections,
    };
  }

  loadResource(model) {
    const service = this[`${model}Service`];
    service.list().subscribe(({ items }) => {
      this.resources[model] = items;
    });
  }

  onSelectResource(model) {
    return ($event) => {
      this.bookForm.patchValue({
        [`${model}s`]: $event.map((item) => item.id),
      });
    };
  }

  onSearchResource(model) {
    return ($event) => {
      const { term } = $event;
      this[`${model}Service`]
        .list({
          filters: [
            {
              key: 'name',
              operator: 'startWith',
              value: term,
            },
          ],
        })
        .subscribe(({ items }) => {
          this.resources[model] = items;
        });
    };
  }

  onSearchGenre = this.onSearchResource('genre');
  onSearchTag = this.onSearchResource('tag');
  onSearchSection = this.onSearchResource('section');

  onSelectGenre = this.onSelectResource('genre');
  onSelectTag = this.onSelectResource('tag');
  onSelectSection = this.onSelectResource('section');

  ngOnInit(): void {
    this.loadResource('genre');
    this.loadResource('section');
    this.loadResource('tag');
  }

  onSubmit() {
    this.serialize();
    this.bookService.add(this.serialize()).subscribe((response) => {
      console.log(response);
    });
  }
}
