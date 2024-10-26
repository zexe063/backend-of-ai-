
const express = require("express");
const server = express()
const cors  = require("cors")
const { GoogleGenerativeAI, SchemaType} = require("@google/generative-ai");
const ai = new GoogleGenerativeAI("AIzaSyDYH-oiCzVAbrcA9YkvRREzUMcg0jHFXok");


server.use(express.json());
server.use(cors());

const model = ai.getGenerativeModel({
 model:"gemini-1.5-flash",
 generationConfig:{
    responseMimeType:"application/json",
    responseSchema:{
        type:SchemaType.OBJECT,
        properties:{
          header:{
            type:SchemaType.STRING,
            description:"decribe what you do that"
          },
          code:{
            type:SchemaType.STRING,
            description:"genertae only execute code"
          },
          explaination:{
            type:SchemaType.STRING,
           description:"explain the  code"
          },
        FilePath:{
            type:SchemaType.STRING,
          description:"please name the file path"
            
        }
        }
    
    }
 }

})

server.get("/",(req,res)=>{
  res.send("helo")
})






server.post("/chat",async(req,res)=>{
  
  console.log(req.body)
  const prompt = `
  you are Eclisipe a coding agent for full stack web development (react js next js and all web dev tools)
  you canot do any mistake
  you are a good coder
  you can only genetate code for web dev not otehrs
 ${req.body.prompt}`;

 
  console.log(prompt)
  const result = await model.generateContent(prompt)
  const obj = JSON.parse(result.response.text())
  res.json(obj)
})



server.listen(4000, function(req,res){
  console.log("server is running at port 4000")
})






// const { Sandbox } = require('@e2b/code-interpreter');

// async function runNextJSCode(nextJSCode, apiKey) {
//   let sandbox;
//   try {
//     sandbox = await Sandbox.create('pdpab1dz4myahl3m6feh',{
//       apiKey: apiKey,
//       timeoutMs: 10 * 60 * 1000,
//     })
      
     
    
//     if(sandbox){
//       console.log("sandbox created successfully");
//       console.log(sandbox)
     
//     }

//     // Write Next.js code
//     await sandbox.files.write('/home/user/pages/app.tsx', nextJSCode);

//     console.log('Waiting for Next.js server to start...');
//     await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for 30 seconds

//     console.log('Checking if Next.js server is running...');
  

//     const url = `https://${sandbox.getHost(3000)}`;
//     console.log(`Next.js app should be running at: ${url}`);

//     // Keep the sandbox running for a while
//     await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minutes

//   } catch (error) {
//     console.error('An error occurred:', error);
//   } finally {
//     if (sandbox) {
//       await sandbox.close();
//       console.log('Sandbox closed');
//     }
//   }
// }

// const nextJSCode = `
// import { Button } from "@/components/ui/button"

// export default function Home() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Hello from custom Next.js app in e2b sandbox!</h1>
//       <p className="mb-4">This is a custom Next.js component running in an e2b sandbox.</p>
//       <Button>Click me!</Button>
//     </div>
//   )
// }
// `;

// const apiKey = 'e2b_30e3b5a9c98b0ff3634950cbb7f40f8c74b6b6e2'; // Replace with your actual API key

// runNextJSCode(nextJSCode, apiKey);

