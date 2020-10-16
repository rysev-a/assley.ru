import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { GenreService } from 'src/app/services/genre.service';
import { TagService } from 'src/app/services/tag.service';
import { SectionService } from 'src/app/services/section.service';
import { AuthorService } from 'src/app/services/author.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { PainterService } from 'src/app/services/painter.service';

@Component({
  selector: 'book-filters',
  templateUrl: './book-filters.component.html',
  inputs: ['load', 'setFilters'],
  styleUrls: ['./book-filters.component.sass'],
})
export class BookFiltersComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private tagService: TagService,
    private sectionService: SectionService,
    private authorService: AuthorService,
    private translatorService: TranslatorService,
    private publisherService: PublisherService,
    private painterService: PainterService
  ) {
    this.isActive = false;
  }

  faSearch = faSearch;

  resources = {
    genre: [],
    tag: [],
    section: [],
    author: [],
    painter: [],
    translator: [],
    publisher: [],
  };

  bookFiltersForm = this.formBuilder.group({
    genres: [[]],
    tags: [[]],
    sections: [[]],
    authors: [[]],
    translators: [[]],
    publishers: [[]],
    painters: [[]],
  });

  isActive: boolean;
  load: () => void;
  setFilters: (filters) => void;

  onSelectResource(model) {
    return ($event) => {
      this.bookFiltersForm.patchValue({
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

  toggleVisibility = () => {
    this.isActive = !this.isActive;
  };

  loadResource(model) {
    const service = this[`${model}Service`];
    service.list().subscribe(({ items }) => {
      this.resources[model] = items;
    });
  }

  search() {
    const { tags, genres } = this.bookFiltersForm.value;
    this.setFilters([
      { key: 'tags', operator: 'contains', value: tags },
      { key: 'genres', operator: 'contains', value: genres },
    ]);
    this.load();
    this.toggleVisibility();
  }

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
}
