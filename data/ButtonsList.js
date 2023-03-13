const {Buttons} = require('../index');

const englineOilLevel = new Buttons(
    'Engine Oil Level',
    [{ body: 'Alto', id: '0' },
        { body: 'Bien', id: '1' },
        { body: 'Medio', id: '2' },
        { body: 'Bajo', id: '3' },],
    'Nivel de aceite de motor',
    'Seleccione una opción',
);



module.exports = {
    englineOilLevel
};
