import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  //   canActivate(context: ExecutionContext): boolean {
  //     console.log('RolesGuard canActivate method called');
  //     console.log('RolesGuard canActivate method called', context);
  //     const roles = this.reflector.get<string[]>('roles', context.getHandler());
  //     if (!roles) return true; // No roles defined, access allowed

  //     const request = context.switchToHttp().getRequest();
  //     console.log('Request Headers:', request.headers);
  //     const token = request.headers.authorization?.split(' ')[1]; // Extract token

  //     if (!token) return false; // No token, access denied
  //     console.log('Token: ', token);
  //     try {
  //       const decodedToken = this.jwtService.verify(token); // Verify token
  //       console.log('decoded Token: ', decodedToken);
  //       const user = decodedToken; // Use the decoded token as the user

  //       return roles.includes(user.role); // Check if user role is allowed
  //     } catch (error) {
  //       return false; // Invalid token, access denied
  //     }
  //   }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract token

    if (!token) return false; // No token, access denied

    try {
      const decodedToken = this.jwtService.verify(token); // Verify token
      request.user = decodedToken; // Attach decoded token to request
      console.log('User req: ', request.user); //User details who generated the token
      console.log('Sub decoded: ', decodedToken.sub); // user id
      return true; // Token is valid, access allowed
    } catch (error) {
      return false; // Invalid token, access denied
    }
  }
}
