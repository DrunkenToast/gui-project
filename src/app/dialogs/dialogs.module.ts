import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNameDialog, ConfirmDeleteDialog, ConfirmDiscardDialog, PresetNameDialog, SoundAddDialog, SoundEditDialog } from './dialogs.component';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [
        CategoryNameDialog,
        ConfirmDeleteDialog,
        ConfirmDiscardDialog,
        PresetNameDialog,
        SoundAddDialog,
        SoundEditDialog,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatOptionModule,
        MatButtonModule

    ]
})
export class DialogsModule { }
