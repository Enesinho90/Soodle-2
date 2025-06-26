import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationModificationComponent } from './page-creation-modification.component';

describe('PageCreationModificationComponent', () => {
  let component: PageCreationModificationComponent;
  let fixture: ComponentFixture<PageCreationModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreationModificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCreationModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
