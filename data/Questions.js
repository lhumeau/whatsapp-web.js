const client = require('../utils/auth');
const posdata = require('../utils/postData'); // importamos la libreria // \r\n

var regFicha;
var {
    askfichaMessage,
    askCounterOdometer,
    regficha,
    regOdometro,
    messageRegDataConfirm,
    fixValidatorFicha,
    fixValidatorOdometer,
    urlPowerautomate,
    menuOptions,
    VehicleListType,
    menuFormsOptions,
 
  
} = require('../data/allVariablesFile');

const { getNameFromMessage } = require('../data/allVariablesFile');

const { englineOilLevel } = require('./ButtonsList');

const question = async function (
    messageIncoming,
    lastAnswerBot,
    lastAnswerUser,
    hasMatchgreetings,
    chatIdInfo,
    
  
    
) {
    getNameFromMessage.notifyName = messageIncoming._data.notifyName;
    
    if (messageIncoming.fromMe) {
    // Determinar de remitente de mensaje del usuario
        if (lastAnswerBot.length === 0) {
            return client.sendMessage(messageIncoming.from, menuOptions);
        }
    } else {
        if (lastAnswerBot.length === 0) {
            return client.sendMessage(messageIncoming.from, menuOptions);
        }
        if (hasMatchgreetings) {
            return client.sendMessage(messageIncoming.from, menuOptions);
        }

        if (messageIncoming.body == '1' && lastAnswerBot[0].body == menuOptions) {
            // Selección en el menu
            return client.sendMessage(messageIncoming.from, askfichaMessage);
        }
        if (messageIncoming.body == '2' && lastAnswerBot[0].body == menuOptions) {
            // Selección en el menu

            return client.sendMessage(messageIncoming.from, menuFormsOptions);
        }
        // eslint-disable-next-line no-undef
        if (messageIncoming.body == '2' && lastAnswerBot[0].body == menuOptions) {
            // Selección en el menu

            return client.sendMessage(messageIncoming.from, menuFormsOptions);
        }
        if (
            messageIncoming.body == '1' &&
      lastAnswerBot[0].body == menuFormsOptions
        ) {
            return client.sendMessage(messageIncoming.from, VehicleListType);

            // Ask for questionary answer
        }
        if (
            lastAnswerBot.length != 0 &&
      messageIncoming.type == 'list_response' &&
      lastAnswerBot[0].type == 'list' &&
      lastAnswerBot[0].body == 'Lista de vehiculos livianos'
        ) {
            regFicha = messageIncoming.body;
            // Selección en el menu
            console.log(regFicha, 'Valor de ficha');
            return client.sendMessage(messageIncoming.from, englineOilLevel);
            // return client.sendMessage(`You've selected ${regFicha}`);
        }

        if (
            lastAnswerBot[0].body == askfichaMessage ||
      lastAnswerBot[0].body == fixValidatorFicha
        ) {
            // Captura respuesta de la  ficha  usuario
            regficha = messageIncoming.body;

            if (
                /[a-zA-Z]/.test(regficha) == true &&
        /[0-9]/.test(regficha) == true &&
        regficha.length == 6 &&
        /[-]/.test(regficha) == true
            ) {
                // validar condición de ficha 2
                regficha.toUpperCase();
                regficha.trim();
            } else {
                console.log(messageIncoming.body, 'Valor de body en 0 ');
                return client.sendMessage(messageIncoming.from, fixValidatorFicha);
            }

            return client.sendMessage(messageIncoming.from, askCounterOdometer);
        }

        if (
            lastAnswerBot[0].body == askCounterOdometer ||
      lastAnswerBot[0].body == fixValidatorOdometer
        ) {
            /// Captura de respuesta de Odometro/Horometro de usuario.
            regOdometro = messageIncoming.body;
            if (/[a-zA-Z]/.test(regOdometro)) {
                return client.sendMessage(messageIncoming.from, fixValidatorOdometer);
            }
            regOdometro = regOdometro.replace(/[^0-9.]+/g, ''); //Allow number incluid floating number
            client.sendMessage(messageIncoming.from, messageRegDataConfirm);

            let data = {
                name: messageIncoming._data.notifyName,
                Ficha: regficha,
                Numero: messageIncoming.numberFrom,
                Horometro: regOdometro,
            };

            posdata.postData(urlPowerautomate, data).then((data) => {
                console.log(data);
                if (data.ok) {
                    // Send message en clear chat
                    client.sendMessage(
                        messageIncoming.from,
                        '✅ Datos Enviados correctamente a la base de datos.'
                    );
                    client.sendMessage(
                        messageIncoming.from,
                        `👍 *${messageIncoming._data.notifyName}* Se envió la Ficha: *${regficha}* y el Odometro/Horometro: *${regOdometro}*`
                    );
                    return client
                        .sendMessage(
                            messageIncoming.from,
                            `🛠 Cualquier inconveniente favor de enviarnos un ticket a *soporte@constructorarizek.com* o llamarnos al *_809-372-2680_* EXT: *_231_*.
                                    ✏ Escribe *Hola* para iniciar el *Bot*`
                        )
                        .then(chatIdInfo.delete());
                }
            });
        }
    }
};
  
module.exports = question;

