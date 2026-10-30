// routes/authorRouter.js
const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


indexRouter.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});
indexRouter.get("/new", (req, res) => {
    res.render("form", { title: "Mini Messageboard", messages: messages });
});
indexRouter.get("/message/:messageId", (req, res) => {
    const messageId = Number(req.params.messageId)
    const selectedMessage = messages[messageId];
    if (!selectedMessage){
        res.status(404).send("Message not found!")
    }
    res.render("message", {message: selectedMessage});
});
indexRouter.post("/new", (req, res) => {
    const {messageText} = req.body;
    const {messageUser} = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
});


module.exports = indexRouter;
