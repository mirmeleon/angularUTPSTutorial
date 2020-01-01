import { TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService integration test', () => {
    let mockMessageService: MessageService; //in HeroService we inject messageService that's why we need it
    let httpTestingController:HttpTestingController;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add', 'clear']);
       
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[
                HeroService,
               {provide: MessageService, useValue: mockMessageService} 
            ]
        })
        //get -> access the dependency injection registry and finds the service that corresponds to that
        httpTestingController = TestBed.get(HttpTestingController);
        //if we need access to message service or heroservice we can take them the same way
        //let heroService =  TestBed.get(HeroService);
        //let msgService =  TestBed.get(MessageService);
        
    })
});