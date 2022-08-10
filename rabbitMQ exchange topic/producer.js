import amqplib from 'amqplib'
const exchangeName = 'topicMessage'

const producer = async (rabbitMqRegex) => {
    const connection = await amqplib.connect('amqp://localhost:5672')

    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName , 'topic') 

    channel.publish(exchangeName , rabbitMqRegex , Buffer.from('from producer in topic exchange to consumer'))
}

producer('amir.mohammad')