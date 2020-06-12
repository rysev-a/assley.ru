import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BooksComponent } from './pages/books/books.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminPanelComponent } from './pages/admin/panel/panel.component';
import { GenresComponent } from './pages/admin/genres/genres.component';
import { StartComponent } from './pages/admin/start/start.component';
import { TagsComponent } from './pages/admin/tags/tags.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'books/:category',
    component: BooksComponent,
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
        component: StartComponent,
      },
      { path: 'genres', component: GenresComponent },
      { path: 'tags', component: TagsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
