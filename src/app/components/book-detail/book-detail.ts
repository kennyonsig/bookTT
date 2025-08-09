import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../interface/book';
import { BookService } from '../../services/book-service';
import { filter, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-detail',
  imports: [
    RouterLink,
    DecimalPipe,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetail implements OnInit {
  route = inject(ActivatedRoute);
  bookService = inject(BookService);
  destroyRef = inject(DestroyRef);
  book: Book | null = null;

  ngOnInit() {
    this.route.paramMap.pipe(
      filter(params => params.has('id')),
      switchMap(params => this.bookService.getBookById(params.get('id')!)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(book => {
      this.book = book || null;
    });
  }

  getStars(rating: number) {
    const fullStars = Math.floor(rating);
    const stars: string[] = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(i <= fullStars ? '★' : '☆');
    }
    return stars;
  }
}

