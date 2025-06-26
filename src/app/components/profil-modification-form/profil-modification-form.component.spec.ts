import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilModificationFormComponent } from './profil-modification-form.component';

describe('ProfilModificationFormComponent', () => {
  let component: ProfilModificationFormComponent;
  let fixture: ComponentFixture<ProfilModificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilModificationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilModificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
