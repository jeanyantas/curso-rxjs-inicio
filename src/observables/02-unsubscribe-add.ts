import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: valor => console.log('next:', valor),
    error: error => console.warn('error:', error),
    complete: () => console.info('completado')
};

const intervalo$ = new Observable<number>( subscribe => {
    // Crear un contador 1,2,3,4,5,....
    let count = 0;
    
    const interval =  setInterval( () => { // setInterval emite cada 1 segundo
        // cada segundo
        count++;
        subscribe.next(count);
        console.log(count);
        
    }, 1000);

    setTimeout(() => {
        subscribe.complete();
    }, 2500);

    // el retorno del Observable será una función que pare la emisión cuando subs1, subs2 y subs3 llamen a unsubscribe desde afuera.
    return () => {
        clearInterval(interval);
        console.log('Intervalo destruido');
    }
});

const subs1 = intervalo$.subscribe( observer );
const subs2 = intervalo$.subscribe( observer );
const subs3 = intervalo$.subscribe( observer );


setTimeout(() => { // setTimeout emite solo una vez a los 3 segundos
    const subscriptions = [subs1, subs2, subs3];
    for (const subscription of subscriptions) {
        subscription.unsubscribe();
    }

    // Desuscribirse uno por uno
    // subs1.unsubscribe();
    // subs2.unsubscribe();
    // subs3.unsubscribe();

    // aquí se ejecuta el clearInterval(interval);

    console.log('Completado timeout');
}, 6000);

/**
 * NOTA: Aunque cambiáramos el setInterval por un setTimeout, sería buena práctica hacer el .unsubscribe igualmente
 * para evitar fugas de memoria, aunque en ese caso no se seguirían emitiendo valores.
 */