import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NavGridComponent } from './nav-grid/nav-grid.component';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';


const materialComponents = [MatButtonModule, MatGridListModule, MatCardModule];

@NgModule({
    declarations: [NavGridComponent],
    imports: [CommonModule, LandingRoutingModule, materialComponents, SharedModule]
})
export class LandingModule {}
