import amqplib, { connect } from 'amqplib'

const connectToRabbitMq = async () => {
    const connection = await amqplib.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    const queueName = 'service1'
    await channel.assertQueue(queueName , {durable : true })  // this method of using rabitMQ , is using  Direct  exchanger (Direct is the default exchange)
    for (let i = 0; i < 20; i++) {
        channel.sendToQueue(queueName , Buffer.from(i.toString()) , {persistent : true}) // 1 : we have to send data in buffer form , 2 : with  {persistent : true} option , even if our rabbitMQ server shuts down , then queue will save in the disk and won't disapear
    }
}
connectToRabbitMq()

// if we have several consumers that using one producer , then prodcuer messages will divide between all these consumers , for example if we have 10 messages and 2 consumers , each consumer will recive 5 messages