import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-books',
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule,
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  currentPage = 1;
  pageSize = 3;
  books: Book[] = [];
  paginatedBooks: Book[] = [];
  showAddBookForm = false;
  selectedBook: Book | null = null;
  newBook: Omit<Book, 'id'> = { title: '', author: '', read: false };

  constructor(private bookService: BookService, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.updatePagination();
    });
  }

  toggleAddBookForm() {
    this.showAddBookForm = !this.showAddBookForm;
    this.newBook = { title: '', author: '', read: false };
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author) return;

    this.bookService.addBook(this.newBook).subscribe(() => {
      this.notification.success('✅ Success', '📚 Successfully added book', { nzPlacement: 'topLeft', nzDuration: 2000 });
      this.loadBooks();
      this.toggleAddBookForm();
    });
  }

  editBook(book: Book) {
    this.selectedBook = { ...book };
  }

  updateBook() {
    if (!this.selectedBook) return;

    this.bookService.updateBook(this.selectedBook).subscribe(() => {
      this.notification.success('✅ Success', '✏️ Book updated correctly', { nzPlacement: 'topLeft', nzDuration: 2000 });
      this.loadBooks();
      this.selectedBook = null;
    });
  }

  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.notification.success('✅ Success', '🗑️ Book successfully removed', { nzPlacement: 'topLeft', nzDuration: 2000 });
      this.loadBooks();
    });
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }
}
