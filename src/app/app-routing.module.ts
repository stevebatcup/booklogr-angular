import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './books/book-list/book-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
