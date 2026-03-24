import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-ui-books-library',
  imports: [],
  templateUrl: './ui-books-library.html',
  styleUrl: './ui-books-library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBooksLibrary {}
