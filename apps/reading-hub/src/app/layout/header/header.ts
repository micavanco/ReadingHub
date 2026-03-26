import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme } from '../../core/types/theme.type';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public theme: InputSignal<Theme> = input('dark' as Theme);
  public themeChanged: OutputEmitterRef<Theme> = output();

  protected onThemeChanged() {
    this.themeChanged.emit(this.theme() === 'light' ? 'dark' : 'light');
  }
}
