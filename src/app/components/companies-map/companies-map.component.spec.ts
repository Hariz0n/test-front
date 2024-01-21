import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesMapComponent } from './companies-map.component';

describe('CompaniesMapComponent', () => {
  let component: CompaniesMapComponent;
  let fixture: ComponentFixture<CompaniesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompaniesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
