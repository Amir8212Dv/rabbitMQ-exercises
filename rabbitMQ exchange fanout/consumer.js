import amqplib from 'amqplib'
const exchangeName = 'logs'

const consumer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName , 'fanout')
    const queue = await channel.assertQueue('' , {exclusive : true})  // if we don't assign any name to asswerQueue() , then we have to add {exclusive : true} option (this tells method : hey i don't give a name to you , create a name by your self and use that)

    channel.bindQueue(queue.queue , exchangeName , '')

    channel.consume(queue.queue , msg => {
        console.log(msg.content.toString())
        channel.ack(msg)
    })
}

consumer()