import amqplib from 'amqplib'
const exchangeName = 'headersMessage'

const producer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName , 'headers') 

    channel.publish(exchangeName , '' , Buffer.from('from producer in headers exchange to consumer') , {headers : {
        name : 'Amir'
    }})
}

producer()