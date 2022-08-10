import amqplib from 'amqplib'
const exchangeName = 'directMessage'

const producer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName , 'direct') 

    channel.publish(exchangeName , 'error' , Buffer.from('can not connect to DB'))
}

producer()