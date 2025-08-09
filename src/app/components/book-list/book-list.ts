import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Book } from '../../interface/book';
import { Router } from '@angular/router';
import { BookService } from '../../services/book-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookForm } from '../book-form/book-form';
import { Search } from '../../shared/search/search';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-book-list',
  imports: [
    MatCardModule, MatButtonModule, BookForm, Search, MatChipsModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  router = inject(Router);
  bookService = inject(BookService);
  destroyRef = inject(DestroyRef);
  snackBar = inject(MatSnackBar);
  isOpenForm = false;
  searchQuery = '';
  books: Book[] = [];

  ngOnInit() {
    this.bookService.loadBooks().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(books => {
      this.books = books;
    });
  }

  openBookForm() {
    this.isOpenForm = !this.isOpenForm
  }

  findBook(bookQuery: string) {
    this.searchQuery = bookQuery.trim().toLowerCase();
  }

  get filteredBooks(): Book[] {
    if (!this.searchQuery) return this.books;

    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery) ||
      book.author.toLowerCase().includes(this.searchQuery)
    );
  }

  handleBookSubmit(newBook: Book) {
    this.bookService.addBook(newBook);
    this.books = [...this.books, newBook];
    this.isOpenForm = false;
    this.showSnackbar(`Книга "${newBook.title}" добавлена!`);
  }

  showBookDetails(book: Book) {
    this.router.navigate(['book', book.id]);
  }

  showSnackbar(message: string){
    this.snackBar.open(message, 'Закрыть', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}
