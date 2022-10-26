import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import { DataService } from 'src/app/services/data-service.service';

@Component({
    selector: 'app-add-sound',
    templateUrl: './add-sound.component.html',
    styleUrls: ['./add-sound.component.css']
})
export class AddSoundComponent implements OnInit {
    selectedFile?: File;
    constructor(private dataservice: DataService, private backend: BackendService) { }

    ngOnInit(): void {
    }

    get categories() {
        return this.dataservice.categories;
    }

    onFileSelect(event: Event) {
        // TODO: check file type
        const t = event.target as HTMLInputElement;
        if (t.files)
            this.selectedFile = t.files[0] ?? null;
    }

    onSubmit(f: NgForm) {
        if (!this.selectedFile) return;

        this.backend.createSound(
            {
                title: f.value.title,
                icon: f.value.icon,
                categoryID: f.value.category,
            },
            this.selectedFile
        )
    }
}
