// import dotenv from "dotenv";
// import Anthropic from "@anthropic-ai/sdk";

// dotenv.config({ path: ".env.local" });

// const client = new Anthropic(); // сам бере ANTHROPIC_API_KEY з оточення

// const buggyCode = `
// function sum(arr) {
//   let total = 0;
//   for (let i = 0; i <= arr.length; i++) {
//     total += arr[i];
//   }
//   return total;
// }`;

// async function main() {
//   const response = await client.messages.create({
//     model: "claude-sonnet-5-5",
//     max_tokens: 1024,
//     system: "You are a terse senior code reviewer. Give feedback in one paragraph.",
//     messages: [{ role: "user", content: `Review this code:\n${buggyCode}` }],
//   });

//   for (const block of response.content) {
//     if (block.type === "text") {
//       console.log(block.text);
//     }
//   }

//   console.log("\nstop_reason:", response.stop_reason);
// }

// main();