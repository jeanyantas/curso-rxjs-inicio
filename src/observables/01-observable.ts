import { Observable, Observer } from 'rxjs';

// const observer: Observer<any> = {
//     next: valor => console.log('Valor de subs.next:', valor),
//     error: error => console.warn('Error:', error),
//     complete: () => console.info('Completado')
// }

// Opción para crear un observable que no se usa porque esta deprecated pero si funciona al 07/06/2023
// const obs$ = Observable.create(subs => {
const obs$ = new Observable<string>( subs => {

    subs.next('Hola');
    subs.next('Mundo');

    subs.next('Hola');
    subs.next('Mundo');

    // Forzar un error
    // const a = undefined;
    // a.nombre = 'Jean Pool'

    subs.complete(); // las emisiones que emita el observable se seguirán dando pero ya no se mostrarán al usuario.

    subs.next('Este mensaje no se mostrará');

});

obs$.subscribe({
    next: valor => console.log('Valor de subs.next:', valor), // Especificar que hacer con el valor emitido con el observable
    error: error => console.warn('Error:', error), // Especificar que hacer con el error emitido con el observable
    complete: () => console.info('Completado') // Especificar que hacer cuando se complete el Observable
});

// También se puede construir un observer en una variable para que reempplace lo de arriba.
// obs$.subscribe(observer);
