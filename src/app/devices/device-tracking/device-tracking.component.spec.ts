import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceTrackingComponent } from './device-tracking.component';

describe('DeviceTrackingPage', () => {
  let component: DeviceTrackingComponent;
  let fixture: ComponentFixture<DeviceTrackingComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
