import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/backend.service';
import { CanComponentDeactivate } from 'src/app/can-deactivate.guard';
import { ConfirmDiscardDialog } from 'src/app/dialogs/dialogs.component';
import { DataService } from 'src/app/services/data-service.service';

@Component({
    selector: 'app-add-sound',
    templateUrl: './add-sound.component.html',
    styleUrls: ['./add-sound.component.css']
})
export class AddSoundComponent implements OnInit, CanComponentDeactivate {
    @ViewChild('f') form?: NgForm;
    selectedFile?: File;
    inProgress: boolean = false;

    constructor(private dataservice: DataService, private backend: BackendService,
        private snackbar: MatSnackBar, private dialog: MatDialog) { }

    canDeactivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.form?.touched) {
                resolve(true);
                return;
            }

            const dialogRef = this.dialog.open(ConfirmDiscardDialog);
            dialogRef.afterClosed().subscribe(result => {
                return resolve(result);
            });
        })
    }

    ngOnInit(): void {
    }

    get categories() {
        return this.dataservice.categories;
    }

    onFileSelect(event: Event) {
        const t = event.target as HTMLInputElement;
        if (t.files)
            this.selectedFile = t.files[0] ?? null;
    }

    onSubmit(f: NgForm) {
        if (!this.selectedFile) return;

        this.inProgress = true;

        this.backend.createSound(
            {
                title: f.value.title,
                icon: f.value.icon,
                categoryID: f.value.category,
            }, this.selectedFile)
            .then(() => {
                this.snackbar.open(`Sound added`, '', {
                    duration: 2000,
                });
            })
            .catch(err => {
                this.snackbar.open(`Failed to add sound: ${err}`, '', {
                    duration: 2000,
                });
            })
        .finally(() => this.inProgress = false);
    }
}
