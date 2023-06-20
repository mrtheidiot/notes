import { query } from "@/lib/db";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request: Request) {
  let text = await new Response(request.body).text(); //temp
  const { title, tags, long_text } = JSON.parse(text);

//   console.log(text);

  await query({
    query:
      "INSERT INTO posts (title, tags, long_text, active, created_by) VALUES (?, ?, ?, ?, ?)",
    values: [title, tags, long_text, "1", "Piotr"],
  });

  return new Response("all good");
}
