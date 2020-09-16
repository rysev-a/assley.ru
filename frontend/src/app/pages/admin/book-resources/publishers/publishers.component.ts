import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import {} from 'src/app/services/author.service';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'admin-publishers',
  templateUrl: './publishers.component.html',
})
export class PublishersComponent {
  apiService: ApiService;
  constructor(private publisherService: PublisherService) {
    this.apiService = publisherService;
  }

  tableTitle = 'Издатели';
  addFormPlaceholder = 'Добавить издателя';
  itemTitle = 'Издатель';
}
