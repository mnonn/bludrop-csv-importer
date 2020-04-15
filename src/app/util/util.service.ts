import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilService {

    constructor() { }

    isEmpty(obj: Object): boolean {
        if (obj) {
            return !Object.keys(obj).some(key => {
                const value = obj[key];
                const valid = value !== undefined && value !== null;
                if (valid && typeof value === 'string' && value.length === 0) {
                    return false
                }
                return valid;
            })
        } else return true;
    }

}
