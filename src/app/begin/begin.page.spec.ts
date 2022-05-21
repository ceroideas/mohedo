import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeginPage } from './begin.page';

describe('BeginPage', () => {
  let component: BeginPage;
  let fixture: ComponentFixture<BeginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
