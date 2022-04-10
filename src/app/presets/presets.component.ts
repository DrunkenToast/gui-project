import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit(): void {
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
