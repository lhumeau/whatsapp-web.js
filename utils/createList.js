const { List } = require('../index');


function ListFactory(options) {
    const { title, description,rows, footerText } = options;
    return new List(title, description, rows, footerText);
}




module.exports = {
    ListFactory,
};
