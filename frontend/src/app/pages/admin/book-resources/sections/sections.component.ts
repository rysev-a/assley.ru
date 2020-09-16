import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'admin-sections',
  templateUrl: './sections.component.html',
})
export class SectionsComponent {
  apiService: ApiService;
  constructor(private sectionService: SectionService) {
    this.apiService = sectionService;
  }

  tableTitle = 'Разделы';
  addFormPlaceholder = 'Добавить раздел';
  itemTitle = 'Раздел';
}
