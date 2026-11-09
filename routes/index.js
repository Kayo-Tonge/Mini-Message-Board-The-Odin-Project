// routes/authorRouter.js
const { Router } = require("express");
const db = require("../db/queries");

const indexRouter = Router();



indexRouter.get("/", async (req, res) => {
    const results = await db.getAllMessages();
    const messages = results.rows || results; 
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/new", async (req, res) => {
    try {
        const results = await db.getAllMessages();
        const messages = results.rows || results; 

        res.render("form",{ 
        title: 'Mini Messageboard', 
        messages: messages 
        });
    }
    catch (err) {
    console.error(err);
    res.status(500).send('Database connection error');
  }
});
indexRouter.get("/message/:messageId", async (req, res) => {
    const results = await db.getAllMessages();
    const messages = results.rows || results; 
    const messageId = Number(req.params.messageId)
    const selectedMessage = messages[messageId];
    if (!selectedMessage){
        res.status(404).send("Message not found!")
    }
    res.render("message", {message: selectedMessage});
});

indexRouter.post("/new", async (req, res) => {
    const {messageText, messageUser} = req.body;
    const added = new Date(); // Generate timestamp here
    await db.insertUsername(messageUser, messageText, added);
    res.redirect("/");
});


module.exports = indexRouter;
