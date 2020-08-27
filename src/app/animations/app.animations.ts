import {trigger, state, style, animate, transition } from '@angular/animations';//

export function visibility() {
    return trigger('visibility', [
        state('shown', style({ 
          opacity: 1
        })),
        state('hidden', style({
          opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
      ]);
}

export function flyInOut() {
    return trigger('flyInOut', [
        state('*', style({ opacity: 1 })),
        transition(':enter', [
            style({ opacity: 0 }),
            animate('600ms ease-in')
        ]),
        transition(':leave', [
            animate('600ms ease-out', 
                style({ opacity: 0 }))
        ])
    ]);
}

export function expand() {
    return trigger('expand', [
        state('*', style({ opacity: 1 })),
        transition(':enter', [
            style({ opacity:0 }),
            animate('600ms ease-in', 
            style({ opacity: 1 }))
        ])
    ]);
}