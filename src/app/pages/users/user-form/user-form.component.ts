import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.userForm = this.fb.group({
      id: 0,
      firstName: '',
      lastName: '',
      age: '',
      profession: '',
    })
  }

  ngOnInit(): void {
    this.getUsers()
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id')
      if (this.userId) {
        this.userService.retrieveById(this.userId).subscribe(result => {
          this.userForm.patchValue({
            id: result[0].id,
            firstName: result[0].firstName,
            lastName: result[0].lastName,
            age: result[0].age,
            profession: result[0].profession,
          })
        })
      }
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

  addUser() {
    this.userForm.get('id')?.patchValue(this.users.length + 1)
    this.userService.postUser(this.userForm.value).subscribe(result => {
      console.log(`Dados cadastrados: ${this.userForm}`)
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/']);
    })
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe(result => {
      console.log('Usuário atualizado com sucessor', result);
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/']);
    })
  }

  actionButton() {
    if (this.userId) {
      this.updateUser()
    } else {
      this.addUser();
    }
  }

}
