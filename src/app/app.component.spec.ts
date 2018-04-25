import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from './app-routing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should redirect to '/help' for invalid routes (fakeAsync)`, fakeAsync(() => {
    router.navigate(['foo']);
    tick();
    expect(location.path()).toEqual('/help');
  }));

  it(`should redirect to '/help' for invalid routes (async/await)`, async () => {
    await router.navigate(['foo']);
    expect(location.path()).toEqual('/help');
  });
});
