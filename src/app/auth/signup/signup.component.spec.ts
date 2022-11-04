import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    const validEmails = [
        'notbob@telenet.be',
        'real@address.domain.com',
        'example@domain'
    ];

    const invalidEmails = [
        'inv@alid@email.add',
        'in"valid"@email.com'
    ]

    const usedEmails = [
        'bob@telenet.be',
        'usedemail@example.com'
    ]
    const validPasswords = ['T@st+123ab4', 'test1234', 'These-passwords_match !']

    class MockRouter { };
    class MockAuthService {
        emailSignInMethods(email: string): Promise<string[]> {
            return new Promise((resolve) => {
                if (usedEmails.includes(email)) {
                    resolve(['multiple', 'methods']);
                }
                else {
                    resolve([]);
                }
            })
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignupComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatIconModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatButtonModule,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: AuthService,
                    useClass: MockAuthService
                },
                { provide: Router, useValue: MockRouter },
                { provide: MatSnackBar, useValue: {} },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    })

    // Positive test cases for valid password matching
    it('Password fields should match', () => {
        for (const pass of validPasswords) {
            component.form.get('password')?.setValue(pass)
            component.form.get('confirm_password')?.setValue(pass)

            expect(component.form.hasError('nomatch')).toBeFalsy()
        }
    });

    // Positive test for toggle password view
    // It should start hidden, thus one toggle -> visible/type text
    it('Click toggle password view should make password fields visible', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        compiled.querySelector('button').click();
        fixture.detectChanges();

        expect(compiled.querySelector('input[formControlName="password"]')
            .getAttribute('type')).toBe('text')
        expect(compiled.querySelector('input[formControlName="confirm_password"]')
            .getAttribute('type')).toBe('text')
    });

    // Positive test cases for valid email addresses
    it('Valid email should make email field valid', fakeAsync(async () => {
        for (const email of validEmails) {
            fixture.detectChanges();
            component.form.get('email')?.setValue(email);
            component.form.get('email')?.updateValueAndValidity();
            flush();

            await fixture.whenStable().then(() => {
                expect(component.form.get('email')?.valid).toBeTruthy();
            });
        }
    }));

    // Negative test for checking if the form is invalid when pwds don't match
    it('Form should invalid when passwords don\'t match', () => {
        component.form.get('password')?.setValue('test1234')
        component.form.get('confirm_password')?.setValue('test12345')

        expect(component.form.hasError('nomatch')).toBeTruthy()
    });

    // Negative test for checking if the submit button is disabled with an invalid form
    it('Submit button should be disabled with an invalid form', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;

        expect(compiled.querySelector('button[type="submit"]')
            .getAttribute('disabled')).toBeTruthy()
    });

    // Negative test cases for used email addresses
    it('Invalid emails should make email field invalid', fakeAsync(async () => {
        for (const email of usedEmails.concat(invalidEmails)) {
            fixture.detectChanges();
            component.form.get('email')?.setValue(email);
            component.form.get('email')?.updateValueAndValidity();
            flush();

            await fixture.whenStable().then(() => {
                expect(component.form.get('email')?.valid).toBeFalsy();
            });
        }
    }));
});
