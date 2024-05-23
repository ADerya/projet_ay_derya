import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitPanierComponent } from './produit-panier.component';

describe('ProduitPanierComponent', () => {
  let component: ProduitPanierComponent;
  let fixture: ComponentFixture<ProduitPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitPanierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
