const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


const ask = async (_prompt) => {
    console.log(_prompt)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: _prompt,
        max_tokens: 1000,
    })
    return response.data.choices[0].text
} 

module.exports = { ask }
