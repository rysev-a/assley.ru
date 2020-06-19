import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPen, faTimes, faPenNib } from '@fortawesome/free-solid-svg-icons';
import {
  TagService,
  Tag,
  TagResponse,
  QueryParams,
} from 'src/app/services/tag.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass'],
})
export class TagsComponent implements OnInit {
  constructor(
    private tagService: TagService,
    private messageService: MessageService
  ) {}

  tagForm = new FormGroup({
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

  processing: boolean = false;
  isLoaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;

  tags: Tag[] = [];

  setEditingItem(item) {
    this.editingItem = { ...item };
  }

  setPage(page) {
    this.page = page;
    this.load();
  }

  load() {
    this.processing = true;
    const queryParams: QueryParams = {
      pagination: {
        page: this.page,
        limit: this.limit,
      },
    };

    this.tagService.list(queryParams).subscribe((response: TagResponse) => {
      this.tags = response.items;
      this.pages = response.pages;
      this.isLoaded = true;
      this.processing = false;
    });
  }

  remove(id) {
    this.processing = true;
    this.tagService.remove(id).subscribe(() => {
      this.load();
    });
  }

  addTag() {
    const { name } = this.tagForm.value;
    this.tagService.add(this.tagForm.value).subscribe(
      () => {
        this.tagForm.patchValue({
          name: '',
        });
        this.load();

        this.messageService.add({
          status: 'success',
          content: `Тэг ${name} успешно добавлен`,
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
    this.tagService.update(this.editingItem).subscribe(
      () => {
        this.tags = this.tags.map((tag) => {
          if (tag.id === this.editingItem.id) {
            return this.editingItem;
          }

          return tag;
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
