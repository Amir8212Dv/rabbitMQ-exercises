import amqplib from 'amqplib'
const exchangeName = 'logs'

const producer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName , 'fanout')

    channel.publish(exchangeName , '' , Buffer.from('message from fanout exchange'))
}

producer()

// in this way of using rabbitMQ , if while we publishing data from producer , there was not consumer to recive data , then data will lost (in Direct exchange method was not like this)
// and this is because of there is not queue to store data