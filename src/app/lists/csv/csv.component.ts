import { CSVParserService } from './csv-parser.service';
import { Component, OnInit } from '@angular/core';
import { TableData, SortHelper, SortType } from './csv-parser.api';

@Component({
    selector: 'app-csv',
    templateUrl: './csv.component.html',
    styleUrls: ['./csv.component.scss']
})
export class CsvComponent implements OnInit {
    tableData: TableData;
    origData: TableData;
    sorting: SortHelper[];

    constructor(private csvParser: CSVParserService) {
        this.sorting = [];
    }

    ngOnInit() {}

    handleFileInput(file: FileList) {
        if (file.length > 0) {
            const fileContent = file[0];
            const reader = new FileReader();
            reader.onload = event => {
                this.tableData = this.csvParser.parseCSVContent(
                    event.target['result']
                );
                this.origData = {
                    headers: [].concat(this.tableData.headers),
                    rows: [].concat(this.tableData.rows)
                };
            };
            reader.readAsText(fileContent);
        }
    }

    applyFilter(query: string) {
        if (!query || query.length === 0) {
            this.tableData.rows = [].concat(this.origData.rows);
        }
        this.tableData.rows = this.origData.rows.filter(row => {
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
        this.tableData.rows.sort((a: Object, b: Object) => {
            if (a[attr] > b[attr]) {
                return sort.sortType === SortType.ASC ? 1 : -1;
            } else if (a[attr] < b[attr]) {
                return sort.sortType === SortType.ASC ? -1 : 1;
            } else {
                return 0;
            }
        });
        this.tableData.rows = [].concat(this.tableData.rows);
    }
}
