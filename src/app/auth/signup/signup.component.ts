import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

    constructor(private auth: AuthService, private router: Router, private snackbar: MatSnackBar) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            'email': new FormControl(null,
                [Validators.required, Validators.email], [this.emailInUseValidator.bind(this)]
            ),
            'password': new FormControl(null, [Validators.required]),
            'confirm_password': new FormControl(null,
                [Validators.required, this.matchValue('password')]
            ),
        }, [this.matchPasswords('password', 'confirm_password')])
    }

    onSubmit(): void {
        if (!this.form.valid) return;

        const email = this.form.get('email')?.value;
        const pass = this.form.get('password')?.value;

        this.auth.signup(email, pass)
            .then(() => {
                this.snackbar.open(`Account succesfully registered!`, '', {
                    duration: 2000,
                });
                this.router.navigate(['/login']);
            })
            .catch((err) => {
                this.snackbar.open(`Something went wrong :/`, '', {
                    duration: 2000,
                });
                console.error(err);
            })
    }

    emailInUseValidator(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve) => {
            if (control.hasError('email')) resolve(null);
            this.auth.emailSignInMethods(control.value)
                .then(methods => {
                    if (methods.length > 0) {
                        resolve({ 'emailInUse': true });
                    }
                    resolve(null);
                })
                .catch((err) => {
                    resolve({ 'email': true });
                })
        })
    }

    get emailErrMsg() {
        console.log(this.form.hasError('matches'))
        const email = this.form.get('email');
        return email?.hasError('email') ?
            'Invalid email address' :
            email?.hasError('emailInUse') ?
                'Email address is already in use' : '';

    }

    matchPasswords(password: string, confirm_password: string) {
        return (form: FormGroup) => {
            const pass = form.get(password)?.value;
            const confirm = form.get(confirm_password)?.value;


            // return pass === confirm ?
            //     null : { matches: false };
        }
    }
}

matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value === this.form?.get(matchTo)?.value ?
            null : { matches: false };
    };
}
}
