import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'agora-logout-footer',
    templateUrl: 'logout-footer.component.html'
})
export class LogoutFooterComponent {

    @Output() signOut: EventEmitter<boolean>;

    constructor() {
        this.signOut = new EventEmitter<boolean>();
    }

    public emitSignOut() {
        this.signOut.emit(true);
    }
}
