import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryWidgetComponent } from './history-widget.component';

describe('HistoryWidgetComponent', () => {
  let component: HistoryWidgetComponent;
  let fixture: ComponentFixture<HistoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
