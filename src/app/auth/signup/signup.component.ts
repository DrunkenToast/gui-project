import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
            email: new FormControl(null, [Validators.email, this.emailTaken.bind(this)]),
            password: new FormControl(null),
            confirm_password: new FormControl(null),
        });
    }

    onSubmit(): void {
        const email = this.form.value.email;
        const password = this.form.value.password;

        this.authService.signup(email, password)
            .then(() => {
                this.router.navigate(['/login']);
            })
            .catch((err) => {
                console.log("wtf??")
                alert(err); //TODO: pretty dialog
            })
    }
    emailTaken(control: FormControl): Promise<ValidationErrors | null> | Observable< ValidationErrors | null> {
        return new Promise((resolve) => {
            this.authService.emailSignInMethods(control.value)
                .then(signInMethods => {
                    console.log('length', signInMethods.length)
                    if (signInMethods.length < 0) {
                        resolve({ 'emailInUse': true })
                    }
                    resolve(null);
                })
                .catch((err) => {
                    resolve({ 'emailInUse': true })
                })
        })
    }

    // emailTaken(): AsyncValidatorFn {
    //     return (control: AbstractControl): Promise<ValidationErrors | null> => {
    //         return new Promise((resolve) => {
    //             this.authService.emailSignInMethods(control.value)
    //                 .then(signInMethods => {
    //                     console.log('length', signInMethods.length)
    //                     if (signInMethods.length < 0) {
    //                         resolve({ 'exists': true })
    //                     }
    //                         resolve({ 'exists': true })
    //                     // resolve(null);
    //                 })
    //                 .catch((err) => {
    //                     resolve({ 'exists': true })
    //                 })
    //             })
    //     }
    // }

    get emailErrMsg(): string {
        console.log(this.form.get('email')?.errors)
        return this.form.get('email')?.hasError('email') ?
            'Invalid email address' :
            this.form.get('email')?.hasError('emailInUse') ?
                'Email address already in use' : '';

    }
}
