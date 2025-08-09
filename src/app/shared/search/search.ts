import { Component, EventEmitter, inject, OnInit, Output, DestroyRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search implements OnInit {
  @Output() searchBook = new EventEmitter<string>();
  searchValue = ''

  destroyRef = inject(DestroyRef);
  searchSubject = new Subject<string>();

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
      ).subscribe(value => this.searchBook.emit(value));
  }
}
