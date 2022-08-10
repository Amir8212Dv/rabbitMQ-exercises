import amqplib from 'amqplib'
import { v4 } from 'uuid'

const producer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    const assertedQueue = await channel.assertQueue('' , {exclusive : true})

    const uuid = v4()
    
    channel.sendToQueue('rpc' , Buffer.from('please confirm this message') , {
        replyTo : assertedQueue.queue,
        correlationId : uuid
    })

    channel.consume(assertedQueue.queue , msg => {
        if(msg.properties.correlationId === uuid) {
            console.log(msg.properties.correlationId === uuid)
            console.log(msg.content.toString())
        }
    })
}

producer()