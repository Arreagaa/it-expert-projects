import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHotelesComponent } from './dashboard-hoteles.component';

describe('DashboardHotelesComponent', () => {
  let component: DashboardHotelesComponent;
  let fixture: ComponentFixture<DashboardHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHotelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
