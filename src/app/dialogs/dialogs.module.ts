import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNameDialog, ConfirmDeleteDialog, ConfirmDiscardDialog, PresetNameDialog, SoundEditDialog } from './dialogs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        CategoryNameDialog,
        ConfirmDeleteDialog,
        ConfirmDiscardDialog,
        PresetNameDialog,
        SoundEditDialog,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
    ]
})
export class DialogsModule { }
