import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Report2Page } from './report2.page';

const routes: Routes = [
  {
    path: '',
    component: Report2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Report2PageRoutingModule {}
