import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.sass'],
})
export class ProcessingComponent implements OnInit {
  @Input() processing: boolean;

  constructor() {}

  ngOnInit(): void {}
}
