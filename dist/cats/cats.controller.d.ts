import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
export declare class CatsController {
    private catService;
    constructor(catService: CatsService);
    create(createCatDto: CreateCatDto): void;
    findAll(): Promise<Cat[]>;
    findWild(): string;
    getDocs(version: any): {
        url: string;
    };
    findOne(params: any): string;
}
