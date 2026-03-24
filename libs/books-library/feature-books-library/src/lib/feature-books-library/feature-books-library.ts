import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-feature-books-library',
  imports: [],
  templateUrl: './feature-books-library.html',
  styleUrl: './feature-books-library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureBooksLibrary {}
