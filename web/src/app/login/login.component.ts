import { Component, OnInit } from '@angular/core';
  import { AuthService } from '../auth.service';
 import { User } from '../user';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 

  constructor(private authService: AuthService) { }
    get authenticated(): boolean {
      return this.authService.authenticated;
    }
    // The user
    get user(): User {
      return this.authService.user;
    }
  
    
  
    ngOnInit() {}
  
    // <signInSnippet>
    async signIn(): Promise<void> {
      await this.authService.signIn();
    }
    // </signInSnippet>

   
 
}
