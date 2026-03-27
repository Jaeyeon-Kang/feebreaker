// TODO: After AdSense approval, replace YOUR_PUBLISHER_ID with your pub-XXXXXXXXXXXXXXXX ID
// Example: google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
//
// Steps:
// 1. Get approved by Google AdSense
// 2. Go to AdSense → Account → Account information → copy Publisher ID
// 3. Replace YOUR_PUBLISHER_ID below and redeploy

export async function GET() {
  const content = `google.com, YOUR_PUBLISHER_ID, DIRECT, f08c47fec0942fa0`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
