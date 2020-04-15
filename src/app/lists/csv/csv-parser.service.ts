import { Injectable } from '@angular/core';
import { TableData } from './csv-parser.api';
import { UtilService } from '../../util/util.service';

@Injectable()
export class CSVParserService {
    constructor(private util: UtilService) { }

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
            const row = this.getRowObject(array[0], array[i]);
            if (this.util.isEmpty(row)) {
                continue;
            }
            output.push(row);
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
