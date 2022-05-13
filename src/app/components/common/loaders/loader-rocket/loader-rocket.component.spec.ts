import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderRocketComponent } from './loader-rocket.component';

describe('LoaderRocketComponent', () => {
  let component: LoaderRocketComponent;
  let fixture: ComponentFixture<LoaderRocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderRocketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderRocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
