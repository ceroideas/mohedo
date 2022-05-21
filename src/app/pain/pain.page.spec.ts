import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PainPage } from './pain.page';

describe('PainPage', () => {
  let component: PainPage;
  let fixture: ComponentFixture<PainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
