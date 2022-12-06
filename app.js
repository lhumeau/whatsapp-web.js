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
          puppeteer: { headless: true,
                       executablePath: '/bin/chromium-browser',
                     
                     },
          ,// activa el chromiun
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
    console.log('QR RECEIVED',`'${qr}'`);

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
var ficha2 = `
            *👀Lea atentamente lo que se le pide en cada opción y responda adecuadamente.👀*

            ❌Favor verificar su ficha nuevamente, asegurese de que su ficha cumpla con lo siguiente:  
            - Formato VL-M43.
            - Que contenga guiones.
            - Que contenga 6 caracteres.
            - Que contenga numeros y letras.
            - Que no tenga espacios delante ni detras.
            - No enviar mensajes en blanco.
            - No debe colocar ni enviar emojis.❌`

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
*Lea atentamente lo que se le pide en cada opción y responda adecuadamente.*

Indique la opción a realizar:

 1️⃣ - *Registro de Horometro/Odometro.*🚘/🚜
 2️⃣ - En Desarrollo.🔧...
 3️⃣ - En Desarrollo.🔧...

  `
    ;
    console.log("respuesta usuario", lastAnswerUser.length);
    console.log("respuesta Bot", lastAnswerBot.length);
    
    if (mensaje.fromMe) // Determinar de remitente de mensaje.
    {
        
        if (lastAnswerBot.length === 0) 
        {          
            return client.sendMessage(msg.from, menu);
        }

        if (lastAnswerBot[0].body == menu) {
            return console.log("Esperando respuesta bot desde el bot 1");
        } 
    } 

    else 
    
    {
      
       if (lastAnswerUser.length === 1 && lastAnswerBot.length === 0  ) 
        {
            
            return client.sendMessage(msg.from, menu)
            
        }
        if (lastAnswerUser.length === 2 && lastAnswerBot.length === 0  ) 
        {
            
            return client.sendMessage(msg.from, menu)
            
        }
        if (lastAnswerUser.length === 1 && lastAnswerBot.length === 1  ) {
           
            console.log("Usuario Respondio en valor 1/1");
             
                   
        } 
        if (lastAnswerUser.length === 0 && lastAnswerBot.length === 0  ) {
           
            console.log("Usuario Respondio en Valor 0/1");
            return client.sendMessage(msg.from, menu);

             
                   
        }
        

        if (lastAnswerUser.length === 0 && lastAnswerBot[0].body == ficha || lastAnswerUser.length === 0 && lastAnswerBot[0].body == ficha2 ) 
        {
            console.log(mensaje, 'Valoes de mensaje')
    
            
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
        

        if (lastAnswerUser.length === 0 && lastAnswerBot[0].body == menu ) // Si nadie ha hablado y solamente habla el bot - Inicio de conversación
        {
            console.log(mensaje, 'Valores de mensaje 0/0')
                
            lastAnswerUser[0] = mensaje._data.body;
            lastAnswerBot[0].body = lastAnswerBot[1].body
            console.log(lastAnswerBot[0].body, "lastAnswerBot[0].body 0/2")
                     
          
        } 


        if(mensaje._data.body == startConversation || mensaje._data.body == 'hola' || mensaje._data.body == 'klk' || mensaje._data.body == 'hola '
        || mensaje._data.body == 'Hola ' || mensaje._data.body == 'Hola'  || mensaje._data.body == 'HOLA' || mensaje._data.body == 'HOLA ' || mensaje._data.body == 'klk ' || mensaje._data.body == 'Klk' || mensaje._data.body == 'Klk '  )
        {
     
            return  client.sendMessage(msg.from, menu);

   
        }
            
        if (mensaje._data.body == option1R || mensaje._data.body == '1r' || mensaje._data.body == '1' && lastAnswerBot[0].body == menu  ) // Selección en el menu 
             {

            return  client.sendMessage(msg.from, ficha);
            }

            
        if (lastAnswerBot[0].body == ficha || lastAnswerBot[0].body == ficha2 ) // Captura respuesta de la  ficha  usuario
        {
            console.log(mensaje._data.body, 'Valor de body en 0/ficha2 ')
            

            regficha = mensaje._data.body;
            
             
            if(/[a-zA-Z]/.test(regficha) == true && regficha.length == 6 && /[-]/.test(regficha) == true && /[0-9]/.test(regficha) == true  ) // validar condición de ficha 2
            {
                regficha.toUpperCase();
                regficha.trim();
            
            }else{
                console.log(mensaje._data.body, 'Valor de body en 0 ')
                return  client.sendMessage(msg.from, ficha2);
            }
                

            return  client.sendMessage(msg.from, counter);
        }

        
        if (lastAnswerBot[0].body == counter)  /// Captura de respuesta de Odometro/Horometro de usuario.
             {
                regOdometro = mensaje._data.body;
                if(/[a-zA-Z]/.test(regOdometro))
                {
                    return  client.sendMessage(msg.from, counter);

                }
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
                                    return client.sendMessage(msg.from,`🛠 Cualquier inconveniente favor de enviarnos un ticket a *soporte@constructorarizek.com* o llamarnos al *_809-372-2680_* EXT: *_231_*.
                                    ✏ Escribe *Hola* para iniciar el *Bot*`).then(chatIdInfo.clearMessages());
                                   
                                             

                                                
                                } 
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
