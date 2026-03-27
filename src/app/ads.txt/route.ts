export async function GET() {
  const content = `google.com, pub-7755590920394652, DIRECT, f08c47fec0942fa0`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
