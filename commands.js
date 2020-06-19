//Variable para tener disponible el archivo para validar u obtener estadisticos
const options={
  file:{
    demand:true,
    alias:'f', //Es una abreviatura para file y es la ruta de archivo
  }
}

//Creando la variable argv. Yargs se importa y utiliza al mismo tiempo, ya no tengo que importarlo arriba.
const argv=require('yargs')
  .command('validate','Comando para validar los links',options)
  .command('stats','Comando para obtener estadisticos',options)
  .command('validate¬stats','Comando para validar links y obtener estadísticos',options)
  //Help es un comando de ayuda por si el usuario introduce mal alguna de las flags o si quiere saber las instrucciones de nuetra librería, aquí aparecen los comandos y la explicación de validate y stats
  .help()
  .argv


//Exportando argv para tener disponible a la variable
module.exports={
  argv
}