import { EventResolver } from './events/event-resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { VoterService } from './events/event-details/voter.service';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { SimpleModalComponent } from './common/simple-modal.component';
import { SessionLinstComponent } from './events/event-details/session-list.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { AuthService } from './user/auth.service';

import {
  TOASTR_TOKEN,
  Toastr,
  JQ_TOKEN,
  CollapsibleWellComponent,
} from './common/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';

import {
  EventListResolver,
  CreateEventComponent,
  eventDetailsComponent,
  EventThumbnailComponent,
  EventListComponent,
  eventService,
  UpvoteComponent,
  DurationPipe,
  LocationValidator,
} from './events/index';

// let toastr: Toastr = window['toastr'];
declare let toastr: Toastr;
declare let jQuery: any;

@NgModule({
  declarations: [
    AppComponent,
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    eventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionLinstComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    eventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    { provide: EventResolver, useClass: EventResolver }, // shorter version is "EventResolver"
    EventListResolver,
    AuthService,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    VoterService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm(
      'You have not saved this event, do you really want to cancel?'
    );
  return true;
}
