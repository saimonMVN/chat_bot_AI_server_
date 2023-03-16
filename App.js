const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const { json } = require("express");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", async (req, res) => {
 
  res.send("I Am Live ....")
});

app.post("/", async (req, res) => {
  
  const prompt = req.body.text

  try {
    const responseAi = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
        bot : responseAi.data.choices[0].text
    })
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
