import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalOrdersComponent } from './internal-orders.component';

describe('InternalOrdersComponent', () => {
  let component: InternalOrdersComponent;
  let fixture: ComponentFixture<InternalOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
