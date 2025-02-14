// app/api/createIndex/route.ts

import { db } from "@/lib/db";


export async function GET(request: Request) {
  try {
    // Replace with your actual index creation logic
    await db.$queryRaw`
      CREATE INDEX IF NOT EXISTS course_title_fulltext_idx 
      ON "Course" USING GIN (to_tsvector('english', title));
    `;
    return new Response(JSON.stringify({ message: 'Full-text index created successfully!' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating full-text index' }), {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
}
