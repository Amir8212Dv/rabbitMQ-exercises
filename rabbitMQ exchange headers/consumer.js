import amqplib from 'amqplib'
const exchangeName = 'headersMessage'

const consumer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName , 'headers')
    const assertedQueue = await channel.assertQueue('' , {exclusive : true})
    await channel.bindQueue(assertedQueue.queue , exchangeName , '' , {
        name : 'Amir',
        programmer : true,
        'x-match' : 'any'
    })

    channel.consume(assertedQueue.queue , msg => {
        console.log(msg.content.toString())
        channel.ack(msg)
    })
}

consumer()