import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    loginFailed = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;

        this.authService.login(email, password)
            .then(() => {
                this.router.navigate(['']); // TODO: sometimes doesn't navigates
            })
            .catch((err) => {
                this.loginFailed = true
            })
    }
}
