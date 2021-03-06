import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

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
import { PresetCardComponent } from './presets/preset-card/preset-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './filters/filters.component';
import { FormsModule } from '@angular/forms';
import { FilterCategoriesPipe } from './filter-categories.pipe';
import { PresetsComponent } from './presets/presets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ConfirmDeleteDialog, PresetNameDialog, SoundEditDialog, SoundAddDialog, CategoryNameDialog } from './dialogs/dialogs.component';
import { PillowComponent } from './pillow/pillow.component';
import { AboutComponent } from './about/about.component';
import { StatusCodePageComponent } from './status-code-page/status-code-page.component';
import { CardComponent } from './card/card.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { CategoryCardComponent } from './edit-categories/category-card/category-card.component';


@NgModule({
  declarations: [
    AppComponent,
    SoundGridComponent,
    SoundCardComponent,
    NavbarComponent,
    FilterSoundsPipe,
    NavigationComponent,
    PresetCardComponent,
    FiltersComponent,
    FilterCategoriesPipe,
    PresetsComponent,
    PresetNameDialog,
    SoundEditDialog,
    ConfirmDeleteDialog,
    PillowComponent,
    SoundAddDialog,
    CategoryNameDialog,
    AboutComponent,
    StatusCodePageComponent,
    CardComponent,
    EditCategoriesComponent,
    CategoryCardComponent,
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
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  providers: [MatSnackBar, Title],
  bootstrap: [AppComponent]
})
export class AppModule {
}
