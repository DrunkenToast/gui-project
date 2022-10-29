import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../services/data-service.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

    constructor(public data: DataService, private auth: AuthService) { }

    ngOnInit(): void {
    }

    get isAdmin() {
        return this.auth.isAdmin;
    }

    // Ugly code, but it works
    toggleAllSelected(): void {
        let toggle = !this.allCategoriesSelected();

        this.data.filters.categories.forEach((_val, id) => {
            this.data.filters.categories.set(id, toggle);
        })
    }

    allCategoriesSelected(): boolean {
        for (let val of this.data.filters.categories.values()) {
            if (!val)
                return false;
        }
        return true;
    }

    checkCategory(checkbox: MatCheckboxChange) {
        this.data.filters.categories.set(checkbox.source.value, checkbox.checked);
    }

    isChecked(id: string): boolean {
        return this.data.filters.categories.get(id) || false;
    }
}
