import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service'; // Importing the service
import Swal from 'sweetalert2'; // Importing SweetAlert2 for showing alerts

@Component({
  selector: 'app-addnewholiday',
  templateUrl: './addnewholiday.component.html',
  styleUrls: ['./addnewholiday.component.css']
})
export class AddnewholidayComponent implements OnInit {
  holidayForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private holidayService:EmplyeeServiceService) {
    this.holidayForm = this.formBuilder.group({
      holidayName: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get holidayName() {
    return this.holidayForm.get('holidayName');
  }

  get date() {
    return this.holidayForm.get('date');
  }

  addHoliday(): void {
    if (this.holidayForm.invalid) {
      return;
    }
  
    const holidayData: any = this.holidayForm.value;
  
    this.holidayService.addHoliday(holidayData).subscribe(
      () => {
        Swal.fire('Success', 'Holiday added successfully!', 'success');
        this.holidayForm.reset();
      },
      (error: any) => {
        console.error('An error occurred while adding Holiday:', error);
        let errorMessage = 'Failed to add Holiday. Please try again.';
        if (error.status === 409) {
          errorMessage = 'Holiday with the same name already exists.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message; // تحديد الرسالة من الخطأ الذي يتم استرجاعه من الخادم
        }
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }
  
  onsubmit(): void {
    this.addHoliday();
  }


}

