import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { BackendService } from '../../backend.service';
import { CategoryNameDialog } from '../../dialogs/dialogs.component';
import { Category } from '../../models/category-data';
import { DataService } from '../../services/data-service.service';

@Component({
    selector: 'app-edit-categories',
    templateUrl: './edit-categories.component.html',
    styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    categoriesSubscription!: Subscription;


    constructor(public dataService: DataService, private dialog: MatDialog,
        private snackbar: MatSnackBar, private backend: BackendService) {

    }

    ngOnDestroy(): void {
        if (this.categoriesSubscription)
            this.categoriesSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.onGetCategories();
    }

    onGetCategories(): void {
        this.categoriesSubscription = this.backend.getCategories()
            .subscribe(categories => this.categories = categories)
    }

    addCategory() {
        const dialogRef = this.dialog.open(CategoryNameDialog, {
            width: '250px',
            data: 'New category'
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('result:', result)
            if (result) {
                this.backend.createCategory(result).then(() => {
                    this.snackbar.open(`'${result}' category created! 🎉`, '', {
                        duration: 2000,
                    });
                })
                    .catch(err => {
                        this.snackbar.open(`Failed to create: ${err}`, '', {
                            duration: 2000,
                        });
                    });
                // this.dataService.createCategory(result).then(() => {
                //     this.snackbar.open(`'${result}' category created! 🎉`, '', {
                //         duration: 2000,
                //     });
                // })
                //     .catch(err => {
                //         this.snackbar.open(`Failed to create: ${err}`, '', {
                //             duration: 2000,
                //         });
                //     });
            }
        });
    }
}
