import { Component, inject, OnInit, Signal } from '@angular/core';
import { LibraryStore } from '../../../../core/stores/library.store';
import { Book } from '../../../../core/interfaces/book.interface';

@Component({
  selector: 'app-library-list',
  imports: [],
  templateUrl: './library-list.html',
  styleUrl: './library-list.scss',
})
export class LibraryList implements OnInit {
  #apiStore = inject(LibraryStore);
  protected books: Signal<Book[]> = this.#apiStore.books;

  ngOnInit() {
    this.#apiStore.loadBooks();
  }
}
