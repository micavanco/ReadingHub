import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureBooksLibrary } from './feature-books-library';

describe('FeatureBooksLibrary', () => {
  let component: FeatureBooksLibrary;
  let fixture: ComponentFixture<FeatureBooksLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureBooksLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureBooksLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
