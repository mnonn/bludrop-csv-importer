import { CSVParserService } from './csv-parser.service';
import { Component, OnInit } from '@angular/core';
import { TableData } from './csv-parser.api';

@Component({
    selector: 'app-csv',
    templateUrl: './csv.component.html',
    styleUrls: ['./csv.component.scss']
})
export class CsvComponent implements OnInit {
    tableData: TableData;

    constructor(private csvParser: CSVParserService) {}

    ngOnInit() {}

    handleFileInput(file: FileList) {
        if (file.length > 0) {
            const fileContent = file[0];
            const reader = new FileReader();
            reader.onload = event => {
                this.tableData = this.csvParser.parseCSVContent(
                    event.target['result']
                );
            };
            reader.readAsText(fileContent);
        }
    }
}
