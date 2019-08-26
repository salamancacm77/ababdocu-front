import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsInfoComponent } from './methods-info.component';

describe('MethodsInfoComponent', () => {
  let component: MethodsInfoComponent;
  let fixture: ComponentFixture<MethodsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
