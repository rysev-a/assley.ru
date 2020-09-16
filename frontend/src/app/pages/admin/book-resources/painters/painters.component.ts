import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import {} from 'src/app/services/author.service';
import { PainterService } from 'src/app/services/painter.service';

@Component({
  selector: 'admin-painters',
  templateUrl: './painters.component.html',
})
export class PaintersComponent {
  apiService: ApiService;
  constructor(private painterService: PainterService) {
    this.apiService = painterService;
  }

  tableTitle = 'Художники';
  addFormPlaceholder = 'Добавить художника';
  itemTitle = 'Художник';
}
