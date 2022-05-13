import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { PillowComponent } from './pillow/pillow.component';
import { StatusCodePageComponent } from './status-code-page/status-code-page.component';

const routes: Routes = [
  {path: '', component: PillowComponent},
  {path: 'edit-categories', component: EditCategoriesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'status-code/:code', component: StatusCodePageComponent},
  {path: '**', redirectTo: 'status-code/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
