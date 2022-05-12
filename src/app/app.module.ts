import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { plLocale } from 'ngx-bootstrap/locale';
import { RippleModule } from 'primeng/ripple';
import { DetailsHeaderComponent } from './components/list/details/details-header/details-header.component';
import { DetailsGalleryComponent } from './components/list/details/details-gallery/details-gallery.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
defineLocale('pl', plLocale);

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DetailsHeaderComponent,
    DetailsGalleryComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    BsDatepickerModule,
    RippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
