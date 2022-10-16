import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryNameDialog } from '../dialogs/dialogs.component';
import { DataService } from '../services/data-service.service';

@Component({
    selector: 'app-edit-categories',
    templateUrl: './edit-categories.component.html',
    styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {


    constructor(public dataService: DataService, private dialog: MatDialog, private snackbar: MatSnackBar) { }

    ngOnInit(): void {
    }

    addCategory() {
        const dialogRef = this.dialog.open(CategoryNameDialog, {
            width: '250px',
            data: 'New category'
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('result:', result)
            if (result) {
                this.dataService.createCategory(result).then(() => {
                    this.snackbar.open(`'${result}' category created! 🎉`, '', {
                        duration: 2000,
                    });
                })
                    .catch(err => {
                        this.snackbar.open(`Failed to create: ${err}`, '', {
                            duration: 2000,
                        });
                    });
            }
        });
    }
}
