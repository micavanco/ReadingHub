import { Component } from '@angular/core';
import { LibraryList } from '../../components/library-list/library-list';

@Component({
  selector: 'app-library-page',
  imports: [LibraryList],
  templateUrl: './library-page.html',
  styleUrl: './library-page.scss',
})
export class LibraryPage {}
