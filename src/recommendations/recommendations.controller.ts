import { Controller, Get, Query } from '@nestjs/common';
import { Role, UserModel } from '../user/user.model';
import { User } from '../user/decorators';
import { RecommendationsService } from './recommendations.service';
import { Auth } from '../auth/auth.decorator';

@Controller('recommendations')
export class RecommendationsController {
    constructor(
        private readonly recommendationsService: RecommendationsService
    ){}

    @Auth(Role.user)
    @Get("foryou")
    forYou(
        @User() user: Omit<UserModel, "password">,
        @Query("limit") limit: number = 6
    )
    {
        return this.recommendationsService.forYou(user._id, limit)
    }
}
