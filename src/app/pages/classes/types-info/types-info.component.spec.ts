import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesInfoComponent } from './types-info.component';

describe('TypesInfoComponent', () => {
  let component: TypesInfoComponent;
  let fixture: ComponentFixture<TypesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
