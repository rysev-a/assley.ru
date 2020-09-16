import { faPen, faTimes, faPenNib } from '@fortawesome/free-solid-svg-icons';
import {
  ApiService,
  QueryParams,
  ApiServiceResponse,
} from 'src/app/core/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'async-table',
  templateUrl: './table.component.html',
  inputs: ['apiService', 'tableTitle', 'itemTitle', 'addFormPlaceholder'],
})
export class TableComponent {
  constructor(public messageService: MessageService) {}

  // icons
  faPen = faPen;
  faTimes = faTimes;
  faPenNib = faPenNib;

  processing: boolean = false;
  loaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;
  items = [];
  fields = [
    { name: 'id', label: 'id' },
    {
      name: 'name',
      label: 'Название',
    },
  ];

  editingItem = { id: 0, name: '' };
  editingItemError = { name: '' };

  setEditingItem(item) {
    this.editingItem = { ...item };
  }

  setPage(page) {
    this.page = page;
    this.load();
  }

  update() {
    this.apiService.update(this.editingItem).subscribe(
      () => {
        this.items = this.items.map((item) => {
          if (item.id === this.editingItem.id) {
            return this.editingItem;
          }

          return item;
        });
        this.editingItem = { id: 0, name: '' };
      },
      (response) => {
        this.editingItemError = response.error.message;
      }
    );
  }

  load() {
    this.processing = true;
    const queryParams: QueryParams = {
      pagination: {
        page: this.page,
        limit: this.limit,
      },
    };

    this.apiService
      .list(queryParams)
      .subscribe((response: ApiServiceResponse) => {
        this.items = response.items;
        this.pages = response.pages;
        this.loaded = true;
        this.processing = false;
      });
  }

  remove(id) {
    this.processing = true;
    this.apiService.remove(id).subscribe(() => {
      this.load();
    });
  }

  ngOnInit(): void {
    this.load();
  }

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  errors = { name: '' };
  addItem() {
    const { name } = this.addForm.value;
    this.apiService.add(this.addForm.value).subscribe(
      () => {
        this.addForm.patchValue({
          name: '',
        });
        this.load();

        this.messageService.add({
          status: 'success',
          content: `${this.itemTitle} ${name} успешно добавлен(а)`,
        });
      },
      // TODO: fix with async validators
      ({ error }) => {
        this.errors = error.message;
      }
    );
  }

  apiService: ApiService;
  tableTitle: string;
  itemTitle: string;
  addFormPlaceholder: string;
}
