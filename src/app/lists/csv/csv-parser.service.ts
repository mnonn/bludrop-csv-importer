import { Injectable } from '@angular/core';
import { TableData } from './csv-parser.api';

@Injectable()
export class CSVParserService {
    constructor() {}

    parseCSVContent(fileContent: string): TableData {
        const output = [];
        const result = fileContent.split('\n');
        result.forEach((row: string, idx: number) => {
            output[idx] = row.split(',');
        });
        return this.getTableData(output);
    }

    getTableData(array: string[][]): TableData {
        const output = [];
        for (let i = 1; i < array.length; i++) {
            output[i - 1] = this.getRowObject(array[0], array[i]);
        }
        const temp = { headers: array[0], rows: output };
        console.log(temp);
        return temp;
    }

    getRowObject(labels: string[], values: string[]): Object {
        const obj = { type: null };
        labels.forEach((label: string, idx: number) => {
            obj[label] = values[idx];
        });
        return obj;
    }
}
