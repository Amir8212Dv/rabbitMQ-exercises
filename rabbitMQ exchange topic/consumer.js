import amqplib from 'amqplib'
const exchangeName = 'topicMessage'

const consumer = async (rabbitMqRegex) => {
    const connection = await amqplib.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName , 'topic')
    const assertedQueue = await channel.assertQueue('' , {exclusive : true})
    await channel.bindQueue(assertedQueue.queue , exchangeName , rabbitMqRegex)

    channel.consume(assertedQueue.queue , msg => {
        console.log(msg.content.toString())
        channel.ack(msg)
    })
}

consumer('#')