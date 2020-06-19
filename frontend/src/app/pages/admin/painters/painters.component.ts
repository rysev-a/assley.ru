import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/core/table/table.component';
import { PainterService } from 'src/app/services/painter.service';

@Component({
  selector: 'admin-painters',
  templateUrl: '../../../core/table/table.component.html',
  styleUrls: ['./painters.component.sass'],
})
export class PaintersComponent extends TableComponent implements OnInit {
  constructor(private painterSerivce: PainterService) {
    super(painterSerivce);
  }

  title = 'Художники';
}
