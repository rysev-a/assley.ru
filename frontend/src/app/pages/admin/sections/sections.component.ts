import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPen, faTimes, faPenNib } from '@fortawesome/free-solid-svg-icons';
import {
  SectionService,
  Section,
  SectionResponse,
  QueryParams,
} from 'src/app/services/section.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.sass'],
})
export class SectionsComponent implements OnInit {
  constructor(
    private sectionService: SectionService,
    private messageService: MessageService
  ) {}

  sectionForm = new FormGroup({
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

  isProcessing: boolean = false;
  isLoaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;

  sections: Section[] = [];

  setEditingItem(item) {
    this.editingItem = { ...item };
  }

  setPage(page) {
    this.page = page;
    this.load();
  }

  load() {
    this.isProcessing = true;
    const queryParams: QueryParams = {
      pagination: {
        page: this.page,
        limit: this.limit,
      },
    };

    this.sectionService
      .getSections(queryParams)
      .subscribe((response: SectionResponse) => {
        this.sections = response.items;
        this.pages = response.pages;
        this.isLoaded = true;
        this.isProcessing = false;
      });
  }

  remove(id) {
    this.isProcessing = true;
    this.sectionService.remove(id).subscribe(() => {
      this.load();
    });
  }

  addSection() {
    const { name } = this.sectionForm.value;
    this.sectionService.addSection(this.sectionForm.value).subscribe(
      () => {
        this.sectionForm.patchValue({
          name: '',
        });
        this.load();

        this.messageService.add({
          status: 'success',
          content: `Раздел ${name} успешно добавлен`,
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
    this.sectionService.update(this.editingItem).subscribe(
      () => {
        this.sections = this.sections.map((section) => {
          if (section.id === this.editingItem.id) {
            return this.editingItem;
          }

          return section;
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
