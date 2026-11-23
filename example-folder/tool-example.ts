// import dotenv from "dotenv";
// import Anthropic from "@anthropic-ai/sdk";

// dotenv.config({ path: ".env.local" });
// const client = new Anthropic();

// // 1. Описуємо інструменти — це просто JSON-схема, Claude сам код не бачить
// const tools: Anthropic.Tool[] = [
//   {
//     name: "calculator",
//     description: "Виконує арифметичну операцію над двома числами",
//     input_schema: {
//       type: "object",
//       properties: {
//         a: { type: "number" },
//         b: { type: "number" },
//         op: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
//       },
//       required: ["a", "b", "op"],
//     },
//   },
//   {
//     name: "get_user",
//     description: "Повертає дані користувача за id",
//     input_schema: {
//       type: "object",
//       properties: { id: { type: "number" } },
//       required: ["id"],
//     },
//   },
// ];

// // 2. Справжній код, який виконує інструменти. Claude цього не бачить і не запускає сам
// function runTool(name: string, input: any): string {
//   if (name === "calculator") {
//     const { a, b, op } = input;
//     const result = { add: a + b, subtract: a - b, multiply: a * b, divide: a / b }[op];
//     return JSON.stringify({ result });
//   }
//   if (name === "get_user") {
//     // тут міг би бути запит у БД
//     const fakeDb: Record<number, string> = { 1: "Аліна", 2: "Роман" };
//     return JSON.stringify({ name: fakeDb[input.id] ?? "Привид" });
//   }
//   return JSON.stringify({ error: "unknown tool" });
// }

// async function main() {
//   const messages: Anthropic.MessageParam[] = [
//     { role: "user", content: "Скільки буде 23 поділити на 7, і як звати користувача з id 3?" },
//   ];
//     console.log(messages.length)

//   // 3. Сам цикл — крутиться, поки Claude просить інструменти
//   while (true) {
//     const response = await client.messages.create({
//       model: "claude-sonnet-5-5",
//       max_tokens: 1024,
//       tools,
//       messages,
//     });

//     // Claude закінчив — виводимо текст і виходимо
//     if (response.stop_reason === "end_turn") {
//       const textBlock = response.content.find((b) => b.type === "text");
//       console.log("Claude:", textBlock?.type === "text" ? textBlock.text : "");
//       break;
//     }

//     // Claude просить виконати один або кілька інструментів
//     if (response.stop_reason === "tool_use") {
//       // Важливо: в історію кладемо ВЕСЬ content, а не тільки текст
//       messages.push({ role: "assistant", content: response.content });

//       const toolResults: Anthropic.ToolResultBlockParam[] = [];

//       for (const block of response.content) {
//         if (block.type === "tool_use") {
//           console.log(`  → Claude викликає ${block.name}(${JSON.stringify(block.input)})`);
//           const result = runTool(block.name, block.input);

//           toolResults.push({
//             type: "tool_result",
//             tool_use_id: block.id, // обов'язково той самий id, що у відповіді
//             content: result,
//           });
//         }
//       }

//       messages.push({ role: "user", content: toolResults });
//       continue; // йдемо на наступну ітерацію циклу
//     }

//     // будь-який інший stop_reason (max_tokens, refusal...) — зупиняємось і розбираємось
//     console.log("Зупинились з причини:", response.stop_reason);
//     break;
//   }
// }

// main();