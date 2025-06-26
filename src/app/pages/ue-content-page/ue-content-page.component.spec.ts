import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeContentPageComponent } from './ue-content-page.component';

describe('UeContentPageComponent', () => {
  let component: UeContentPageComponent;
  let fixture: ComponentFixture<UeContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UeContentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UeContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
