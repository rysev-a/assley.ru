import { map, prop, range, reverse } from 'ramda';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

// resource services
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import { SectionService } from 'src/app/services/section.service';
import { TagService } from 'src/app/services/tag.service';
import { AuthorService } from 'src/app/services/author.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { PainterService } from 'src/app/services/painter.service';

const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

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
    private messageService: MessageService,
    private router: Router,
    private genreService: GenreService,
    private tagService: TagService,
    private sectionService: SectionService,
    private authorService: AuthorService,
    private translatorService: TranslatorService,
    private publisherService: PublisherService,
    private painterService: PainterService
  ) {}

  faUpload = faUpload;
  processing = false;
  progress = 0;

  resources = {
    genre: [],
    tag: [],
    section: [],
    author: [],
    painter: [],
    translator: [],
    publisher: [],
  };

  bookForm = this.formBuilder.group({
    rus_title: ['', Validators.required],
    eng_title: ['', Validators.required],
    description: ['', Validators.required],
    release_year: [getCurrentYear()],
    cover_image: [null, Validators.required],

    // enum attributes
    age_limit: [this.enumValues.age_limit[0].value, Validators.required],
    translation_status: [
      this.enumValues.translation_status[0].value,
      Validators.required,
    ],

    // resource attributes
    genres: [[]],
    tags: [[]],
    sections: [[]],
    authors: [[]],
    translators: [[]],
    publishers: [[]],
    painters: [[]],
    release_formates: [[]],
    episodes: this.formBuilder.array([]),
  });

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

  release_format_options = [
    { id: 'color', name: 'В цвете' },
    { id: 'web', name: 'Веб' },
    { id: 'sigle', name: 'Сингл' },
    { id: 'compilation', name: 'Сборник' },
    { id: 'doujinshi', name: 'Додзинси' },
  ];

  get episodes() {
    return this.bookForm.get('episodes') as FormArray;
  }

  get release_year_list() {
    const now = new Date();
    const year = now.getFullYear();
    return reverse(range(1980, year + 1));
  }

  newEpisode() {
    return this.formBuilder.group({
      new: false,
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

  serialize() {
    const book = this.bookForm.value;
    const payload = {
      rus_title: book.rus_title,
      eng_title: book.eng_title,
      description: book.description,
      release_year: Number(book.release_year),
      genres: book.genres,
      tags: book.tags,
      sections: book.sections,
      authors: book.authors,
      publishers: book.publishers,
      translators: book.translators,
      painters: book.painters,

      // enums
      age_limit: book.age_limit,
      translation_status: book.translation_status,
      release_formates: book.release_formates,

      episodes: map((episode: Episode) => {
        return {
          ...episode,
          file: episode.file.name,
        };
      }, book.episodes),
    };

    const episodes = map(prop('file'))(book.episodes);
    const cover_image = book.cover_image;

    return { payload, episodes, cover_image };
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

  onSelectReleaseFormat = ($event) => {
    this.bookForm.patchValue({
      release_formates: $event.map((item) => item.id),
    });
  };

  ngOnInit(): void {
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

  onUploadCover(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.bookForm.patchValue({
        cover_image: file,
      });
    }
  }

  onSubmit() {
    const { payload, episodes, cover_image } = this.serialize();
    const bookForm = new FormData();

    // append book cover image
    bookForm.append('cover', cover_image, cover_image.name);

    // append main info
    bookForm.append('payload', JSON.stringify(payload));

    // append episode files
    episodes.forEach((file: File) => {
      bookForm.append(file.name, file, file.name);
    });

    this.processing = true;
    this.bookService.postFormData(bookForm).subscribe(
      (response: any) => {
        if (response.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * response.loaded) / response.total);
        }

        if (response.type === HttpEventType.Response) {
          this.processing = false;
          this.progress = 0;
          this.router.navigate([`/books/${response.body.item.id}`]);
        }
      },
      () => {
        this.processing = false;
        this.progress = 0;
        this.messageService.add({
          status: 'danger',
          content:
            'Что-то пошло не так, попробуйте проверить все поля и загруить ещё раз',
        });
      }
    );
  }
}
