declare global {
  namespace Express {
    interface Request {
      validatedBody: object;
      validatedUser: object | null;
      validatedAddress: object;
      validatedId: string;
    }
  }
}

export {};
