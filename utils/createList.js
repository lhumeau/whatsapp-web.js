const { List } = require('../index');


function ListFactory(options) {
    const { title, rows, description, footerText } = options;
    return new List(title, description, rows, footerText);
}


var VehicleListType = new List(
    'Lista de vehiculos livianos',
    'Ver todas las fichas',
    vehicleListJson,
    'Por favor seleccione una ficha'
);


module.exports = {
    ListFactory,
};
