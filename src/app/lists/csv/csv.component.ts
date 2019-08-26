import { CSVParserService } from './csv-parser.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-csv',
    templateUrl: './csv.component.html',
    styleUrls: ['./csv.component.scss']
})
export class CsvComponent implements OnInit {
    fileContent: File;

    constructor(private csvParser: CSVParserService) {}

    ngOnInit() {}

    handleFileInput(file: FileList) {
        if (file.length > 0) {
            this.fileContent = file[0];
            const reader = new FileReader();
            reader.onload = event => this.fileContent = event.target['result'];
            reader.readAsText(this.fileContent);
        }
    }
}
