import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// pages
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BooksComponent } from './pages/books/books.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DevComponent } from './components/dev/dev.component';
import { AdminPanelComponent } from './pages/admin/panel/panel.component';
import { AsideMenuComponent } from './pages/admin/panel/aside-menu/aside-menu.component';
import { GenresComponent } from './pages/admin/genres/genres.component';
import { StartComponent } from './pages/admin/start/start.component';
import { ProcessingComponent } from './components/processing/processing.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TagsComponent } from './pages/admin/tags/tags.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
