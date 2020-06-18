import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
})
export class BooksComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  category: string = '';

  loadCategory(category) {
    // const category = this.route.snapshot.paramMap.get('category');
    this.category = category;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ category }) => {
      this.loadCategory(category);
    });
  }
}
