import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RoutesRoutingModule } from './routes-routing.module';
import { MainComponent } from './main/main.component';
import { TripComponent } from './trip/trip.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    TripComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    FormsModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
    
  ]
})
export class RoutesModule { }
