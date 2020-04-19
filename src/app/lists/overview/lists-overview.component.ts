import { Component, OnInit } from '@angular/core';
import { ListObj } from '../lists.api';

import * as XLSX from 'xlsx';
import { CSVParserService } from '../csv/csv-parser.service';

@Component({
    selector: 'lists-overview-component',
    templateUrl: './lists-overview.component.html',
    styleUrls: ['./lists-overview.component.scss']
})

export class ListsOverviewComponent implements OnInit {

    lists: ListObj[] = [];
    selectedList: ListObj = null;

    constructor(private csvParser: CSVParserService) { }

    ngOnInit() { }

    selectList(list: ListObj) {
        this.selectedList = list;
    }

    handleFileInput(file: FileList) {
        if (file.length > 0) {
            const fileContent = file[0];
            const reader = new FileReader();
            reader.onload = event => {
                const workbook = XLSX.read(event.target.result, { type: 'array' });
                const resultData = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
                const tableData = this.csvParser.parseCSVContent(
                    resultData
                );
                const newList = new ListObj();
                newList.tableData = tableData;
                newList.name = 'Test';

                newList.tableDataOrig = {
                    headers: [].concat(tableData.headers),
                    rows: [].concat(tableData.rows)
                };

                this.lists.push(newList)
                const filePicker = document.getElementById('inputFile');
                if (filePicker) {
                    filePicker['value'] = '';
                }
            };
            reader.readAsArrayBuffer(fileContent);
        }
    }

}
