import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientsPage } from './pacients.page';

const routes: Routes = [
  {
    path: '',
    component: PacientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientsPageRoutingModule {}
