import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

// regular pages
import { BooksComponent } from './pages/books/books.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StartComponent } from './pages/start/start.component';

// admin pages
import { AdminPanelComponent } from './pages/admin/panel/panel.component';
import { GenresComponent } from './pages/admin/genres/genres.component';
import { AdminStartComponent } from './pages/admin/start/start.component';
import { TagsComponent } from './pages/admin/tags/tags.component';
import { SectionsComponent } from './pages/admin/sections/sections.component';
import { AdminBooksComponent } from './pages/admin/books/books.component';
import { CreateBookComponent } from './pages/admin/create-book/create-book.component';
import { AuthorsComponent } from './pages/admin/authors/authors.component';
import { PaintersComponent } from './pages/admin/painters/painters.component';
import { TranslatorsComponent } from './pages/admin/translators/translators.component';
import { PublishersComponent } from './pages/admin/publishers/publishers.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookReadComponent } from './pages/book-read/book-read.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
