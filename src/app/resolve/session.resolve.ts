import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SessionService } from '../service/session.service';


@Injectable()
export class SessionResolver implements Resolve<Observable<String>> {

    constructor(private oSessionService: SessionService) { }

    resolve(): Observable<String> {        
        return this.oSessionService.check();
    }
}