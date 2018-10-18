import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOnMarketComponent } from './time-on-market.component';

describe('TimeOnMarketComponent', () => {
  let component: TimeOnMarketComponent;
  let fixture: ComponentFixture<TimeOnMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOnMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOnMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
