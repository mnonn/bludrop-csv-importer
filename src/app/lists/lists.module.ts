import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { CsvComponent } from './csv/csv.component';
import { CSVParserService } from './csv/csv-parser.service';

const SERVICES = [
    CSVParserService
]

@NgModule({
    declarations: [CsvComponent],
    imports: [
        CommonModule,
        ListsRoutingModule,
        SharedModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [SERVICES]
})
export class ListsModule {}
