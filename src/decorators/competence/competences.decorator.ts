import { SetMetadata } from '@nestjs/common';

export const Competences = (...args: string[]) =>
  SetMetadata('competences', args);
