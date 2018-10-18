import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketComparisonComponent } from './market-comparison.component';

describe('MarketComparisonComponent', () => {
  let component: MarketComparisonComponent;
  let fixture: ComponentFixture<MarketComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
