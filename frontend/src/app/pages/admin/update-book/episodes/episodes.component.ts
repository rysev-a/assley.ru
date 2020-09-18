import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormArray } from '@angular/forms';
import { TranslatorService } from 'src/app/services/translator.service';
import { ApiServiceResponse } from 'src/app/core/api.service';

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
      translator_id: event.id,
    });
  }

  isDisabled() {
    return false;
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

  ngOnInit() {
    this.translatorService.list().subscribe(({ items }: ApiServiceResponse) => {
      this.translators = items;
    });
  }
}
