const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const colors = require('colors/safe')
const {readFile} = require('./index')

//import {readFile} from './index'

/* test("Primer prueba", ()=>{
    expect("2").toBe("2");
}); */


/* function sayHello(name){
    return 'Hola ' + name;
} */

test ('readFile', () => {
    //it('Should be a function', () => {
        expect(typeof readFile).toBe('function');
    })

/* test ('segunda prueba', () => {
    expect(sayHello('Jimena')).toBe('Hola Jimena')
}) */