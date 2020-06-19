import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';

// libs
import { NgSelectModule } from '@ng-select/ng-select';

// ui components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DevComponent } from './components/dev/dev.component';
import { ProcessingComponent } from './components/processing/processing.component';
import { PaginationComponent } from './components/pagination/pagination.component';

// pages
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BooksComponent } from './pages/books/books.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AdminPanelComponent } from './pages/admin/panel/panel.component';
import { AsideMenuComponent } from './pages/admin/panel/aside-menu/aside-menu.component';
import { GenresComponent } from './pages/admin/genres/genres.component';
import { StartComponent } from './pages/admin/start/start.component';
import { TagsComponent } from './pages/admin/tags/tags.component';
import { MessageComponent } from './components/message/message.component';
import { SectionsComponent } from './pages/admin/sections/sections.component';
import { AdminBooksComponent } from './pages/admin/books/books.component';
import { CreateBookComponent } from './pages/admin/create-book/create-book.component';
import { CreateBookEpisodesComponent } from './pages/admin/create-book/episodes/episodes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    BooksComponent,
    ProfileComponent,
    DevComponent,
    AdminPanelComponent,
    AsideMenuComponent,
    GenresComponent,
    StartComponent,
    ProcessingComponent,
    PaginationComponent,
    TagsComponent,
    MessageComponent,
    SectionsComponent,
    AdminBooksComponent,
    CreateBookComponent,
    CreateBookEpisodesComponent,
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
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
