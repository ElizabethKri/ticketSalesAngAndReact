import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourLoaderComponent } from './tour-loader.component';

describe('TourLoaderComponent', () => {
  let component: TourLoaderComponent;
  let fixture: ComponentFixture<TourLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
