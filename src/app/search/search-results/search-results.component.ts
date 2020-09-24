import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { SearchService, SearchResult } from '../../services/search.service';
import { switchMap, map, tap, first, finalize } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'bklr-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  searchResults$: Observable<SearchResult[]>;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private fireFunctions: AngularFireFunctions,
    private cdr: ChangeDetectorRef
  ) {
    this.searchResults$ = this.route.queryParams.pipe(
      switchMap(({ query }) =>
        this.searchService
          .runSearch(query)
          .pipe(finalize(() => this.cdr.detectChanges()))
      )
    );
  }
}
