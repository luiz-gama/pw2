import type { UserTypes } from '../resources/userType/userType.constants';

declare module 'express-serve-static-core' {
  interface Request {
    session?: {
      userType?: UserTypes;
    };
  }
}
