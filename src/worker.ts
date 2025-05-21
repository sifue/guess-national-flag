export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // Simple static file server
    const url = new URL(request.url);
    let path = url.pathname;
    
    // Handle root path
    if (path === '/' || path === '') {
      path = '/index.html';
    }
    
    // Try to serve from KV or assets
    try {
      // Return the static asset from __STATIC_CONTENT
      return await env.__STATIC_CONTENT.fetch(request);
    } catch (e) {
      // If the asset is not found, return a 404
      return new Response('Not Found', { status: 404 });
    }
  }
}; 