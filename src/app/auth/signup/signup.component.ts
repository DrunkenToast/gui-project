import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    hide = true;

    form!: FormGroup;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null),
            password: new FormControl(null),
            confirm_password: new FormControl(null),
        });
    }

    onSubmit(): void {
        const email = this.form.value.email;
        const password = this.form.value.password;
        console.log(email)

        this.authService.signup(email, password)
            .then(() => {
                this.router.navigate(['/login']);
            })
            .catch((err) => {
                alert(err); //TODO: pretty dialog
            })
    }
}
