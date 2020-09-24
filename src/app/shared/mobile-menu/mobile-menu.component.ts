import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bklr-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  @Output() menuLinkClicked = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onLinkClick(): void {
    this.menuLinkClicked.emit(true);
  }
}
