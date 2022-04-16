import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Sound } from '../models/sound-data';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'dialog-confirm-delete.html',
})
export class ConfirmDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<PresetNameDialog>,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
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
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'sound-edit-dialog',
  templateUrl: 'dialog-sound-edit.html',
})
export class SoundEditDialog {
  constructor(
    public dialogRef: MatDialogRef<SoundEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Sound,
    public dataservice: DataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
