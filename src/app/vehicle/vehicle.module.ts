import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleMainComponent } from './main/vehicle.main.component';
import { VehicleFormComponent } from './form/vehicle.form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VehicleMainComponent,
    VehicleFormComponent,
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
  ,
  exports: [VehicleMainComponent,
    VehicleFormComponent, VehicleRoutingModule]
})
export class VehicleModule { }
