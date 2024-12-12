// angular import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit{

  loginForm!: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ){}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/analytics']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  get isFormValid(): boolean {
    return this.loginForm.valid;
  }

  setLoginUser(){
    
    if(this.isFormValid){

      this.authService.login(this.loginForm.value)
      .then(() => {
        this.router.navigate(['/analytics']);
      })
      .catch(
        err => alert('Error: ' + err.message)
      );
      
    }
  }
}
