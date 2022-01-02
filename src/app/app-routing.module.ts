import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'vehicle', loadChildren: () => import('./vehicle/vehicle.module').then(module => module.VehicleModule) },
  { path: 'trip', loadChildren: () => import('./trip/trip.module').then(module => module.TripModule) },
  { path: 'routes', loadChildren: () => import('./routes/routes.module').then(module => module.RoutesModule) },
  { path: 'view', loadChildren: () => import('./view/view.module').then(module => module.ViewModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
