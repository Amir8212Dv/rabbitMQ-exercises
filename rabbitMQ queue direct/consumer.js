import amqplib from 'amqplib'

const reciveFromProducer = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    const queueName = 'service1'
    await channel.assertQueue(queueName , {durable : true})
    let int = 0
    await channel.consume(queueName , msg => {
        console.log(int)   
        int++
        channel.ack(msg) // this is the ideal way of approving that we recived message and delete message from queue
    }) // {noAck : true} option , will approve that we recived message from producer , and that message will delete from queue (but this way of doing this is not the ideal way)
    console.log('finished')
}

reciveFromProducer()