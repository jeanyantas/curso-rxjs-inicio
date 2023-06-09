import { Observable, Observer, Subject } from 'rxjs';

// Propiedades de un objeto Observable
const observer: Observer<any> = {
    next: valor => console.log('next:', valor),
    error: error => console.warn('error:', error),
    complete: () => console.info('completado')
};

// Creamos un observable que emite un contador cada segundo
const intervalo$ = new Observable<number>( subs => {
    
    const intervalId = setInterval(
        () => subs.next( Math.round(Math.random() * 10) ), 1000
    );

    // Si se hace la unsubscribe(); del observable después de hacer un subscribe(); se destruirá las emisiones del observable
    // Recordar que cuando se hace un complete(); solo se deja de mostrar las emisiones pero se siguen emitiendo.
    return () => {
        clearInterval( intervalId );
        console.log('Intervalo destruido');
    }
});

/**
 * El Subject(); hace que se emitan los mismos valores en cada subscripción.
 * 1- Casteo múltiple
 * 2- También es un observer
 * 3- Next, error y complete
 */
const subjects$ = new Subject();
const subscripcion = intervalo$.subscribe( subjects$ );

// const subs1 = intervalo$.subscribe( resp => console.log('subs1:', resp) );
// const subs2 = intervalo$.subscribe( resp => console.log('subs2:', resp) );

const subs1 = subjects$.subscribe( observer );
const subs2 = subjects$.subscribe( observer );

setTimeout( () => {
    subjects$.next(10);
    subjects$.complete(); // Hasta aquí paramos mostrar las emisiones del observable
    subscripcion.unsubscribe(); // Aquí paramos realmente las emisiones que no vemos y ocupan memoria, con esto se ejecutará el clearInterval( intervalId );
    console.log('Completado timeout');
}, 3500); // Todo esto se ejecutará a los 3.5 segundos