import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTypeSelectorComponent } from './post-type-selector.component';

describe('PostTypeSelectorComponent', () => {
  let component: PostTypeSelectorComponent;
  let fixture: ComponentFixture<PostTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTypeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
