#!/usr/bin/env node

const CFonts = require('cfonts');

let { main } = require("./src/app.js")

async function init (){
    let mdTxt =  CFonts.say('.MD LINKS!', {
        font: 'tiny',                       
        space: false,                
        maxLength: '0',             
        gradient: '#ff6f60,#ffc200,#00ffc2',            
        independentGradient: false, 
        transitionGradient: true, 
        env: 'node'                 
    });
    console.log('           by @Keupa ' + '♥'.red + ' xoxo' + '\n' )

    await main()
}

init()
