import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FIXTURE_NEWSLETTER, FIXTURE_ARTICLES, FIXTURE_CONFIG } from './fixtures.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = process.env.OUTPUT_PATH ?? path.join(__dirname, '.output');
const EVAL_PROVIDER = process.env.EVAL_PROVIDER ?? 'unknown';

const TOOLS = [
  { name: 'get_newsletters_count', description: 'Returns count of newsletters', inputSchema: { type: 'object', properties: {} } },
  { name: 'prepare_newsletters', description: 'Prepares newsletters', inputSchema: { type: 'object', properties: { limit: {}, pattern: {}, safeMode: {} }, required: ['limit'] } },
  { name: 'get_newsletters_list', description: 'Returns newsletter list', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_config', description: 'Returns config', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_newsletter_links', description: 'Returns links for a newsletter', inputSchema: { type: 'object', properties: { newsletterName: { type: 'string' } }, required: ['newsletterName'] } },
  { name: 'scrape_article', description: 'Scrapes an article URL', inputSchema: { type: 'object', properties: { url: { type: 'string' } }, required: ['url'] } },
  { name: 'save_article', description: 'Saves generated article', inputSchema: { type: 'object', properties: { content: { type: 'string' }, newsletterName: { type: 'string' } }, required: ['content'] } },
  { name: 'mark_newsletters_as_processed', description: 'Marks newsletters processed', inputSchema: { type: 'object', properties: { safeMode: {}, uids: {} } } },
];

async function handleTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_newsletters_count':
      return { count: 1, patterns: { 'JavaScript Weekly': 1 } };

    case 'prepare_newsletters':
      return { success: true, count: 1, linksYamlPath: '/tmp/eval-links.yaml' };

    case 'get_newsletters_list':
      return {
        newsletters: [{
          name: FIXTURE_NEWSLETTER.name,
          uid: FIXTURE_NEWSLETTER.uid,
          date: FIXTURE_NEWSLETTER.date,
          hashtags: FIXTURE_NEWSLETTER.hashtags,
          linkCount: FIXTURE_ARTICLES.length,
        }],
      };

    case 'get_config':
      return {
        ...FIXTURE_CONFIG,
        outputPath: OUTPUT_PATH,
      };

    case 'get_newsletter_links':
      return {
        newsletterName: FIXTURE_NEWSLETTER.name,
        uid: FIXTURE_NEWSLETTER.uid,
        links: FIXTURE_ARTICLES.map(a => ({ url: a.url, title: a.title })),
      };

    case 'scrape_article': {
      const url = args.url as string;
      const article = FIXTURE_ARTICLES.find(a => a.url === url);
      if (!article) {
        return { success: false, error: `No fixture for URL: ${url}`, content: '' };
      }
      return { success: true, url, title: article.title, content: article.content };
    }

    case 'save_article': {
      const content = args.content as string;
      await fs.mkdir(OUTPUT_PATH, { recursive: true });
      const outputFile = path.join(OUTPUT_PATH, `last-${EVAL_PROVIDER}.md`);
      await fs.writeFile(outputFile, content, 'utf-8');
      return { success: true, filePath: outputFile, slug: null };
    }

    case 'mark_newsletters_as_processed':
      return { success: true, processed: [FIXTURE_NEWSLETTER.uid], deleted: [] };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  const server = new Server(
    { name: 'newsletter-ai-fake', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
      const result = await handleTool(name, (args ?? {}) as Record<string, unknown>);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);

  process.on('SIGINT', async () => { await server.close(); process.exit(0); });
  process.on('SIGTERM', async () => { await server.close(); process.exit(0); });
}

main().catch(err => { console.error(err); process.exit(1); });
