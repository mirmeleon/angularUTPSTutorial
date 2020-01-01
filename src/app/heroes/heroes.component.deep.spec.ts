import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (deep integration tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    
    beforeEach(() => {
        mockHeroService  = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
    
        TestBed.configureTestingModule({
            declarations:
            [HeroesComponent,
             HeroComponent],
            providers:  [
                {provide: HeroService, useValue: mockHeroService}
            ],
           schemas:[NO_ERRORS_SCHEMA]
        })
    
        fixture = TestBed.createComponent(HeroesComponent);
        HEROES = [
            {id:1, name: 'SpiderMan', strength:8},
            {id:2, name: 'BathMan', strength:11},
            {id:3, name: 'WonderWoman', strength:28}
        ];
    });

    it('should render each hero as a HeroComponent', () => {
        //we need and.returnValue... becouse the method getHeroes returns observable and we have to say it what value we want to return
        //in our case is the mock obj HEROES
        mockHeroService.getHeroes.and.returnValue(of(HEROES)); 
         //triggers angular to fire angular funcs as ngOnInit etc
        fixture.detectChanges();

        //find child elements under a directive
        //in angular directive is the parnt class for both attribute directives and components (pr heroComponent <app-hero>)
        //By.directive(HeroComponent) this will give a list of all <app-hero> components (a, button etc)
       const heroComponentsDE = fixture.debugElement.queryAll(By.directive(HeroComponent)); 
       expect(heroComponentsDE.length).toEqual(3); //becouse we have 3 li elements of heroComp
       //we take the instance of heroComponent
       for(let i =0; i<heroComponentsDE.length;i++){
        expect(heroComponentsDE[i].componentInstance.hero).toEqual(HEROES[i]);
       }
    })
})