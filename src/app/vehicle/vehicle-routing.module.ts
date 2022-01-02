import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleFormComponent } from './form/vehicle.form.component';
import { VehicleMainComponent } from './main/vehicle.main.component';

const routes: Routes = [
  { path: "main", component: VehicleMainComponent },
  { path: "form", component: VehicleFormComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
