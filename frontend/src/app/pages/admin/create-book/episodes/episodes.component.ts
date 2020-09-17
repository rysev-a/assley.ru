import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormArray } from '@angular/forms';
import { TranslatorService } from 'src/app/services/translator.service';
import { ApiServiceResponse } from 'src/app/core/api.service';

@Component({
  selector: 'create-book-episodes',
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
export class CreateBookEpisodesComponent implements OnInit {
  constructor(private translatorService: TranslatorService) {}

  translators: any[];
  bookForm: FormGroup;
  episodes: FormArray;
  onUploadEpisode: ($event, file) => void;
  addEpisode: () => void;
  removeEpisode: (index) => void;
  faUpload = faUpload;

  onSelectTranslator(event, episodeIndex) {
    const episodes: any = this.bookForm.controls.episodes;
    episodes.controls[episodeIndex].patchValue({
      translator: event.name,
    });
  }

  onSearchTranslator($event) {
    const { term } = $event;
    this.translatorService
      .list({
        filters: [
          {
            key: 'name',
            operator: 'startWith',
            value: term,
          },
        ],
      })
      .subscribe(({ items }: ApiServiceResponse) => {
        this.translators = items;
      });
  }

  ngOnInit(): void {
    this.translatorService.list().subscribe(({ items }: ApiServiceResponse) => {
      this.translators = items;
    });
  }
}
