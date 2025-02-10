import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoImovelComponent } from './info-imovel.component';

describe('InfoImovelComponent', () => {
  let component: InfoImovelComponent;
  let fixture: ComponentFixture<InfoImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoImovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
