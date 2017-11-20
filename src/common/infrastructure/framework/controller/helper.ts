import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

export const notFound = <ID extends number | string>(id: ID) => (): never => {
    throw new HttpException(`Matrix with id = ${ id } not found`, HttpStatus.NOT_FOUND);
};
