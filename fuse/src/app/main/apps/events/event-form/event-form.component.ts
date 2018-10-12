import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
//import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';

import { CalendarEvent, Event } from 'app/main/apps/events/_store/events.state.model';

@Component({
    selector     : 'calendar-event-form-dialog',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent
{
    action: string;
    event: Event;
    eventForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        this.event = _data.event;
        this.action = _data.action;

        if(this.action === 'edit') {
            this.dialogTitle = this.event.name;
        } else {
            this.dialogTitle = 'New Event';
            this.event = {} as Event;
        }

        this.eventForm = this.createEventForm();
    }


    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup {

       let form = this._formBuilder.group({
			name					: new FormControl(this.event.name                   || '', 		{ validators: [Validators.required] }),
			isVerificationRequired 	: new FormControl(this.event.isVerificationRequired || 'true', 	{ validators: [Validators.required] }),
			isVerified				: new FormControl(this.event.isVerified             || 'false', { validators: [Validators.required] }),
			isClosed				: new FormControl(this.event.isClosed               || 'false', { validators: [Validators.required] }),
			date					: new FormControl(this.event.date                   || [], 		{ validators: [Validators.required] }),
			summary					: new FormControl(this.event.summary                || '',      { }),
			OIC						: new FormControl(this.event.OIC                    || [],      { }),
			signedUp				: new FormControl(this.event.signedUp               || [],      { }),
			pending					: new FormControl(this.event.pending                || [],      { }),
			author					: new FormControl(this.event.author                 || '',      { }),
			spots					: new FormControl(this.event.spots                  || '',      { validators: [this.validateNumber.bind(this), Validators.required] }),
			additionalDetails		: this._formBuilder.array([ this.initDetailField() ])
        });

        
        if(this._data.event && this._data.event.additionalDetails) {
            let details = JSON.parse(this._data.event.additionalDetails);
            details.forEach(function(obj) {  //populate formArray
                const control = <FormArray> form.controls['additionalDetails'];
                control.push(this.initDetailFieldWithData(obj.title, obj.details));
            }.bind(this));
        }

        return form;
        
    }
    validateNumber(control: FormControl): { [s: string]: boolean } {
		//if (control.value === null) return null;
  		if (isNaN(control.value)) return { 'NaN': true };
		return null; 
    }
    
    initDetailField() : FormGroup {
		return this._formBuilder.group({
			title	: [''],
			details	: ['']
		});
    }
    
    addDetailField() : void {
		const control = <FormArray>this.eventForm.controls['additionalDetails'];
		control.push(this.initDetailField());
    }
    
    removeDetailField(i: number) : void {
		const control = <FormArray>this.eventForm.controls['additionalDetails'];
		control.removeAt(i);
    }

    private initDetailFieldWithData(_title: string, _details: string) : FormGroup {
		return this._formBuilder.group({
			title	: [_title],
			details	: [_details]
		});
	}
}
