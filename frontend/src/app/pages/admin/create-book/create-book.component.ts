import { Component, OnInit } from '@angular/core';
import { map, omit, prop } from 'ramda';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';

// resource services
import { BookService } from 'src/app/services/book.service';
import { GenreService } from 'src/app/services/genre.service';
import { SectionService } from 'src/app/services/section.service';
import { TagService } from 'src/app/services/tag.service';
import { AuthorService } from 'src/app/services/author.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { PainterService } from 'src/app/services/painter.service';

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
    private genreService: GenreService,
    private tagService: TagService,
    private sectionService: SectionService,
    private authorService: AuthorService,
    private translatorService: TranslatorService,
    private publisherService: PublisherService,
    private painterService: PainterService
  ) {}

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
    title: ['', Validators.required],
    description: ['', Validators.required],

    // book attributes
    genres: [[]],
    tags: [[]],
    sections: [[]],
    authors: [[]],
    translators: [[]],
    publishers: [[]],
    painters: [[]],

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
      authors: book.authors,
      publishers: book.publishers,
      translators: book.translators,
      painters: book.painters,

      episodes: map((episode: Episode) => {
        return {
          ...episode,
          file: episode.file.name,
        };
      }, book.episodes),
    };

    const files = map(prop('file'))(book.episodes);
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

  onSubmit() {
    const { payload, files } = this.serialize();
    const bookForm = new FormData();

    this.messageService.add({
      status: 'success',
      content: JSON.stringify(payload),
    });

    bookForm.append('payload', JSON.stringify(payload));

    files.forEach((file: File) => {
      bookForm.append(file.name, file, file.name);
    });

    this.processing = true;
    this.bookService.sendFormData(bookForm).subscribe(
      (response) => {
        if (response.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * response.loaded) / response.total);
        }

        if (response.type === HttpEventType.Response) {
          this.processing = false;
          this.progress = 0;
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
