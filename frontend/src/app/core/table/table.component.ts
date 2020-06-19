import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApiService, QueryParams, ApiServiceResponse } from '../api.service';

export class TableComponent {
  constructor(private apiService: ApiService) {}

  // icons
  faPen = faPen;
  faTimes = faTimes;

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
}
