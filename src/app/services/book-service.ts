import { inject, Injectable } from '@angular/core';
import { Book } from '../interface/book';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  booksUrl  = 'assets/mockBookData.json';
  http = inject(HttpClient);
  booksKey = 'books_data'

  loadBooks(): Observable<Book[]> {
    const localBooks = this.getLocalBooks();
    if (localBooks.length > 0) return of(localBooks);

    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap(books => this.saveLocalBooks(books))
    );
  }

  getLocalBooks(): Book[] {
    const data = localStorage.getItem(this.booksKey);
    return data ? JSON.parse(data) : [];
  }

  saveLocalBooks(books: Book[]) {
    localStorage.setItem(this.booksKey, JSON.stringify(books));
  }

  addBook(book: Book) {
    const books = this.getLocalBooks();
    books.push(book);
    this.saveLocalBooks(books);
  }

  getBookById(id: string): Observable<Book | undefined> {
    const books = this.getLocalBooks();
    const book = books.find(book => book.id === id);
    return of(book);
  }
}
