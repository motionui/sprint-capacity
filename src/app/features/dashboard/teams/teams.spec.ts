import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teams } from './teams';

describe('Team', () => {
  let component: Teams;
  let fixture: ComponentFixture<Teams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Teams],
    }).compileComponents();

    fixture = TestBed.createComponent(Teams);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
