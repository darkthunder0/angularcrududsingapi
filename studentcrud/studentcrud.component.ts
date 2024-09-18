import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentcrud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css']  
})
export class StudentcrudComponent {
  constructor(private http: HttpClient, private router: Router) {
    
  }
  


  userlist: any[] = [];  

  userlistt: any = {
    name: '',
    email: '',
    phone: '',
    salary: ''
  };

  getEmployee() {
    this.http.get("http://localhost:5008/api/Employee").subscribe({
      next: (res: any) => {
        this.userlist = res;
        console.log(res);
        console.log(this.userlist);
      },
      error: (err) => {
        console.error('Error fetching employees:', err);  
      }
    });
  }


  editEmployee(employee: any) {
    this.userlistt = { ...employee }; 
  }

  deleteEmployee(id: number) {
    debugger
    this.http.delete(`http://localhost:5008/api/Employee/${id}`).subscribe({
      next: () => {
        console.log("Delete Successful");
        this.getEmployee(); 
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
      }
    });
  }


  updateEmployee() {
   

    this.http.put(`http://localhost:5008/api/Employee/${this.userlistt.id}`, this.userlistt).subscribe({
      next: () => {
        console.log("Update Successful");
        this.getEmployee(); 
      },
      error: (err) => {
        console.error('Error updating employee:', err);
      }
    });
  }

  
  addemployee() {
    console.log(this.userlistt);
    this.http.post("http://localhost:5008/api/Employee", this.userlistt).subscribe({
      next: (res) => {
        console.log("Post Successful");
 
        this.getEmployee();
      },
      error: (err) => {
        console.error('Error adding employee:', err);  
      }
    });
  }
  EditRoute(){
    debugger
    this.router.navigateByUrl("edit-api")
  }
}



