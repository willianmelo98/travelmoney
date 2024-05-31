import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViagemComponent } from './add-viagem.component';

describe('AddViagemComponent', () => {
  let component: AddViagemComponent;
  let fixture: ComponentFixture<AddViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddViagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
