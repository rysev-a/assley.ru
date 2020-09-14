import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { CustomErrorHandler } from './core/CustomErrorHandler';

// libs
import { NgSelectModule } from '@ng-select/ng-select';

// ui components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DevComponent } from './components/dev/dev.component';
import { ProcessingComponent } from './components/processing/processing.component';
import { PaginationComponent } from './components/pagination/pagination.component';

// regular pages
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BooksComponent } from './pages/books/books.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StartComponent } from './pages/start/start.component';

// admin
import { AdminPanelComponent } from './pages/admin/panel/panel.component';
import { AsideMenuComponent } from './pages/admin/panel/aside-menu/aside-menu.component';
import { GenresComponent } from './pages/admin/genres/genres.component';
import { AdminStartComponent } from './pages/admin/start/start.component';
import { TagsComponent } from './pages/admin/tags/tags.component';
import { MessageComponent } from './components/message/message.component';
import { SectionsComponent } from './pages/admin/sections/sections.component';
import { AdminBooksComponent } from './pages/admin/books/books.component';
import { CreateBookComponent } from './pages/admin/create-book/create-book.component';
import { CreateBookEpisodesComponent } from './pages/admin/create-book/episodes/episodes.component';
import { UpdateBookEpisodesComponent } from './pages/admin/update-book/episodes/episodes.component';
import { ProgressComponent } from './components/progress/progress.component';
import { AuthorsComponent } from './pages/admin/authors/authors.component';
import { TranslatorsComponent } from './pages/admin/translators/translators.component';
import { PaintersComponent } from './pages/admin/painters/painters.component';
import { PublishersComponent } from './pages/admin/publishers/publishers.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookReadComponent } from './pages/book-read/book-read.component';
import { UpdateBookComponent } from './pages/admin/update-book/update-book.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,

    // regular pages
    StartComponent,
    BooksComponent,
    ProfileComponent,
    DevComponent,

    // admin pages
    AsideMenuComponent,
    GenresComponent,
    AdminPanelComponent,
    AdminStartComponent,
    ProcessingComponent,
    PaginationComponent,
    TagsComponent,
    MessageComponent,
    SectionsComponent,
    AdminBooksComponent,
    CreateBookComponent,
    CreateBookEpisodesComponent,
    ProgressComponent,
    AuthorsComponent,
    TranslatorsComponent,
    PaintersComponent,
    PublishersComponent,
    UsersComponent,
    BookDetailComponent,
    BookReadComponent,
    UpdateBookComponent,
    UpdateBookEpisodesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
