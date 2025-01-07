import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokoBoardComponent } from './sudoko-board.component';

describe('SudokoBoardComponent', () => {
  let component: SudokoBoardComponent;
  let fixture: ComponentFixture<SudokoBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokoBoardComponent]
    });
    fixture = TestBed.createComponent(SudokoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
