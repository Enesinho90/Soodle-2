import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDevoirsComponent } from './mes-devoirs.component';

describe('MesDevoirsComponent', () => {
  let component: MesDevoirsComponent;
  let fixture: ComponentFixture<MesDevoirsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesDevoirsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
