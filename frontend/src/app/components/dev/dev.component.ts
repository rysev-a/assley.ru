import { Component, OnInit } from '@angular/core';
import { DevService } from 'src/app/services/dev.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.sass'],
})
export class DevComponent implements OnInit {
  constructor(private devService: DevService) {}

  generateBooks() {
    this.devService.generateBooks();
  }

  generateGenres() {
    this.devService.generateGenres();
  }

  ngOnInit(): void {}
}
