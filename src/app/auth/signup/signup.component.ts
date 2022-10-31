import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    form!: UntypedFormGroup;

    constructor(private auth: AuthService, private router: Router, private snackbar: MatSnackBar) { }

    ngOnInit(): void {
        this.form = new UntypedFormGroup({
            'email': new UntypedFormControl(null,
                [Validators.required, Validators.email], [this.emailInUseValidator.bind(this)]
            ),
            'password': new UntypedFormControl(null, [Validators.required]),
            'confirm_password': new UntypedFormControl(null, [Validators.required]),
        }, [this.matchValue('password', 'confirm_password')])
    }

    onSubmit(): void {
        if (!this.form.valid) return;

        const email = this.form.get('email')?.value;
        const pass = this.form.get('password')?.value;

        this.auth.signup(email, pass)
            .then(() => {
                this.snackbar.open(`Account succesfully registered! 🎉`, '', {
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
            if (control.hasError('email')) {
                resolve(null)
                return;
            }
            this.auth.emailSignInMethods(control.value)
                .then(methods => {
                    if (methods.length > 0) {
                        resolve({ 'emailInUse': true });
                    }
                    resolve(null);
                })
                .catch(() => {
                    resolve({ 'email': true });
                })
        })
    }

    get emailErrMsg() {
        console.log('passwords match!', this.form.hasError('nomatch'))
        console.log(this.form.errors);
        const email = this.form.get('email');
        return email?.hasError('email') ?
            'Invalid email address' :
            email?.hasError('emailInUse') ?
                'Email address is already in use' : '';
    }

    // TODO: fix error message
    matchValue(value1: string, value2: string) {
        return (form: AbstractControl) => {
            const val1 = form.get(value1)?.value;
            const val2 = form.get(value2)?.value;

            return val1 === val2 ?
                null : { nomatch: true };
        }
    }
}
