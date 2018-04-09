import { NgModule } from '@angular/core';
import { SortByPipe } from './sort-by/sort-by';
import { ObjtoArrayPipe } from './objto-array/objto-array';
@NgModule({
	declarations: [SortByPipe,
    ObjtoArrayPipe],
	imports: [],
	exports: [SortByPipe,
    ObjtoArrayPipe]
})
export class PipesModule {}
