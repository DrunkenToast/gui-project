import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSoundComponent } from './admin-panel/add-sound/add-sound.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';

const routes: Routes = [
    {
        path: 'panel', component: AdminPanelComponent,
        data: { title: 'Admin panel' },
        children: [
            {
                path: 'add-sound', component: AddSoundComponent,
                data: { title: 'Add sound' }
            },
            {
                path: 'edit-categories', component: EditCategoriesComponent,
                data: { title: 'Edit categories' }
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
