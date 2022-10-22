import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { PillowComponent } from './pillow/pillow.component';
import { StatusCodePageComponent } from './status-code-page/status-code-page.component';

const routes: Routes = [
  {path: '', component: PillowComponent},
  // {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  // {path: 'signup', component: SignupComponent, data: {title: 'Sign up'}},
  {path: 'edit-categories', component: EditCategoriesComponent, data: {title: 'Edit categories'}},
  {path: 'about', component: AboutComponent, data: {title: 'About Pillow'}},
  {path: 'status-code/:code', component: StatusCodePageComponent, data: {title: ':/'}},
  {path: '**', redirectTo: 'status-code/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
