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
  totalItems: number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private fireFunctions: AngularFireFunctions) {}

  runSearch(query: string, pageNumber: number=1, perPage: number=24): Observable<SearchResult[]> {
    const callable$ = this.fireFunctions.httpsCallable<any>('runSearch');
    return callable$({
      query: query,
      maxResults: perPage,
      startIndex: (pageNumber) * perPage,
    }).pipe(map((results) => this.itemsToSearchResults(results)));
  }

  itemsToSearchResults(results: any): SearchResult[] {
    return results.items.map((item) => {
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'unknown',
        description: item.volumeInfo.description
          ? item.volumeInfo.description
          : '',
        imageSrc: item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.thumbnail
          : 'https://image.freepik.com/free-vector/stack-books-pile-books-vector-illustration-icon-stack-books-flat-style_87946-647.jpg',
        totalItems: results.totalItems,
      };
    });
  }
}
