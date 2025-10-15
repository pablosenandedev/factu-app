import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsView } from './terms-view';

describe('TermsView', () => {
  let component: TermsView;
  let fixture: ComponentFixture<TermsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
