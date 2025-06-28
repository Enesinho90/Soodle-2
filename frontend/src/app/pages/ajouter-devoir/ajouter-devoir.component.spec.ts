import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDevoirComponent } from './ajouter-devoir.component';

describe('AjouterDevoirComponent', () => {
  let component: AjouterDevoirComponent;
  let fixture: ComponentFixture<AjouterDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterDevoirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
