import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bklr-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  showDesktopOnlyElements$: Observable<boolean>;

  constructor(private mediaObserver: MediaObserver) {
    this.showDesktopOnlyElements$ = this.mediaObserver.media$.pipe(
      map((mediaChange) => {
        return ['sm', 'md', 'lg', 'xl'].includes(mediaChange.mqAlias);
      })
    );
  }

  ngOnInit(): void {}
}
