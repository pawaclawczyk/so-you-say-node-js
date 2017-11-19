import { ArgumentMetadata, HttpStatus, Pipe, PipeTransform } from "@nestjs/common";
import { HttpException } from "@nestjs/core";

@Pipe()
export class ParseIntPipe implements PipeTransform<string> {
    public transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);

        if (isNaN(val)) {
            throw new HttpException("Validation failed", HttpStatus.BAD_REQUEST);
        }

        return val;
    }
}
