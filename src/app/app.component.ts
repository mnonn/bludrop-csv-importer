import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    activeView = '/';
    isLanding: boolean;

    constructor(
        public electronService: ElectronService,
        private translate: TranslateService,
        private router: Router
    ) {
        translate.setDefaultLang('de');
        console.log('AppConfig', AppConfig);

        if (electronService.isElectron) {
            console.log(process.env);
            console.log('Mode electron');
            console.log('Electron ipcRenderer', electronService.ipcRenderer);
            console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            console.log('Mode web');
        }
    }

    ngOnInit() {
        this.router.events
            .pipe(filter(params => params instanceof NavigationStart))
            .subscribe((params: NavigationStart) => {
                this.activeView = params.url;
                this.isLanding = this.activeView === '/' || this.activeView === '' || this.activeView === '/landing';
            });
    }
}
