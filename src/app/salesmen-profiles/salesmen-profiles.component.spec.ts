import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmenProfilesComponent } from './salesmen-profiles.component';

describe('SalesmenProfilesComponent', () => {
  let component: SalesmenProfilesComponent;
  let fixture: ComponentFixture<SalesmenProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmenProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmenProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
