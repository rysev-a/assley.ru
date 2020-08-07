import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { BookService } from 'src/app/services/book.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.sass'],
})
export class UpdateBookComponent implements OnInit {
  book = {
    id: 0,
  };

  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    cover_image: [null, Validators.required],
  });

  loaded = false;
  faUpload = faUpload;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  onUploadCover(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.bookForm.patchValue({
        cover_image: file,
      });
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.detail(id).subscribe((response: any) => {
      this.book = response.item;
      console.log(this.book);
      this.loaded = true;
    });
  }

  onSubmit() {
    const payload = this.bookForm.value;
    const bookForm = new FormData();

    bookForm.append('cover', cover_image, cover_image.name);

    // append main info
    bookForm.append('payload', JSON.stringify(payload));

    this.bookService
      .putFormData(bookForm, `${this.book.id}`)
      .subscribe((response) => {
        if (response.type === HttpEventType.Response) {
          console.log(response);
        }
      });
  }
}
