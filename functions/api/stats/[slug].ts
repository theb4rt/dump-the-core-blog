interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Env {
  DUMP_THE_CORE_KV: KVNamespace;
}

export async function onRequestGet(context: {
  params: Record<string, string>;
  env: Env;
}): Promise<Response> {
  const slug = context.params.slug;
  const kv = context.env.DUMP_THE_CORE_KV;

  const [views, likes] = await Promise.all([
    kv.get(`views:${slug}`),
    kv.get(`likes:${slug}`),
  ]);

  return Response.json(
    {
      views: parseInt(views ?? '0'),
      likes: parseInt(likes ?? '0'),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
