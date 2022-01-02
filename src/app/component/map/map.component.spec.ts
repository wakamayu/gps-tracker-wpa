import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesMapComponent } from './map.component';

describe('MapComponent', () => {
  let component: RoutesMapComponent;
  let fixture: ComponentFixture<RoutesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
