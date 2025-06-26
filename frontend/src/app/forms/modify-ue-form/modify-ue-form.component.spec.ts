import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUeFormComponent } from './modify-ue-form.component';

describe('ModifyUeFormComponent', () => {
  let component: ModifyUeFormComponent;
  let fixture: ComponentFixture<ModifyUeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyUeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyUeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
