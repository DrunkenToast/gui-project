import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isLoggedInOrNavigate();
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isLoggedInOrNavigate();
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isLoggedInOrNavigate();
    }

    private isLoggedInOrNavigate(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.auth.user.pipe(take(1))
                .subscribe((u) => {
                    if (u) {
                        resolve(true);
                    }
                    else {
                        this.router.navigate(['/login']);
                        resolve(false);
                    }
                })

        })
    }

}
