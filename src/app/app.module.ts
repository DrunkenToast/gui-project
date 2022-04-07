import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatChipsModule } from '@angular/material/chips'
import { MatButtonModule } from '@angular/material/button'

import { SoundGridComponent } from './sound-grid/sound-grid.component';
import { SoundCardComponent } from './sound-grid/sound-card/sound-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterSoundsPipe } from './filter-sounds.pipe'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CardtestComponent } from './cardtest/cardtest.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SoundGridComponent,
    SoundCardComponent,
    NavbarComponent,
    FilterSoundsPipe,
    NavigationComponent,
    CardtestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatSidenavModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatListModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
