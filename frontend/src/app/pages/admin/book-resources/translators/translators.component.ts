import { Component } from '@angular/core';
import { TranslatorService } from 'src/app/services/translator.service';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'admin-translators',
  templateUrl: './translators.component.html',
})
export class TranslatorsComponent {
  apiService: ApiService;
  constructor(private translatorSerivce: TranslatorService) {
    this.apiService = translatorSerivce;
  }

  tableTitle = 'Переводчики';
  addFormPlaceholder = 'Добавить переводчика';
  itemTitle = 'Переводчик';
}
