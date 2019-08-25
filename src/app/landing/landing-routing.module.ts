import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavGridComponent } from './nav-grid/nav-grid.component';

const routes: Routes = [
    {
        path: '',
        component: NavGridComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule {}
