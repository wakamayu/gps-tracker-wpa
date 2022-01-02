import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: "main", component: MainComponent },
  { path: "form", component: FormComponent },
  { path: "form/:id", component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
