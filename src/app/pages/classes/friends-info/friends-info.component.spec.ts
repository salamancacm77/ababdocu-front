import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsInfoComponent } from './friends-info.component';

describe('FriendsInfoComponent', () => {
  let component: FriendsInfoComponent;
  let fixture: ComponentFixture<FriendsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
