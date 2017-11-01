import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'agora-welcome-footer',
    templateUrl: 'welcome-footer.component.html'
})
export class WelcomeFooterComponent {

    @Output() skipLoginEvent : EventEmitter<boolean>;

    constructor() {
        this.skipLoginEvent = new EventEmitter<boolean>();
    }

    skipLogin() {
        this.skipLoginEvent.emit(true);
    }

}