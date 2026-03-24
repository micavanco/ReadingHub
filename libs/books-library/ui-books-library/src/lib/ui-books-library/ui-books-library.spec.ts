import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiBooksLibrary } from './ui-books-library';

describe('UiBooksLibrary', () => {
  let component: UiBooksLibrary;
  let fixture: ComponentFixture<UiBooksLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiBooksLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(UiBooksLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
