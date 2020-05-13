function prueba(nombre){
	return `Hola ${nombre}`
}

test('Deberia regresar Hola y un nombre',()=>{
expect(prueba("Shari")).toBe('Hola Shari')
})

