import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralGuideComponent } from './referral-guide/referral-guide.component';

const routes: Routes = [
  { path: "main", component: ReferralGuideComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
