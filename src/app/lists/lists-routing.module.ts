import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsvComponent } from './csv/csv.component';
import { ListsOverviewComponent } from './overview/lists-overview.component';

const routes: Routes = [
    {
        path: '',
        component: ListsOverviewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListsRoutingModule {}
