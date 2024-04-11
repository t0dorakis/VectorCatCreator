import OpenAI from "openai";

import { globalState } from "./stateManager.ts";

const model = "gpt-4-0125-preview";

// keys open to public – do not host in production
const openai = new OpenAI({
  organization: import.meta.env.VITE_OPENAI_ORGANISATION,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getChatCompletion = async (userMessage: string): Promise<void> => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Your reply only in svg format. Dont add any explanations. You will get 100 € if you answer correctly and creatively. Just reply with the raw svg code without ```svg``` or ```html``` tags.",
      },
      { role: "user", content: userMessage },
    ],
    model,
  });

  globalState.setState({ message: response.choices[0].message.content });
};

export { getChatCompletion };
