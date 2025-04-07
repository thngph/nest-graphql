import {
  Catch,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException();
      }
      case 'P2003': {
        throw new UnprocessableEntityException();
      }
      case 'P2025': {
        throw new NotFoundException();
      }
      default: {
        Logger.error(
          `PrismaClientExceptionFilter: ${exception.message}`,
          exception.stack,
          'PrismaClientExceptionFilter',
        );
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}
