import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass'],
  inputs: ['processing', 'progress'],
})
export class ProgressComponent implements OnInit {
  constructor() {}

  processing: boolean;
  progress: number;

  loading() {
    return this.progress === 100 && this.processing;
  }

  ngOnInit(): void {}
}
