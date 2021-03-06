import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

// regular pages
import { BooksComponent } from './pages/books/books.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StartComponent } from './pages/start/start.component';

// book pages
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookReadComponent } from './pages/book-read/book-read.component';

// admin pages
import { AdminPanelComponent } from './pages/admin/panel/panel.component';

// book resources
import { GenresComponent } from './pages/admin/book-resources/genres/genres.component';
import { TagsComponent } from './pages/admin/book-resources/tags/tags.component';
import { SectionsComponent } from './pages/admin/book-resources/sections/sections.component';
import { AuthorsComponent } from './pages/admin/book-resources/authors/authors.component';
import { PaintersComponent } from './pages/admin/book-resources/painters/painters.component';
import { TranslatorsComponent } from './pages/admin/book-resources/translators/translators.component';
import { PublishersComponent } from './pages/admin/book-resources/publishers/publishers.component';

import { AdminStartComponent } from './pages/admin/start/start.component';
import { AdminBooksComponent } from './pages/admin/books/books.component';
import { CreateBookComponent } from './pages/admin/create-book/create-book.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UpdateBookComponent } from './pages/admin/update-book/update-book.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
  },
  {
    path: 'books/:id/read/:episode',
    component: BookReadComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: AdminStartComponent,
      },

      { path: 'users', component: UsersComponent },

      // book attributes
      { path: 'genres', component: GenresComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'painters', component: PaintersComponent },
      { path: 'translators', component: TranslatorsComponent },
      { path: 'publishers', component: PublishersComponent },

      { path: 'books', component: AdminBooksComponent },
      { path: 'books/new', component: CreateBookComponent },
      { path: 'books/:id/update', component: UpdateBookComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
