import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefeatComponent } from './defeat.component';

describe('DefeatComponent', () => {
  let component: DefeatComponent;
  let fixture: ComponentFixture<DefeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefeatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
