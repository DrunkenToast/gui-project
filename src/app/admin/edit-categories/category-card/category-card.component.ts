import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/backend.service';
import { CategoryNameDialog, ConfirmDeleteDialog, PresetNameDialog } from 'src/app/dialogs/dialogs.component';
import { Category } from 'src/app/models/category-data';
import { DataService } from 'src/app/services/data-service.service';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
    @Input() category: Category = {
        id: "",
        name: 'No category',
    };

    constructor(private backend: BackendService, private data: DataService,
        private dialog: MatDialog, private snackbar: MatSnackBar) { }

    ngOnInit(): void {
    }

    onRename(): void {
        const dialogRef = this.dialog.open(CategoryNameDialog, {
            width: '250px',
            data: this.category.name
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.backend.updateCategory(this.category.id, result).then(() => {
                    this.snackbar.open(`Category renamed to '${result}'! 🎉`, '', {
                        duration: 2000,
                    });
                })
                    .catch(err => {
                        this.snackbar.open(`Failed to rename: ${err}`, '', {
                            duration: 2000,
                        });
                    });
            }
        });
    }

    onDelete(): void {
        const dialogRef = this.dialog.open(ConfirmDeleteDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let foundSounds = this.data.sounds.filter(sound => sound.categoryID === this.category.id)

                if (foundSounds.length > 0) {
                    this.snackbar.open('Delete failed. Sounds in category: ' + foundSounds.map(s => s.title).join(', '), '', {
                        duration: 5000,
                    });
                } else {
                    this.backend.deleteCategory(this.category.id)
                        .then(() => {
                            this.snackbar.open('Category removed', '', {
                                duration: 2000,
                            });
                        })
                        .catch(err => {
                            this.snackbar.open(`Failed to delete: ${err}`, '', {
                                duration: 2000,
                            });
                        });
                }
            }
        });
    }

}
