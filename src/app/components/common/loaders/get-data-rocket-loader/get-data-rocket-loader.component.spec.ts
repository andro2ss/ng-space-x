import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDataRocketLoaderComponent } from './get-data-rocket-loader.component';

describe('GetDataRocketLoaderComponent', () => {
  let component: GetDataRocketLoaderComponent;
  let fixture: ComponentFixture<GetDataRocketLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDataRocketLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetDataRocketLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
