import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/core/table/table.component';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'admin-publishers',
  templateUrl: '../../../core/table/table.component.html',
  styleUrls: ['./publishers.component.sass'],
})
export class PublishersComponent extends TableComponent implements OnInit {
  constructor(private publisherSerivce: PublisherService) {
    super(publisherSerivce);
  }

  title = 'Издатели';
}
