import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDDICComponent } from './test-ddic.component';

describe('TestDDICComponent', () => {
  let component: TestDDICComponent;
  let fixture: ComponentFixture<TestDDICComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDDICComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDDICComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
