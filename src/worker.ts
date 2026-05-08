interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Cloudflare Workers with assets binding automatically handles routing
    return env.ASSETS.fetch(request);
  }
};
