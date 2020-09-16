import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'admin-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent {
  apiService: ApiService;
  constructor(private tagService: TagService) {
    this.apiService = tagService;
  }

  tableTitle = 'Тэги';
  addFormPlaceholder = 'Добавить тэг';
  itemTitle = 'Тэг';
}
