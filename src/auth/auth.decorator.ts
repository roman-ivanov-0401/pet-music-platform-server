import { applyDecorators, CanActivate, ExecutionContext, ForbiddenException, UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../user/user.model";
import { UserModel } from "../user/user.model"

export class JwtAuthGuard extends AuthGuard("jwt") {}
export class AdminGuard implements CanActivate{
    constructor(
        private reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest<{user: UserModel}>()
        const user = request.user;
        if(!user.roles.includes(Role.admin)) throw new ForbiddenException("You have no rights");

        return user.roles.includes(Role.admin)
    }
}

export const Auth = (role: Role) => applyDecorators(
    role === Role.admin ? 
    UseGuards(JwtAuthGuard, AdminGuard) :
    UseGuards(JwtAuthGuard)
)