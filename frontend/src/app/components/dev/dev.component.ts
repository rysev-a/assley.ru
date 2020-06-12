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
    this.devService.runCommand('generate-books').subscribe((response) => {
      console.log(response);
    });
  }

  generateGenres() {
    this.devService.runCommand('generate-genres').subscribe((response) => {
      console.log(response);
    });
  }

  generateTags() {
    this.devService.runCommand('generate-tags').subscribe((response) => {
      console.log(response);
    });
  }

  clearDatabase() {
    this.devService.runCommand('clear-database').subscribe((response) => {
      console.log(response);
    });
  }

  test() {
    this.devService.runCommand('test').subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {}
}
