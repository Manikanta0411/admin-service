import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { ROLES_KEY } from './roles.decorator';

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
    const requiredRoles = this.reflector.get<string>(ROLES_KEY, context.getHandler());
    console.log("Required Role:", requiredRoles);
  
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No role required, access allowed
    }
  
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract token
  
    if (!token) {
      return false; // No token, access denied
    }
  
    try {
      const decodedToken = this.jwtService.verify(token); // Verify token
      const user = decodedToken; // Use the decoded token as the user
  
      console.log('User who generated the token:', user);
      console.log('Required Role:', requiredRoles);
  
      // Check if user has the required role
      if (requiredRoles.includes(user.role)) {
        console.log("Entered true")
        return true; // User has the required role, access allowed
      } else {
        console.log("Entered false")
        return false; // User does not have the required role, access denied
      }
    } catch (error) {
      return false; // Invalid token, access denied
    }
  }
  
}
