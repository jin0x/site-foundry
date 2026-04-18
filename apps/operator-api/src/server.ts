import { createServer } from 'node:http';
import { createRunRecord } from '@site-foundry/registry-contracts';

const server = createServer((req, res) => {
  const url = req.url ?? '/';

  if (req.method === 'GET' && url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'operator-api' }));
    return;
  }

  if (req.method === 'POST' && url === '/runs') {
    const run = createRunRecord({
      id: `run_${Date.now()}`,
      projectProfileId: 'project.local-demo',
      sourceType: 'figma',
      sourceRef: 'placeholder',
      triggeredBy: 'api',
    });
    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify(run));
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(4010, () => {
  console.log('Site Foundry operator API listening on http://localhost:4010');
});
