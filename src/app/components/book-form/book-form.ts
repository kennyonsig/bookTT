import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../interface/book';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-book-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButton
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss'
})
export class BookForm implements OnInit {
  bookForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  @Output() bookSubmitted = new EventEmitter<Book>();

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      year: [null, [Validators.required]],
      genre: ['', [Validators.required]],
      description: [''],
      isbn: ['', [Validators.minLength(10), Validators.maxLength(13), Validators.pattern(/^[\d-]+$/)]],
      pages: [null, [Validators.min(1)]],
      language: [''],
      publisher: [''],
      coverImage: [''],
      rating: [null, [Validators.min(0), Validators.max(5)]]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = {
        id: crypto.randomUUID(),
        ...this.bookForm.value
      }
      this.bookSubmitted.emit(newBook);
      this.bookForm.reset()
      return
    }

    this.bookForm.markAllAsTouched();
  }
}
