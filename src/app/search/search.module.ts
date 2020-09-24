import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MobileFormComponent } from './mobile-form/mobile-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MobileFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MobileFormComponent },
      // { path: '/results', component: SearchResultsComponent },
    ]),
  ],
})
export class SearchModule {}
