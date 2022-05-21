import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundamentsPage } from './fundaments.page';

describe('FundamentsPage', () => {
  let component: FundamentsPage;
  let fixture: ComponentFixture<FundamentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundamentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundamentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
