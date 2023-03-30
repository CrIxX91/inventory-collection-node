const { pusher } = require("../puhser/pusherlib");

const chatpusher = async(req,res= response)=>{
    
    const { message, sender } = req.body;
    await pusher.trigger("chat", "chat-event", {
      message,
      sender,
    });
  
    res.json({ message: "completed" });
}
const authpusher = async(req,res= response)=>{
      // see https://pusher.com/docs/channels/server_api/authenticating-users
        console.log('body',req);
        // const { socket_id, channel_name, username } = req.body;
        // const randomString = Math.random().toString(36).slice(2);
        

        // const presenceData = {
        //     id: randomString,
        //     user_info: {
        //     username: "@" + username,
        //     },
        // };

        // try {
        //     const auth = pusher.authenticateUser(socket_id, channel_name, presenceData);
        //     res.send(auth);    
        // } catch (error) {
        //     console.error(error)
        // }
}


module.exports={
    chatpusher,
    authpusher
}