import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionesHotelComponent } from './reservaciones-hotel.component';

describe('ReservacionesHotelComponent', () => {
  let component: ReservacionesHotelComponent;
  let fixture: ComponentFixture<ReservacionesHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservacionesHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionesHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
