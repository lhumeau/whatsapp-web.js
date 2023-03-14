const client = require('../utils/auth');
const { ListProject, vehicleListMenu1,vehicleListMenu2  } = require('../data/Lists');
const posdata = require('../utils/postData'); // importamos la libreria // \r\n
const { ListFactory } = require('../utils/createList');
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
    menu1,
    menu2,
    dailyInspectionReportVariable,
    ficha,
    project,
    nivelAceiteMotor,
    
} = require('../data/allVariablesFile');
    

const { getNameFromMessage,
} = require('../data/allVariablesFile');


const {
    engineOilLevel,
    oilTransmisionLevel,
    oilCoolantLevel,
    strapsPhysicalState,
    tiresState,
    spareRubberState,
    VehicleSwitchAndGauges,
    securityBellState,
    hornState,
    fireExtinguisherState,
    hseFirstAidKit,
    hseTriangle,
    hseBallLightning,
    hseReverseWhistle,
    docEnrolment,
    docInsurance,
    docLicense,
    OilorGreaseLeak,
    jackAndWheelWrench,
    tightRubberNuts,
    serviceBreakOperating,
    emergencyBreakOperating,
    comment,
} = require('./ButtonsList');
const { buttonsFactory } = require('../utils/createButtons');
var generalFormsAnswer = []; 

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
            return client.sendMessage(messageIncoming.from, menu1);
        }
    } else {
        if (lastAnswerBot.length === 0) {
            return client.sendMessage(messageIncoming.from, menu1);
        }
        if (hasMatchgreetings) {
            return client.sendMessage(messageIncoming.from, menu1);
        }

        if (messageIncoming.body == '1' && lastAnswerBot[0].body == menu1) {
            // Selección en el menu
            return client.sendMessage(messageIncoming.from, vehicleListMenu1);
        }
        if (messageIncoming.body == '2' && lastAnswerBot[0].body == menu1) {
            // Selección en el menu

            return client.sendMessage(messageIncoming.from, menu2);
        }
        // eslint-disable-next-line no-undef
        if (messageIncoming.body == '2' && lastAnswerBot[0].body == menu1) {
            // Selección en el menu

            return client.sendMessage(messageIncoming.from, menu2);
        }
        if (
            messageIncoming.body == '1' &&
      lastAnswerBot[0].body == menu2
        ) {
         
            return client.sendMessage(messageIncoming.from, vehicleListMenu2);
    
            // Ask for questionary answer
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'list_response' &&
          lastAnswerBot[0].type == 'list' &&
          lastAnswerBot[0].body == 'Listado de vehiculos livianos'
        ) {
            generalFormsAnswer.ficha = messageIncoming.body;
            console.log(generalFormsAnswer);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                ListFactory(ListProject)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'list_response' &&
          lastAnswerBot[0].type == 'list' &&
          lastAnswerBot[0].body == 'Seleccione un proyecto.'
        ) {
        
            generalFormsAnswer.project = messageIncoming.body;
            console.log(generalFormsAnswer);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(engineOilLevel)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].body == engineOilLevel.body
        ) {

            generalFormsAnswer.engineOilLevel = messageIncoming.body;
            console.log(generalFormsAnswer);
            // Selección en el menu
            return client.sendMessage(messageIncoming.from,buttonsFactory(oilTransmisionLevel));
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].body == oilTransmisionLevel.body
        ) {
            dailyInspectionReportVariable.oilTransmisionLevel =
                     messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            console.log(`ficha: ${ficha},project: ${project},nivelAceiteMotor: ${nivelAceiteMotor}`);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(oilCoolantLevel)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].body == oilCoolantLevel.body
        ) {
            dailyInspectionReportVariable.oilCoolantLevel =
               messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(strapsPhysicalState)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].body == strapsPhysicalState.body
        ) {
            dailyInspectionReportVariable.strapsPhysicalState =
               messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(tiresState)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
           messageIncoming.type == 'buttons_response' &&
           lastAnswerBot[0].body == tiresState.body
        ) {
            dailyInspectionReportVariable.tiresState = messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(spareRubberState)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].body == spareRubberState.body
        ) {
            dailyInspectionReportVariable.spareRubberState =
               messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(VehicleSwitchAndGauges)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].body == VehicleSwitchAndGauges.body
        ) {
            dailyInspectionReportVariable.VehicleSwitchAndGauges =
               messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(securityBellState)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == securityBellState.body
        ) {
            dailyInspectionReportVariable.securityBellState =
              messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(hornState)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }

        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == hornState.body
        ) {
            dailyInspectionReportVariable.hornState = messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(fireExtinguisherState)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }

        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == fireExtinguisherState.body
        ) {
            dailyInspectionReportVariable.fireExtinguisherState =
               messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(hseFirstAidKit)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == hseFirstAidKit.body
        ) {
            dailyInspectionReportVariable.hseFirstAidKit = messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(hseTriangle)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == hseTriangle.body
        ) {
            dailyInspectionReportVariable.hseTriangle = messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(hseBallLightning)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == hseBallLightning.body
        ) {
            dailyInspectionReportVariable.hseBallLightning =
              messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(hseReverseWhistle)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == hseReverseWhistle.body
        ) {
            dailyInspectionReportVariable.hseReverseWhistle =
               messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(docEnrolment)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == docEnrolment.body
        ) {
            dailyInspectionReportVariable.docEnrolment = messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(docInsurance)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == docInsurance.body
        ) {
            dailyInspectionReportVariable.docInsurance =
                  messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(docLicense)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == docLicense.body
        ) {
            dailyInspectionReportVariable.docLicense = messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(OilorGreaseLeak)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }


        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == OilorGreaseLeak.body
        ) {
            dailyInspectionReportVariable.OilorGreaseLeak =
              messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(jackAndWheelWrench)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == jackAndWheelWrench.body
        ) {
            dailyInspectionReportVariable.jackAndWheelWrench =
               messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(tightRubberNuts)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == tightRubberNuts.body
        ) {
            dailyInspectionReportVariable.tightRubberNuts =
              messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(serviceBreakOperating)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == serviceBreakOperating.body
        ) {
            dailyInspectionReportVariable.serviceBreakOperating =
              messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(emergencyBreakOperating)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == emergencyBreakOperating.body
        ) {
            dailyInspectionReportVariable.emergencyBreakOperating =
              messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                buttonsFactory(comment)
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }

        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'buttons_response' &&
          lastAnswerBot[0].type == 'chat' &&
          lastAnswerBot[0].body == comment.body
        ) {
            dailyInspectionReportVariable.comment = messageIncoming.body;
            console.log(dailyInspectionReportVariable);
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from, 'Por favor indique su comentario');
            // return client.sendMessage(`You've selected ${regFicha}`);
        }
        // FIXME
        if (messageIncoming.body == 'Si' || messageIncoming.body == 'Yes' ||
            messageIncoming.body == 'si' || messageIncoming.body == 'yes'
            &&
            lastAnswerBot.length != 0 &&
            lastAnswerBot[0].body == 'Por favor indique su comentario'
        ) {
           

            return client.sendMessage(
                messageIncoming.from,
                'Gracias por su comentarios, su reporte ha sido enviado');
            
        }

        if ( messageIncoming.body == 'No' || messageIncoming.body == 'no' && 
            lastAnswerBot.length != 0 &&
            lastAnswerBot[0].type == 'chat' &&
            lastAnswerBot[0].body == 'Por favor indique su comentario'
        ) {
            
            // Selección en el menu
            return client.sendMessage(
                messageIncoming.from,
                'Su reporte ha sido enviado'
            );
            // return client.sendMessage(`You've selected ${regFicha}`);
        }

        if (
            lastAnswerBot.length != 0 &&
          messageIncoming.type == 'list_response' &&
          lastAnswerBot[0].type == 'list' &&
            lastAnswerBot[0].body == 'Lista de vehiculos livianos' 
         
        ) {
            // Captura respuesta de la  ficha  usuario
            regficha = messageIncoming.body;
            
           

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

