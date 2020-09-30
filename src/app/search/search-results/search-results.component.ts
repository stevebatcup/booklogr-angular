import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SearchService, SearchResult } from '../../services/search.service';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'bklr-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements AfterViewInit, OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public loading$ = this.loadingSubject.asObservable();
  private pageNumberSubject = new BehaviorSubject<number>(0);
  public pageNumber$ = this.pageNumberSubject.asObservable();
  public results: SearchResult[] = [];
  public query: string;
  public totalItems = 200;
  public perPage = 24;

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  @ViewChild('resultsBox')
  resultsBox: ElementRef;
  
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.queryParams.pipe(
      tap(({ query }) => this.initDataForSearch(query)),
      switchMap(() => this.pageNumber$.pipe(
        tap((page) => console.log(`page number: ${page}`)),
        switchMap((page) => this.searchService.runSearch(this.query, page, this.perPage).pipe(
          finalize(() => {
            this.cdr.detectChanges();
          }), 
          tap(() => this.loadingSubject.next(false)),
        ))
      ))
    ).subscribe((results) => {
      this.results = results;
      this.totalItems = results[0].totalItems;
    });
  }
  
  initDataForSearch(query: string) : void {
    this.query = query;
    this.results = [];
    this.loadingSubject.next(true);
    this.pageNumberSubject.next(0);
  }
  
  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(({pageIndex}) => console.log(pageIndex)),
      ).subscribe(({pageIndex, pageSize}) => {
        this.perPage = pageSize;
        this.pageNumberSubject.next(pageIndex);
        this.resultsBox.nativeElement.scrollTo(0, 0);
    })
  }
}
