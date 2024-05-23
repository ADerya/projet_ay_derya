import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePanierComponent } from './resume-panier.component';

describe('ResumePanierComponent', () => {
  let component: ResumePanierComponent;
  let fixture: ComponentFixture<ResumePanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumePanierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumePanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
