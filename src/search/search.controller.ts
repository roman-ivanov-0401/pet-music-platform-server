import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService
    ){}

    @Get()
    search(@Query("searchTerm") searchTerm: string){
        return this.searchService.search(searchTerm)
    }
}
