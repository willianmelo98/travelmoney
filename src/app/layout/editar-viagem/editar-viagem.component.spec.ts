import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarViagemComponent } from './editar-viagem.component';

describe('EditarViagemComponent', () => {
  let component: EditarViagemComponent;
  let fixture: ComponentFixture<EditarViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarViagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
