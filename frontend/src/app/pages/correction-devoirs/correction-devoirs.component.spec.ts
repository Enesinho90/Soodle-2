import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionDevoirsComponent } from './correction-devoirs.component';

describe('CorrectionDevoirsComponent', () => {
  let component: CorrectionDevoirsComponent;
  let fixture: ComponentFixture<CorrectionDevoirsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectionDevoirsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectionDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
