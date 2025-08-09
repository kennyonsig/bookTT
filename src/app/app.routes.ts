import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookDetail } from './components/book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'book/:id', component: BookDetail },
  { path: '**', redirectTo: '' }
];
