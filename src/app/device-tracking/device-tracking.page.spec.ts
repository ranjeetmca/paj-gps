import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceTrackingPage } from './device-tracking.page';

describe('DeviceTrackingPage', () => {
  let component: DeviceTrackingPage;
  let fixture: ComponentFixture<DeviceTrackingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
