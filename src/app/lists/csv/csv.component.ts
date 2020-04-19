import { CSVParserService } from './csv-parser.service';
import { Component, OnInit, Input } from '@angular/core';
import { TableData, SortHelper, SortType } from './csv-parser.api';
import { ListObj } from '../lists.api';


@Component({
    selector: 'app-csv',
    templateUrl: './csv.component.html',
    styleUrls: ['./csv.component.scss']
})
export class CsvComponent implements OnInit {

    @Input()
    list: ListObj;

    sorting: SortHelper[];

    constructor(private csvParser: CSVParserService) {
        this.sorting = [];
    }

    ngOnInit() {
    }

    // handleFileInput(file: FileList) {
    //     if (file.length > 0) {
    //         const fileContent = file[0];
    //         const reader = new FileReader();
    //         reader.onload = event => {
    //             const workbook = XLSX.read(event.target.result, { type: 'array' });
    //             const resultData = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
    //             this.tableData = this.csvParser.parseCSVContent(
    //                 resultData
    //             );
    //             this.origData = {
    //                 headers: [].concat(this.tableData.headers),
    //                 rows: [].concat(this.tableData.rows)
    //             };
    //             const filePicker = document.getElementById('inputFile');
    //             if(filePicker) {
    //                 filePicker['value'] = '';
    //             }
    //         };
    //         reader.readAsArrayBuffer(fileContent);
    //     }
    // }

    applyFilter(query: string) {
        if (!query || query.length === 0) {
            this.list.tableData.rows = [].concat(this.list.tableDataOrig.rows);
        }
        this.list.tableData.rows = this.list.tableDataOrig.rows.filter(row => {
            for (const value in row) {
                if (value && row[value]) {
                    if (
                        row[value]
                            .toString()
                            .trim()
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    ) {
                        return true;
                    }
                }
            }
            return false;
        });
    }

    sortColumn(attr: string) {
        let sort = this.sorting.find(sortObj => sortObj.header === attr);
        if (sort) {
            sort.sortType =
                sort.sortType === SortType.ASC ? SortType.DSC : SortType.ASC;
        } else {
            sort = new SortHelper(attr);
            this.sorting.push(sort);
        }
        this.list.tableData.rows.sort((a: Object, b: Object) => {
            // FIXME lol
            if (a[attr] > b[attr]) {
                return sort.sortType === SortType.ASC ? 1 : -1;
            } else if (a[attr] < b[attr]) {
                return sort.sortType === SortType.ASC ? -1 : 1;
            } else {
                return 0;
            }
        });
        this.list.tableData.rows = [].concat(this.list.tableData.rows);
    }
}
