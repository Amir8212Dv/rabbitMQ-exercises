import amqplib from 'amqplib'

const consumer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()

    await channel.assertQueue('rpc')
    channel.consume('rpc' , msg => {
        console.log(msg.content.toString())

        console.log(msg.properties.replyTo)
        channel.sendToQueue(msg.properties.replyTo , Buffer.from('data recived successfully') , {correlationId : msg.properties.correlationId})

        channel.ack(msg)
    })


}

consumer()