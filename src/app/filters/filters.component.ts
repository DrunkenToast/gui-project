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

    // this.data.categories.forEach(category => {
    //   this.data.filters.categories[category.id] = toggle;
    // });
  }

  allCategoriesSelected(): boolean {
    let toggle = this.data.filters.categories.includes(false)

    if (this.data.filters.categories.length == 0) {
      toggle = true;
    }
    return !toggle
  }
}
