import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sound, NewSound } from '../models/sound-data';
import { DataService } from '../services/data-service.service';

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
    this.dialogRef.close();
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

@Component({
  selector: 'sound-dialog',
  templateUrl: 'dialog-sound.html',
})
export class SoundAddDialog {
  action = 'Add';
  data: NewSound = {
    title: 'New Sound',
    categoryID: '', // TODO: Check if this worky
    icon: '',
    src: '',
  }

  constructor(
    public dialogRef: MatDialogRef<SoundEditDialog>,
    public dataservice: DataService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
