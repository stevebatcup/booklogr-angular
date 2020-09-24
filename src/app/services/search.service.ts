import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { tap, map, finalize } from 'rxjs/operators';

export interface SearchResult {
  title: string;
  author: string;
  description: string;
  imageSrc: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private fireFunctions: AngularFireFunctions) {}

  runSearch(query: string): Observable<SearchResult[]> {
    const callable$ = this.fireFunctions.httpsCallable<any>('runSearch');
    return callable$({
      query: query,
      maxResults: 24,
      startIndex: 1,
    }).pipe(map((results) => this.itemsToSearchResults(results)));
  }

  itemsToSearchResults({ items }: any): SearchResult[] {
    return items.map((item) => {
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '',
        description: item.volumeInfo.description
          ? item.volumeInfo.description
          : '',
        imageSrc: item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.thumbnail
          : '',
      };
    });
  }
}
