// https://stackoverflow.com/questions/35274028/stop-mouse-event-propagation
import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[click-stop-propagation]'
})
export class ClickStopPropagationDirective {
    @HostListener("click", ["$event"])
    public onClick(event: any): void {
        event.stopPropagation();
    }
}
