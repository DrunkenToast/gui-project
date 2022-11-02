# Testing results

```
❯ ng test
✔ Browser application bundle generation complete.
Chrome 107.0.0.0 (Linux x86_64): Executed 6 of 6 SUCCESS (0.187 secs / 0.173 secs)
TOTAL: 6 SUCCESS
```

```
6 specs, 0 failures, randomized with seed 39481
    SignupComponent
        - Invalid emails should make email field invalid
        - Form should invalid when passwords don't match
        - Submit button should be disabled with an invalid form
        - Click toggle password view should make password fields visible
        - Valid email should make email field valid
        - Password fields should match
```

## Positive tests

- Correct email -> valid email field // check
- 2 valid password -> valid form // check
- Click toggle password view -> vissible fields/type text // check

## Negative tests

- Passwords don't match -> invalid form // check
- Invalid form -> button disabled // Check
- Invalid (includes used) emails -> invalid email field


