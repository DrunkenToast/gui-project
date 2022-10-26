import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { CategoryCardComponent } from './edit-categories/category-card/category-card.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CardModule } from '../card/card.module';
import { MatIconModule } from '@angular/material/icon';
import { AddSoundComponent } from './admin-panel/add-sound/add-sound.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
        AdminPanelComponent,
        EditCategoriesComponent,
        CategoryCardComponent,
        AddSoundComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        CardModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
    ]
})
export class AdminModule { }

