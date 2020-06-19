import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/core/table/table.component';
import { TranslatorService } from 'src/app/services/translator.service';

@Component({
  selector: 'admin-translators',
  templateUrl: '../../../core/table/table.component.html',
  styleUrls: ['./translators.component.sass'],
})
export class TranslatorsComponent extends TableComponent implements OnInit {
  constructor(private translatorSerivce: TranslatorService) {
    super(translatorSerivce);
  }

  title = 'Переводчики';
}
