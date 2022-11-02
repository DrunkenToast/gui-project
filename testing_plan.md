# Testing plan

For our final assignment we have to create a testing plan for a component of choice.

Here I decided to test the auth/signup/signup.component.ts component.

## Expectation that component is properly created

On creation the component contains:
- A title containing "Sign up to Pillow!"
- An email input field
- A password input field with hide toggle
- A confirm password input field with hide toggle
- A button to create the account
- A button to which links to the login page

## Email field

Requirements of the email input field:
- Cannot be empty
- Contains a valid email address
- Email is not already in use by someone else

| Test type | Input | Expectation |
|---|---|---|
| Positive | validmail@mail.com | Email field is valid |
| Negative | | Email field is not valid |
| Negative | not<a#valid,mail.com | Email field is not valid & an error message is shown indicating that the email address used is not valid |
| Megative | bob@telenet.be | Email field is not valid & an error message is shown to indicate that the email is in use |
| ... | More variations on input in the form | |

## Password fields

Requirements for the password and confirm password fields:
- Cannot be empty
- Password and password confirm values have to be the same

| Test type | Input password | Input confirm password | Expectation |
|---|---|---|---|
| Positive | test1234 | test1234 | Fields are valid |
| Negative | | | Fields are invalid |
| Negative | test1234 | 123test | Fields are invalid and message is shown to indicate that the passwords don't match |
| Negative | | 123test | Fields are invalid and message is shown to indicate that the passwords don't match |
| ... | More variations on input in password fields | |

## Toggle password view button

Requirements:
- Clicking the button toggles the view from text to password

| Test type | Input | Expectation |
|---|---|---|
| Positive | Click on button when password is hidden | Input field types of the password fields go from password to text |
| Positive | Click on button when password is visible | Input field types of the password fields go from text to password |

## Create account button

Requirements:
- Only disabled when the form is invalid
- On click, will create an account

| Test type | Input | Expectation |
|---|---|---|
| Positive | Valid form | Button is enabled |
| Negative | Invalid form | Button is disabled |
| Positive | Click on button with valid form | Account is created |
| Negative | Invalid form & click button | No account is created, no click |
| ... | More specific types of input in the form | |

## Login link button

| Test type | Input | Expectation |
|---|---|---|
| Positive | Click on button | Navigated to login page |

