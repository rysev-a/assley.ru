import { reduce, map, flatten, prop, reverse, range, path } from 'ramda';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

interface ResponseEpisode {
  id: string;
  name: string;
  translator;
}

interface Season {
  episodes: [];
  name: string;
}

interface Episode {
  file: any;
  episodeName: string;
  episodeNumber: string;
}

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
})
export class UpdateBookComponent implements OnInit {
  book = {
    id: 0,
    rus_title: '',
    eng_title: '',
    description: '',
    age_limit: '',
    translation_status: '',
    release_year: '',

    genres: [],
    tags: [],
    sections: [],
    authors: [],
    translators: [],
    publishers: [],
    painters: [],
    release_formates: [],
    seasons: [],
  };

  bookForm = this.formBuilder.group({
    rus_title: ['', Validators.required],
    eng_title: ['', Validators.required],
    description: ['', Validators.required],
    release_year: ['', Validators.required],

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
    translation_status: [],

    // episodes
    episodes: this.formBuilder.array([]),
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
    private painterService: PainterService,
    private router: Router
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
      rus_title: book.rus_title,
      eng_title: book.eng_title,
      description: book.description,
      age_limit: book.age_limit,
      translation_status: book.translation_status,
      release_year: book.release_year,

      ...this.serializeResources(),
      release_formates: book.release_formates.map((format) => {
        return format.id;
      }),

      episodes: map((episode: Episode) => {
        console.log(episode);

        return {
          ...episode,
          file: path(['file', 'name'])(episode),
        };
      }, book.episodes),
    };

    const episodes = map(prop('file'))(book.episodes);
    const cover_image = book.cover_image;

    return { payload, cover_image, episodes };
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

  deserializeEpisodes() {
    const episodes = flatten(
      map((season: Season) => {
        return season.episodes.map((episode: ResponseEpisode) => {
          const [episodeNumber, episodeName] = episode.name.split(' - ');

          return this.formBuilder.group({
            id: this.formBuilder.control(episode.id),
            seasonNumber: this.formBuilder.control(
              { value: season.name, disabled: true },
              Validators.required
            ),
            episodeNumber: this.formBuilder.control(
              { value: episodeNumber, disabled: true },
              Validators.required
            ),
            episodeName: this.formBuilder.control(
              { value: episodeName, disabled: true },
              Validators.required
            ),
            translator: this.formBuilder.control(
              { value: episode.translator, disabled: true },
              Validators.required
            ),
            file: this.formBuilder.control(null),
          });
        });
      })(this.book.seasons)
    );

    episodes.forEach((episodeForm) => {
      this.episodes.push(episodeForm);
    });
  }

  fillForm() {
    this.bookForm.patchValue({
      rus_title: this.book.rus_title,
      eng_title: this.book.eng_title,
      description: this.book.description,
      release_year: this.book.release_year,

      age_limit: this.book.age_limit,
      translation_status: this.book.translation_status,
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

    this.deserializeEpisodes();
  }

  loadResource(model) {
    const service = this[`${model}Service`];
    service.list().subscribe(({ items }) => {
      this.resources[model] = items;
    });
  }

  // update book episodes
  get episodes() {
    return this.bookForm.get('episodes') as FormArray;
  }

  newEpisode() {
    return this.formBuilder.group({
      new: true,
      seasonNumber: this.formBuilder.control([''], Validators.required),
      episodeNumber: this.formBuilder.control([''], Validators.required),
      episodeName: this.formBuilder.control([''], Validators.required),
      translator_id: this.formBuilder.control([''], Validators.required),
      file: this.formBuilder.control(null, Validators.required),
    });
  }

  addEpisode() {
    this.episodes.push(this.newEpisode());
  }

  removeEpisode(i) {
    this.episodes.removeAt(i);
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

  get release_year_list() {
    const now = new Date();
    const year = now.getFullYear();
    return reverse(range(1980, year + 1));
  }

  onSubmit() {
    const { payload, cover_image, episodes } = this.serialize();
    const bookForm = new FormData();

    // append book cover image
    if (cover_image) {
      bookForm.append('cover', cover_image, cover_image.name);
    }

    // append main info
    bookForm.append('payload', JSON.stringify(payload));

    // append episode files
    episodes.forEach((file: File) => {
      if (file) {
        bookForm.append(file.name, file, file.name);
      }
    });

    this.bookService
      .putFormData(bookForm, `${this.book.id}`)
      .subscribe((response) => {
        if (response.type === HttpEventType.Response) {
          this.router.navigate([`/books/${this.book.id}`]);
        }
      });
  }
}
