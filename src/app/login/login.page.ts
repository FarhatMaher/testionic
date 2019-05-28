import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
  loginForm: FormGroup;
  user = {username: '', password: ''};

    constructor(private userservice: UsersService, public viewCtrl: ModalController,
      private formBuilder: FormBuilder) {

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['',Validators.required],
   
      });
     }
  
    ngOnInit() {
    }

    
    onSubmit() {
    
 
   
    }

  login() {

      console.log(this.loginForm.value, this.user);
      this.user.username = this.loginForm.get('username').value;
      this.user.password = this.loginForm.get('password').value;
  
      this.userservice.getUser(this.user).subscribe(
        data => this.handel(data) ,
        error => console.log(error)
      ) ;
   
    }

    handel(user) {

      console.log("user"+ user);
         localStorage.setItem('token', user.access_token);
         localStorage.setItem('role', user.role);
         localStorage.setItem('id_client', user.id_client);
     
         this.viewCtrl.dismiss();
      
      

    }

}
