const TARGET_DATE = process.env.TARGET_DATE;

export default async function handler(_request, context) {
  const response = await context.next();
  const headers = response.headers;
  if (headers.get('content-type').includes('text/html')) {
    const content = await response.text();
    const updatedContent = content.replace('const referenceDate = ""', `const referenceDate = "${TARGET_DATE}"`)
    return new Response(updatedContent, response);
  }
  return response;
}

export const config = {
  path: "*",
};