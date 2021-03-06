import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'bklr-search-form',
  template: `
    <div class="form-container">
      <h2>Search</h2>
      <form [formGroup]="searchForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="standard" class="form-field">
          <mat-label>Search books for: </mat-label>
          <input matInput formControlName="content" type="text" />
          <mat-icon matSuffix>search</mat-icon>
          <!-- <mat-hint>Hint</mat-hint> -->
        </mat-form-field>
        <br />
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="searchForm.invalid"
          (click)="onFormButtonClick()"
        >
          Search
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        width: 260px;
        padding: 150px 20px 0;
        margin: 0 auto;
      }
      .form-field {
        display: block;
      }
      button {
        width: 100%;
      }
    `,
  ],
})
export class SearchFormComponent implements OnInit {
  @Output() menuLinkClicked = new EventEmitter<boolean>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = fb.group({
      content: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  ngOnInit(): void {}

  onFormButtonClick(): void {
    this.menuLinkClicked.emit(true);
  }

  onSubmit(): void {
    const searchQuery = this.searchForm.get('content').value;
    this.router.navigate(['/search/results'], {
      queryParams: { query: searchQuery },
    });
  }
}
