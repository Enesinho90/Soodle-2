import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserFormComponent } from './modify-user-form.component';

describe('ModifyUserFormComponent', () => {
  let component: ModifyUserFormComponent;
  let fixture: ComponentFixture<ModifyUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyUserFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
