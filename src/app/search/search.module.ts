import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { RouterModule } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [SearchFormComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: SearchFormComponent },
      { path: 'results', component: SearchResultsComponent },
    ]),
  ],
})
export class SearchModule {}
