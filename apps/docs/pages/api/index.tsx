import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const filename = '/index.html';

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write(await fs.readFileSync(filename, 'utf-8'));
  res.end();
}
