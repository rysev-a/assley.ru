import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.sass'],
})
export class BookDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  processing = false;
  loaded = false;
  book = {
    id: 0,
    title: '',
    description: '',
    authors: [],

    genres: [],
    sections: [],

    release_year: '',

    release_format: '',
    translation_status: '',
    age_limit: '',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.detail(id).subscribe((response: any) => {
      this.book = response.item;
    });
  }
}