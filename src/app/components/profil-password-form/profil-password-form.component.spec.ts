import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPasswordFormComponent } from './profil-password-form.component';

describe('ProfilPasswordFormComponent', () => {
  let component: ProfilPasswordFormComponent;
  let fixture: ComponentFixture<ProfilPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPasswordFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
