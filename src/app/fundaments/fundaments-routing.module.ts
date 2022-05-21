import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundamentsPage } from './fundaments.page';

const routes: Routes = [
  {
    path: '',
    component: FundamentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundamentsPageRoutingModule {}
