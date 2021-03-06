import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './components/nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {ProductPageComponent} from './components/product-page/product-page.component';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchBoxComponent} from './components/search-bar/search-box.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from './shared/components/dialog/dialog.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductPageComponent,
    SearchBoxComponent,
    DialogComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    HttpClientModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  entryComponents: [
    DialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
