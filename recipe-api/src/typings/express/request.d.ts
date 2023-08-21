declare module globalThis {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}
