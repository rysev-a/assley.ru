import { Component, OnInit } from '@angular/core';
import { DevService } from 'src/app/services/dev.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.sass'],
})
export class DevComponent implements OnInit {
  constructor(
    private devService: DevService,
    private messageService: MessageService
  ) {}

  generate(model) {
    this.devService.runCommand(`generate-${model}`).subscribe(
      () => {
        this.messageService.add({
          status: 'success',
          content: `Success generate ${model} items`,
        });
      },
      () => {
        this.messageService.add({
          status: 'danger',
          content: `Can't generate ${model} items`,
        });
      }
    );
  }

  loadDatabase() {
    this.devService.runCommand('load-database').subscribe(
      () => {
        this.messageService.add({
          status: 'success',
          content: 'Success load database',
        });
        window.location.reload();
      },
      () => {
        this.messageService.add({
          status: 'danger',
          content: "Can't load database",
        });
      }
    );
  }

  clearDatabase() {
    this.devService.runCommand('clear-database').subscribe(
      () => {
        this.messageService.add({
          status: 'success',
          content: 'Success clear database',
        });
      },
      () => {
        this.messageService.add({
          status: 'danger',
          content: "Can't clear database",
        });
      }
    );
  }

  test() {
    this.devService.runCommand('test').subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {}
}
