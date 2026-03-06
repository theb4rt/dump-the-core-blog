interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Env {
  DUMP_THE_CORE_KV: KVNamespace;
}

export async function onRequestPost(context: {
  params: Record<string, string>;
  env: Env;
}): Promise<Response> {
  const slug = context.params.slug;
  const key = `likes:${slug}`;
  const current = parseInt((await context.env.DUMP_THE_CORE_KV.get(key)) ?? '0');
  const next = current + 1;
  await context.env.DUMP_THE_CORE_KV.put(key, String(next));

  return Response.json(
    { likes: next },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
