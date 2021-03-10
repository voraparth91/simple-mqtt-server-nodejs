var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.emqx.io:1883');

_startMqtt = function(){
  client.on('connect', function () {
    
    console.log("Server connected to Broker successfully!");

    // Once our server is connected, subscribe everything
    client.subscribe('api/#', function (err) {
      if (err) {
        console.error("Error Occured in subscribing #: ", err);
      }else{
        console.log("Server subscribed to topic # successfully");
      }
    })

  })

  client.on('message', function(topic, message){
      var obj = {};
      obj.topic = topic;
      obj.message = message.toString();
      console.log("Message Received :", JSON.stringify(obj));

      //Assuming client has subscribed to topic as client/{clientId}
      // Lets send it to clientId - 1 for now
      client.publish('client/1', "Received your message:: " + JSON.stringify(obj));
  })
}

exports.startMqtt = _startMqtt;