import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { CsvComponent } from './csv/csv.component';

@NgModule({
    declarations: [CsvComponent],
    imports: [CommonModule, ListsRoutingModule]
})
export class ListsModule {}
