const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        partition: partition.toString(),
        headers: message.headers,
        group: group.toString()
      });
    },
  });
}

init();