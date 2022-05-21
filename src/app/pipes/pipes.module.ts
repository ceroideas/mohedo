import { NgModule } from '@angular/core';
import { RangePipe } from './range/range.pipe';
import { FiltersPipe } from './filters.pipe';
import { ExtradatePipe } from './extradate.pipe';
@NgModule({
	declarations: [RangePipe, FiltersPipe, ExtradatePipe],
	imports: [],
	exports: [RangePipe, FiltersPipe, ExtradatePipe]
})
export class PipesModule {}
