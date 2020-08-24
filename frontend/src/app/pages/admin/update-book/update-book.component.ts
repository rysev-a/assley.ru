import { reduce, map, prop } from 'ramda';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpEventType } from '@angular/common/http';

// resource services
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import { SectionService } from 'src/app/services/section.service';
import { TagService } from 'src/app/services/tag.service';
import { AuthorService } from 'src/app/services/author.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { PainterService } from 'src/app/services/painter.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.sass'],
})
export class UpdateBookComponent implements OnInit {
  book = {
    id: 0,
    title: '',
    description: '',
    age_limit: '',
    genres: [],
    tags: [],
    sections: [],
    authors: [],
    translators: [],
    publishers: [],
    painters: [],
    release_formates: [],
  };

  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    cover_image: [null],

    // resource attributes
    genres: [[]],
    tags: [[]],
    sections: [[]],
    authors: [[]],
    translators: [[]],
    publishers: [[]],
    painters: [[]],
    release_formates: [[]],

    age_limit: [],
  });

  loaded = false;
  processing = false;
  progress = 100;
  faUpload = faUpload;

  resources = {
    genre: [],
    tag: [],
    section: [],
    author: [],
    painter: [],
    translator: [],
    publisher: [],
  };

  release_format_options = [
    { id: 'color', name: 'В цвете' },
    { id: 'web', name: 'Веб' },
    { id: 'sigle', name: 'Сингл' },
    { id: 'compilation', name: 'Сборник' },
    { id: 'doujinshi', name: 'Додзинси' },
  ];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private tagService: TagService,
    private sectionService: SectionService,
    private authorService: AuthorService,
    private translatorService: TranslatorService,
    private publisherService: PublisherService,
    private painterService: PainterService
  ) {}

  get enumValues() {
    return {
      age_limit: [
        { value: 'unlimited', label: 'Без ограничений' },
        { value: 'sixteen', label: '16+' },
        { value: 'eighteen', label: '18+' },
      ],

      translation_status: [
        { value: 'complete', label: 'Завершен' },
        { value: 'processing', label: 'В процессе' },
        { value: 'frozen', label: 'Заморожен' },
        { value: 'no_translator', label: 'Нет переводчика' },
      ],
    };
  }

  onSelectReleaseFormat = ($event) => {
    this.bookForm.patchValue({
      release_formates: $event,
    });
  };

  onSelectResource(model) {
    return ($event) => {
      this.bookForm.patchValue({
        [`${model}s`]: $event,
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

  // search methos
  onSearchGenre = this.onSearchResource('genre');
  onSearchTag = this.onSearchResource('tag');
  onSearchSection = this.onSearchResource('section');
  onSearchAuthor = this.onSearchResource('author');
  onSearchTranslator = this.onSearchResource('translator');
  onSearchPublisher = this.onSearchResource('publisher');
  onSearchPainter = this.onSearchResource('painter');

  // select methos
  onSelectGenre = this.onSelectResource('genre');
  onSelectTag = this.onSelectResource('tag');
  onSelectSection = this.onSelectResource('section');
  onSelectAuthor = this.onSelectResource('author');
  onSelectTranslator = this.onSelectResource('translator');
  onSelectPublisher = this.onSelectResource('publisher');
  onSelectPainter = this.onSelectResource('painter');

  serialize() {
    const book = this.bookForm.value;

    const payload = {
      title: book.title,
      description: book.description,
      age_limit: book.age_limit,
      ...this.serializeResources(),
      // release_year: book.release_year,

      // enums
      // age_limit: book.age_limit,
      // translation_status: book.translation_status,
      release_formates: book.release_formates.map((format) => {
        return format.id;
      }),

      // episodes: map((episode: Episode) => {
      //   return {
      //     ...episode,
      //     file: episode.file.name,
      //   };
      // }, book.episodes),
    };

    // const episodes = map(prop('file'))(book.episodes);
    const cover_image = book.cover_image;

    return { payload, cover_image };
  }

  serializeResources() {
    const book = this.bookForm.value;
    const resources = [
      'genres',
      'tags',
      'sections',
      'authors',
      'publishers',
      'translators',
      'painters',
    ];

    return reduce((result, resourceName: string) => {
      return {
        [resourceName]: map(prop('id'))(book[resourceName]),
        ...result,
      };
    }, {})(resources);
  }

  onUploadCover(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.bookForm.patchValue({
        cover_image: file,
      });
    }
  }

  fillForm() {
    this.bookForm.patchValue({
      title: this.book.title,
      description: this.book.description,
      age_limit: this.book.age_limit,
      genres: this.book.genres,
      tags: this.book.tags,
      sections: this.book.sections,
      authors: this.book.authors,
      publishers: this.book.publishers,
      translators: this.book.translators,
      painters: this.book.painters,
      release_formates: this.book.release_formates.map((format) => {
        return this.release_format_options.find(
          (option) => option.id === format
        );
      }),
    });
  }

  loadResource(model) {
    const service = this[`${model}Service`];
    service.list().subscribe(({ items }) => {
      this.resources[model] = items;
    });
  }

  onSubmit() {
    const { payload, cover_image } = this.serialize();
    const bookForm = new FormData();

    // append book cover image
    if (cover_image) {
      bookForm.append('cover', cover_image, cover_image.name);
    }

    // append main info
    bookForm.append('payload', JSON.stringify(payload));

    this.bookService
      .putFormData(bookForm, `${this.book.id}`)
      .subscribe((response) => {
        if (response.type === HttpEventType.Response) {
          console.log(response);
        }
      });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.bookService.detail(id).subscribe((response: any) => {
      this.book = response.item;
      this.loaded = true;

      this.fillForm();
    });

    const resources = [
      'genre',
      'section',
      'tag',
      'author',
      'painter',
      'publisher',
      'translator',
    ];
    resources.forEach((resource) => this.loadResource(resource));
  }
}
