import { Component, OnInit, Input } from '@angular/core';
import * as R from 'ramda';

const addSeparators = R.reduce((arr, item: any) => {
  const prev = arr[arr.length - 1];
  if (!prev || item - prev == 1) {
    return [...arr, item];
  }

  const result = [...arr, '...', item];
  return result;
}, []);

const calculate = ({ page, pages }) => {
  const pageRangeDisplayed = 3;
  const marginPagesDisplayed = 1;

  const pageArray = R.compose(
    addSeparators,
    R.filter((item) => item > 0 && item <= pages),
    R.uniq
  )([
    1,
    ...R.range(2, 2 + marginPagesDisplayed),
    ...R.range(page - pageRangeDisplayed, page + pageRangeDisplayed + 1),
    ...R.range(pages - marginPagesDisplayed, pages + 1),
  ]);

  return pageArray;
};

export default calculate;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  constructor() {}

  @Input() page: number;
  @Input() pages: number;
  @Input() updatePage;

  getPages() {
    return calculate({
      page: this.page,
      pages: this.pages,
    });
  }

  ngOnInit(): void {}
}
