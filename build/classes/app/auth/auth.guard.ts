import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private authService: AuthService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		return this.checkLogin(url);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}

	checkLogin(url: string): boolean {
		console.log("checkLogin: " + this.authService.isLoggedIn);
		if (this.authService.isLoggedIn) { return true; }

		// Store the attempted URL for redirecting
		this.authService.redirectUrl = url;

		// Navigate to the login page with extras
		this.router.navigate(['/login']);
		return false;
	}
}
