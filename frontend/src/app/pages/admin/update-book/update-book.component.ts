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
    genres: [],
    tags: [],
    sections: [],
    authors: [],
    translators: [],
    publishers: [],
    painters: [],
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
      ...this.serializeResources(),
      // release_year: book.release_year,

      // enums
      // age_limit: book.age_limit,
      // translation_status: book.translation_status,
      // release_formates: book.release_formates,

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
      genres: this.book.genres,
      tags: this.book.tags,
      sections: this.book.sections,
      authors: this.book.authors,
      publishers: this.book.publishers,
      translators: this.book.translators,
      painters: this.book.painters,
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
