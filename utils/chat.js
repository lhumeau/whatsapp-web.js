const client = require('../client');


async function deleteChat(phoneNumber) {
    return new Promise((resolve, reject) => {
        client
            .getChatById(phoneNumber)
            .then((chat) => {
                console.log('Chat information = ', chat);
                chat.delete().then((deleteRes) => {
                    if (deleteRes) resolve('successfuly deleted');
                    else reject('something went wrong');
                });
            })
            .catch((err) => {
                if (
                    err.message.includes('Cannot read property \'serialize\' of undefined')
                )
                    reject('do not have chat history');
                // can handle other error messages...
            });
    });
}



async function archiveChat(phoneNumber) {
    return new Promise((resolve, reject) => {
        try {
            const chat =  client.getChatById(phoneNumber);
            console.log('Chat information = ', chat);
            if (!chat.archived) {
                chat.archive().then(() => {
                    resolve('successfuly archived');
                });
            } else {
                reject('already archived');
            }
        } catch (err) {
            if (err.message.includes('Cannot read property \'serialize\' of undefined'))
                reject('do not have chat history');
            // can handle other error messages...
        }
    });



    // client.on('ready', async () => {
    //     console.log('Client is ready!');

    //     const phoneNumber = '801234567890@c.us';

    //     archiveChat(phoneNumber)
    //         .then((res) => console.log(res)) // contains ["successfuly archived"]
    //         .catch((err) => console.log(err)); // contains ["already archived", "do not have chat history"]

    //     deleteChat(phoneNumber)
    //         .then((res) => console.log(res)) // contains ["successfuly deleted"]
    //         .catch((err) => console.log(err)); // contains ["something went wrong", "do not have chat history"]
    // });

}

module.exports = {
    deleteChat,
    archiveChat,
};