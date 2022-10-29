import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { AddSoundComponent } from './admin-panel/add-sound/add-sound.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';

const routes: Routes = [
    {
        path: 'panel', component: AdminPanelComponent,
        children: [
            {
                path: 'add-sound', component: AddSoundComponent,
                canDeactivate: [CanDeactivateGuard]
            },
            {
                path: 'edit-categories', component: EditCategoriesComponent,
            },
        ]
    },
    { path: '**', redirectTo: 'panel' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
