import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }


  public getUsername(): string {

    if(!this.isAuthenticated()) return null;

    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = JSON.parse(atob(payload));
    const username = payloadDecoded.sub;

    return username;
  }

  public isAdmin(): boolean {

    if(!this.isAuthenticated()) return false;

    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = JSON.parse(atob(payload));
    const roles = payloadDecoded.roles;

    if(roles.indexOf('ROLE_ADMIN') < 0){
      return false;
    }

    return true;
  }

  public isProfesor(): boolean {

    if(!this.isAuthenticated()) return false;

    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = JSON.parse(atob(payload));
    const roles = payloadDecoded.roles;

    if(roles.indexOf('ROLE_PROFESOR') < 0){
      return false;
    }

    return true;
  }

  public isEstudiante(): boolean {

    if(!this.isAuthenticated()) return false;

    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = JSON.parse(atob(payload));
    const roles = payloadDecoded.roles;

    if(roles.indexOf('ROLE_ESTUDIANTE') < 0){
      return false;
    }

    return true;
  }


  public isAuthenticated(): boolean {
    if(this.getToken()){
      return true;
    }else{
      return false;
    }
  }
}
