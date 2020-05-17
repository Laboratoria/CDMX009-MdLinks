function mytest(nombre) {
    return `Hola ${nombre}`
}

test('Saludo', () => {
    expect(mytest('Karina')).toBe('Hola Karina')
})