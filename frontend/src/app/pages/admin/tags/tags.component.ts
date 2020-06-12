import { Component, OnInit } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  TagService,
  Tag,
  TagResponse,
  QueryParams,
} from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass'],
})
export class TagsComponent implements OnInit {
  constructor(private tagSevice: TagService) {}

  faPen = faPen;
  faTimes = faTimes;

  isProcessing: boolean = false;
  isLoaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;

  tags: Tag[] = [];

  updatePage(page) {
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

    this.tagSevice.getTags(queryParams).subscribe((response: TagResponse) => {
      this.tags = response.items;
      this.pages = response.pages;
      this.isLoaded = true;
      this.isProcessing = false;
    });
  }

  ngOnInit(): void {
    this.load();
  }
}
