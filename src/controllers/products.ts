import { Request, Response } from 'express';

export function getProducts(req: Request, res: Response): Response {
  // TODO
  console.log(req);
  return res.send('ok');
}