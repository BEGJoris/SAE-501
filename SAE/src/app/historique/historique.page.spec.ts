import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriePage } from './historique.page';

describe('GaleriePage', () => {
  let component: GaleriePage;
  let fixture: ComponentFixture<GaleriePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
