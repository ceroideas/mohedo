import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacientsPage } from './pacients.page';

describe('PacientsPage', () => {
  let component: PacientsPage;
  let fixture: ComponentFixture<PacientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
