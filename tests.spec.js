import {sayHello} from './index'


/* test("Primer prueba", ()=>{
    expect("2").toBe("2");
}); */


/* function sayHello(name){
    return 'Hola ' + name;
} */

test ('segunda prueba', () => {
    expect(sayHello('Jimena')).toBe('Hola Jimena')
})