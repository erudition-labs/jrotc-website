import 'rxjs/add/observable/throw';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map } from 'rxjs/operators';
import { Event } from './_store/events.state.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '@core/auth/auth.service';


@Injectable()
export class EventService {
    readonly url : string = environment.API_URL + "/api/v1/events";

	constructor(private http		: HttpClient,
				private authService : AuthService) {}

    public getEvents() : Observable<Event[]> {
        return this.http.get<any>(this.url + '/')
		.pipe(retry(3), map((response) => {
			if(response.success) {
				return Object.values(response.result) as Event[];
			} else {
                Observable.throw(response.message.json());
				//this.error(response.message);
				return null;
			}
		  }),
		catchError((error: any) => Observable.throw(error.json())));	
	}

	public isOIC(event: Event, id?: string) : boolean {
		let userId = this.authService.parseToken().sub
		if(id) userId = id;
		
		if(!event.OIC) return false;

		for(let user of event.OIC) {
			if(user._id === userId) {
				return true;
			}
		}
		return false;
	}
    
}