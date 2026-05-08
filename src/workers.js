export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      const url = new URL(request.url);

      // Only rewrite app routes (not real files)
      if (!url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
        return env.ASSETS.fetch(
          new Request(new URL('/index.html', request.url))
        );
      }
    }

    return response;
  },
};
