// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

// export class EditComponent {
//   http = inject(HttpClient);
//   route = inject(ActivatedRoute); // Inject ActivatedRoute

//   userlistt: any = {
//     id: null,
//     name: '',
//     email: '',
//     phone: '',
//     salary: ''
//   };

//   constructor() {
//     const employeeId = this.route.snapshot.paramMap.get('id'); // Get ID from route
//     if (employeeId) {
//       this.getEmployee(employeeId);
//     }
//   }

//   getEmployee(id: string) {
//     this.http.get(`http://localhost:5008/api/Employee/${id}`).subscribe({
//       next: (res: any) => {
//         this.userlistt = res; // Populate the form with employee data
//       },
//       error: (err) => {
//         console.error('Error fetching employee:', err);
//       }
//     });
//   }

//   // ... (rest of the component)
// }
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);

  userlistt: any = {
    name: '',
    email: '',
    phone: '',
    salary: 0
  };

  constructor() {
    const employeeId = this.route.snapshot.paramMap.get('id'); // Get the ID from route params
    if (employeeId) {
      this.getEmployee(employeeId);
    }
  }

  getEmployee(id: string) {
    this.http.get(`http://localhost:5008/api/Employee/${id}`).subscribe({
      next: (res: any) => {
        this.userlistt = res; 
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
      }
    });
  }


  
  updateEmployee() {
    if (this.userlistt.id) {
      this.http.put(`http://localhost:5008/api/Employee/${this.userlistt.id}`, this.userlistt).subscribe({
        next: () => {
          console.log("Update Successful");
          // Optionally redirect or show a success message
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        }
      });
    } else {
      console.error('No ID found for the employee to update.');
    }
  }
}
