import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Report2Page } from './report2.page';

describe('Report2Page', () => {
  let component: Report2Page;
  let fixture: ComponentFixture<Report2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Report2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
