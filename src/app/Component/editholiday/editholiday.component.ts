import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editholiday',
  templateUrl: './editholiday.component.html',
  styleUrls: ['./editholiday.component.css']
})
export class EditholidayComponent implements OnInit {
  holidayId: number=0;
  editedHoliday: any = {};
  constructor( private route: ActivatedRoute,
    private router: Router,
    private holidayService:EmplyeeServiceService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.holidayId = +params['id']; // استخراج معرف العطلة من الرابط
      this.loadHolidayDetails(this.holidayId); // تحميل تفاصيل العطلة
    });
  }
  loadHolidayDetails(id: number): void {
    this.holidayService.getHolidayById(id)
      .subscribe(
        (holiday) => {
          this.editedHoliday = holiday; // تحميل تفاصيل العطلة إلى النموذج
        },
        (error) => {
          console.error('Error loading holiday details:', error);
          // يمكنك تنفيذ منطق لمعالجة الخطأ هنا
        }
      );
  }

  updateHoliday(): void {
    this.holidayService.updateHoliday(this.holidayId, this.editedHoliday)
      .subscribe(
        (response) => {
          Swal.fire('Success', 'Employee updated successfully!', 'success');
          // Navigate to the "/Holiday" route after the form submission is successful
          this.router.navigateByUrl('/Holiday');
        },
        (error) => {
          console.error('Error updating employee:', error);
          Swal.fire('Error', 'Failed to update employee. Please try again.', 'error');
        }
      );
  }}

