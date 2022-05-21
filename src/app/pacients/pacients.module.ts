import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientsPageRoutingModule } from './pacients-routing.module';

import { PacientsPage } from './pacients.page';
import { PipesModule } from '../pipes/pipes.module';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module' ;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    PacientsPageRoutingModule
  ],
  declarations: [PacientsPage]
})
export class PacientsPageModule {}
