import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepictureComponent } from './changepicture.component';

describe('ChangepictureComponent', () => {
  let component: ChangepictureComponent;
  let fixture: ComponentFixture<ChangepictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
