import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';

interface Book {
  id: string;
  title: string;
  author: string;
  read: boolean;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  books: Book[] = [
    { id: '1', title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', read: false },
    { id: '2', title: 'Green Eggs and Ham', author: 'Dr. Seuss', read: true }
  ];

  newBook: Book = { id: '', title: '', author: '', read: false };
  selectedBook: Book | null = null;
  showAddBookForm = false;

  toggleAddBookForm() {
    this.showAddBookForm = !this.showAddBookForm;
  }

  addBook() {
    if (this.newBook.title && this.newBook.author) {
      this.books.push({ ...this.newBook, id: Math.random().toString(36).substr(2, 9) });
      this.newBook = { id: '', title: '', author: '', read: false };
      this.showAddBookForm = false;
    }
  }

  editBook(book: Book) {
    this.selectedBook = { ...book };
  }

  updateBook() {
    if (this.selectedBook) {
      const index = this.books.findIndex(b => b.id === this.selectedBook!.id);
      if (index !== -1) {
        this.books[index] = this.selectedBook;
      }
      this.selectedBook = null;
    }
  }

  deleteBook(id: string) {
    this.books = this.books.filter(book => book.id !== id);
  }
}
