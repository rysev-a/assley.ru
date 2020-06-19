import { Component, OnInit } from '@angular/core';
import { map, omit, prop } from 'ramda';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import { SectionService } from 'src/app/services/section.service';
import { TagService } from 'src/app/services/tag.service';

interface Episode {
  file: any;
  episodeName: string;
  episodeNumber: string;
}

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
    episodes: this.formBuilder.array([
      this.formBuilder.group({
        seasonNumber: this.formBuilder.control('2', Validators.required),
        episodeNumber: this.formBuilder.control('1', Validators.required),
        episodeName: this.formBuilder.control(
          'Первая глава',
          Validators.required
        ),
        translator: this.formBuilder.control('Assley', Validators.required),
        file: this.formBuilder.control(null, Validators.required),
      }),
      // this.formBuilder.group({
      //   seasonNumber: this.formBuilder.control('2', Validators.required),
      //   episodeNumber: this.formBuilder.control('2', Validators.required),
      //   episodeName: this.formBuilder.control(
      //     'Вторая глава',
      //     Validators.required
      //   ),
      //   translator: this.formBuilder.control('Assley', Validators.required),
      //   file: this.formBuilder.control(null, Validators.required),
      // }),
    ]),
  });

  get episodes() {
    return this.bookForm.get('episodes') as FormArray;
  }

  newEpisode() {
    return this.formBuilder.group({
      seasonNumber: this.formBuilder.control([''], Validators.required),
      episodeNumber: this.formBuilder.control([''], Validators.required),
      episodeName: this.formBuilder.control([''], Validators.required),
      translator: this.formBuilder.control([''], Validators.required),
      file: this.formBuilder.control(null, Validators.required),
    });
  }

  addEpisode() {
    this.episodes.push(this.newEpisode());
  }

  removeEpisode(i) {
    this.episodes.removeAt(i);
  }

  serialize() {
    const book = this.bookForm.value;
    const date = new Date();
    this.bookForm.patchValue({
      title: `${date.getTime()}`,
    });

    const payload = {
      title: book.title,
      description: book.description,
      genres: book.genres,
      tags: book.tags,
      sections: book.sections,
      episodes: map((episode) => omit(['file'], episode), book.episodes as any),
    };

    const files = map((episode: Episode) => ({
      file: episode.file,
      name: episode.episodeName,
    }))(book.episodes);

    return { payload, files };
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

  onUploadEpisode(event, index) {
    const { episodes }: any = this.bookForm.controls;
    const episodeForm = episodes.controls[index];

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      episodeForm.patchValue({
        file: file,
      });
    }
  }

  onSubmit() {
    const { payload, files } = this.serialize();
    const bookForm = new FormData();

    bookForm.append('payload', JSON.stringify(payload));

    files.forEach(({ file, name }) => {
      bookForm.append(name, file, file.name);
    });

    this.bookService.sendFormData(bookForm).subscribe((response) => {
      console.log(response);
    });
    // for ( const key of Object.keys(formValue) ) {
    //   const value = formValue[key];
    //   formData.append(key, value);
    // }

    // this.bookService.add(bookData).subscribe((response) => {
    //   console.log('success');
    // });
  }
}
