import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeLegsComponent } from './trade-legs.component';

describe('TradeLegsComponent', () => {
  let component: TradeLegsComponent;
  let fixture: ComponentFixture<TradeLegsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeLegsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeLegsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
