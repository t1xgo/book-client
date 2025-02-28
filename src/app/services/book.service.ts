import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    { id: uuidv4(), title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", read: false },
    { id: uuidv4(), title: "Green Eggs and Ham", author: "Dr. Seuss", read: true }
  ];

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book) {
    this.books.push({ ...book, id: uuidv4() });
  }

  updateBook(updatedBook: Book) {
    const index = this.books.findIndex(b => b.id === updatedBook.id);
    if (index !== -1) this.books[index] = updatedBook;
  }

  deleteBook(id: string) {
    this.books = this.books.filter(book => book.id !== id);
  }
}
