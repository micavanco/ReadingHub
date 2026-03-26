import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Book } from '../interfaces/book.interface';
import { ApiService } from '../services/api.service';

type LibraryState = {
  books: Book[];
  isLoading: boolean;
};

const initialState: LibraryState = {
  books: [],
  isLoading: false,
};

export const LibraryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    apiService = inject(ApiService)
  ) => ({
    loadBooks: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return apiService.loadBooks().pipe(
            tapResponse({
              next: (data) => {
                patchState(store, {
                  books: data.books,
                  isLoading: false,
                });
              },
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
