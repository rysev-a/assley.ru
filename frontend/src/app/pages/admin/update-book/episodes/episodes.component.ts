import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'update-book-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.sass'],
  inputs: [
    'bookForm',
    'addEpisode',
    'removeEpisode',
    'episodes',
    'onUploadEpisode',
  ],
})
export class UpdateBookEpisodesComponent implements OnInit {
  constructor() {}

  bookForm: FormGroup;
  episodes: FormArray;
  onUploadEpisode: ($event, file) => void;
  addEpisode: () => void;
  removeEpisode: (index) => void;
  faUpload = faUpload;

  ngOnInit(): void {}
}
