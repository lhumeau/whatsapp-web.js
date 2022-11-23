const {
    Client,
    Location,
    List,
    Buttons,
    LocalAuth,
    Chat,
    Message,
} = require("./index");

const qrcode = require("qrcode-terminal");
const accionar = require("./accionar");
const posdata = require("./postData");
var qrcodeVar = ''
const client = new Client({
    authStrategy: new LocalAuth(),
          puppeteer: { headless: true },  // activa el chromiun
    /*    puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: false 
       
            }    */

    });


        
        

const chat = new Chat({});
const message = new Message({});



client.on("loading_screen", (percent, message) => {
    console.log("LOADING SCREEN", percent, message);
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    qrcodeVar = qr;

});

client.on("authenticated", () => {
    console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
    // Fired if session restore was unsuccessful
    console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
    console.log("Client is ready!");
});

//Variables

var ficha = `Favor de indicar la Ficha Con Guiones.
             Como por ejemplo: 
             *VL-M45*`;
var counter = `Favor de indicar 
               *Horometro/Odometro.*`;
var dev = "Opción en Desarrollo";
var debesElegir = "Debe elegir una de las opciones";
const invokeKey = "!b";
var option1R = "1R";
var option2R = "2R";
var option3R = "3R";
var regficha;
var regOdometro;
var regDataConfirm = "🚀Procesando los datos...";
var startConversation = "Hola";

var urlPowerautomate = "https://prod-93.westus.logic.azure.com:443/workflows/d9f08a8dc01d48fe994631b08ea80db6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=r9iB23oBpcLglT1lo6lZCgHnl_OX2nqfHH6tyTr2Cu8";
 
var dataJson;
var htmlResponseCode;
var statusInsert = "Success";

// On create message

client.initialize();

client.on("message_create", async (msg) => {
    var mensaje = await msg;
    var numberFrom = mensaje.from
    numberFrom = numberFrom.replace(/\D/g, "");
    var chatId = await accionar.sanitizeNumber(mensaje);
    var chatIdInfo = await client.getChatById(chatId);
    var lastAnswerBot = await accionar.getLastMessageFromBot(chatIdInfo);
    var lastAnswerUser = await accionar.getLastMessageFromUser(chatIdInfo);
   

    var menu = `
👷‍♀️👷‍♂️ Hola *${mensaje._data.notifyName}*,

Indique la opción a realizar:

 1️⃣ - *Registro de Horometro/Odometro.*🚘/🚜
 2️⃣ - En Desarrollo.🔧...
 3️⃣ - En Desarrollo.🔧...

  `
    ;
    console.log("respuesta usuario", lastAnswerUser.length);
    console.log("respuesta Bot", lastAnswerBot.length);
    // Fired on all message creations, including your own
    if (mensaje.fromMe) {
        // do stuff here
        if (lastAnswerBot.length === 0) 
        {          
            return client.sendMessage(msg.from, menu);
        }

        if (lastAnswerBot[0].body == menu) {
            return console.log("Esperando respuesta bot desde el bot 1");
        } 
    } else {
      
       if (lastAnswerUser.length === 1 && lastAnswerBot.length === 0  ) 
        {
            
            return client.sendMessage(msg.from, menu)
            
        }
        if (lastAnswerUser.length === 1 && lastAnswerBot.length === 1  ) {
           
            console.log("Usuario Respondio");
             
                   
        } 
        

        if (lastAnswerUser.length === 0 && lastAnswerBot[0].body == ficha ) 
        {
            console.log(mensaje, 'Valoes de mensaje')
          /*   while (lastAnswerUser.length === 0) {
                lastAnswerUser = await accionar.getLastMessageFromUser(chatIdInfo);
                console.log(lastAnswerUser.length,"Salida del While Esperando respuesta de usuario desde el bot else 2");
                return  client.sendMessage(msg.from, lastAnswerBot[0].body);
                                
            } */
            
            lastAnswerUser[0] = mensaje._data.body;
            lastAnswerBot[0].body = lastAnswerBot[1].body
            console.log(lastAnswerBot[0].body, "lastAnswerBot[0].body 0/2")
                     
          
        } 
        if (lastAnswerUser.length === 0 && lastAnswerBot[0].body == counter ) 
        {
               
            lastAnswerUser[0] = mensaje._data.body;
            lastAnswerBot[0].body = lastAnswerBot[1].body
            console.log(lastAnswerBot[0].body, "lastAnswerBot[0].body 0/2")
                     
          
        } 

        if (lastAnswerUser.length === 0 && lastAnswerBot[0].body == menu ) 
        {
            console.log(mensaje, 'Valoes de mensaje')
          /*   while (lastAnswerUser.length === 0) {
                lastAnswerUser = await accionar.getLastMessageFromUser(chatIdInfo);
                console.log(lastAnswerUser.length,"Salida del While Esperando respuesta de usuario desde el bot else 2");
                return  client.sendMessage(msg.from, lastAnswerBot[0].body);
                                
            } */
            
            lastAnswerUser[0] = mensaje._data.body;
            lastAnswerBot[0].body = lastAnswerBot[1].body
            console.log(lastAnswerBot[0].body, "lastAnswerBot[0].body 0/2")
                     
          
        } 
/*          if (lastAnswerUser.length === 0 ) 
        {
            console.log(mensaje, 'Valor de mensaje')
            while (lastAnswerUser.length === 0) {
                lastAnswerUser = await accionar.getLastMessageFromUser(chatIdInfo);
                console.log(lastAnswerUser.length,"Salida del While Esperando respuesta de usuario desde el bot else 2");
                return  client.sendMessage(msg.from, lastAnswerBot[0].body);
                                
            } 
            
            lastAnswerUser[0] = mensaje._data.body;
                         
          
        }  
   
 */

        if(mensaje._data.body == startConversation || mensaje._data.body == 'hola' || mensaje._data.body == 'klk' || mensaje._data.body == 'hola '
        || mensaje._data.body == 'Hola ' || mensaje._data.body == 'Hola'  || mensaje._data.body == 'HOLA' || mensaje._data.body == 'HOLA ' || mensaje._data.body == 'klk ' || mensaje._data.body == 'Klk' || mensaje._data.body == 'Klk '  )
        {
         //   client.sendMessage(msg.from,`👷‍♂️ Hola ${mensaje._data.notifyName}, Esto es un bot de Whatsapp a continuación, elige la opción del menu deseada.`)

            return  client.sendMessage(msg.from, menu);

   
        }

        if (mensaje._data.body == option1R || mensaje._data.body == '1r' || mensaje._data.body == '1' && lastAnswerBot[0].body == menu  )
             {

            return  client.sendMessage(msg.from, ficha);
            }
        if (lastAnswerBot[0].body == ficha) 
        {
            console.log(mensaje._data.body, 'Valor de body en 0 ')
            

            regficha = mensaje._data.body;
            
            if(/[a-zA-Z]/.test(regficha))
            {
                regficha.toUpperCase();
            
            }
                
            if(/[-]/.test(regficha) == false)
            {
                    regficha = regficha.substr(0,2) + '-' + regficha.substr(2, 5)
                    console.log(regficha)
                   
            }

            return  client.sendMessage(msg.from, counter);
        }
        if (lastAnswerBot[0].body == counter) 
             {
                regOdometro = mensaje._data.body;
                regOdometro = regOdometro.replace(/[^0-9.]+/g, ''); //Allow number incluid floating number
                client.sendMessage(msg.from, regDataConfirm);
    
              
                            
                        let data = {
                            name: mensaje._data.notifyName,
                            Ficha: regficha,
                            Numero: numberFrom,
                            Horometro: regOdometro
                            
                        };  
                
                            posdata.postData(urlPowerautomate, data).then((data) => {
                                console.log(data);
                                if(data.ok)
                                { 
                                    // Send message en clear chat
                                    client.sendMessage(msg.from,`✅ Datos Enviados correctamente a la base de datos.`);
                                    client.sendMessage(msg.from,`👍 *${mensaje._data.notifyName}* Se envió la Ficha: *${regficha}* y el Odometro/Horometro: *${regOdometro}*`); 
                                    return client.sendMessage(msg.from,`🛠 Cualquier inconveniente favor de enviarnos un ticket a *soporte@constructorarizek.com*,
                                    o llamarnos al *_809-372-2680_* EXT: *_231_*.
                                    ✏ Escribe *Hola* para iniciar el *Bot*`).then(chatIdInfo.clearMessages());
                                   
                                             

                                                
                                } // JSON data parsed by `data.json()` call
                            });

              
           


                          
        }
    }
});


client.on("change_state", (state) => {
    console.log("CHANGE STATE", state);
});

client.on("disconnected", (reason) => {
    console.log("Client was logged out", reason);
});
