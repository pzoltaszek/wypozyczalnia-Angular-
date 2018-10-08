import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from './carousel.component';
import {RouterTestingModule} from '@angular/router/testing';
describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselComponent ],
      imports: [RouterTestingModule],
      providers: [RouterOutlet]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('#basic test', () => {
    it('should create', () => {
    expect(component).toBeDefined();
    });
    it(`should have slides array with length 4`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.slides.length).toEqual(4);
  }));
    it(`should get first slide at the load (i = 1)`, async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app.getSlide()).toEqual('assets/Ferrari.jpg');
      expect(app.getSlide()).toEqual(app.slides[1]);
    }));
    it(`should test getNext() method (i = 2)`, async(() => {
      const app = fixture.debugElement.componentInstance;
      app.getNext();
      expect(app.getSlide()).toEqual('assets/Hundai.jpg');
      expect(app.getSlide()).toEqual(app.slides[2]);
    }));
    it(`should test getPrev() method (i = 0)`, async(() => {
      const app = fixture.debugElement.componentInstance;
      app.getPrev();
      expect(app.getSlide()).toEqual('assets/Toyota.jpg');
      expect(app.getSlide()).toEqual(app.slides[0]);
    }));
  it('should render string in a h3 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Our Top Cars');
  }));
  });
});
