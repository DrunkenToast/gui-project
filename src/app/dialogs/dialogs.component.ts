import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sound, NewSound } from '../models/sound-data';
import { DataService } from '../services/data-service.service';

@Component({
    selector: 'confirm-discard-dialog',
    templateUrl: 'dialog-confirm-discard.html',
})
export class ConfirmDiscardDialog {
    constructor(
        public dialogRef: MatDialogRef<PresetNameDialog>,
    ) { }

    onCancelClick(): void {
        this.dialogRef.close(false);
    }

    onDiscardClick(): void {
        this.dialogRef.close(true);
    }
}

@Component({
    selector: 'confirm-delete-dialog',
    templateUrl: 'dialog-confirm-delete.html',
})
export class ConfirmDeleteDialog {
    constructor(
        public dialogRef: MatDialogRef<PresetNameDialog>,
    ) { }

    onCancelClick(): void {
        this.dialogRef.close(false);
    }

    onDeleteClick(): void {
        this.dialogRef.close(true);
    }
}

@Component({
    selector: 'category-name-dialog',
    templateUrl: 'dialog-category-name.html',
})
export class CategoryNameDialog {
    constructor(
        public dialogRef: MatDialogRef<CategoryNameDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string,
    ) { }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onSubmit(): void {
        this.dialogRef.close(this.data);
    }
}

@Component({
    selector: 'preset-name-dialog',
    templateUrl: 'dialog-preset-name.html',
})
export class PresetNameDialog {
    constructor(
        public dialogRef: MatDialogRef<PresetNameDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.dialogRef.close(this.data);
    }
}

@Component({
    selector: 'sound-edit-dialog',
    templateUrl: 'dialog-sound.html',
})
export class SoundEditDialog {
    action = 'Edit';
    constructor(
        public dialogRef: MatDialogRef<SoundEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Sound,
        public dataservice: DataService
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

