import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TripRoutingModule } from './trip-routing.module';
import { MainComponent } from './main/main.component';
import { FormComponent } from './form/form.component';
//import {  MAT_MOMENT_DATE_ADAPTER_OPTIONS} from ; 

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReferralGuideComponent } from './referral-guide/referral-guide.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [
    MainComponent,
    FormComponent,
    ReferralGuideComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule

  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TripModule { }