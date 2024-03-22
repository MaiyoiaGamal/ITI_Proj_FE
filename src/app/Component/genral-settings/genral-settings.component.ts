import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genral-settings',
  templateUrl: './genral-settings.component.html',
  styleUrls: ['./genral-settings.component.css']
})
export class GenralSettingsComponent implements OnInit {
  
  getdata: any;
  Formdata: FormGroup;
  maxCheckboxLimit = 2;
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private fb: FormBuilder, private service: EmplyeeServiceService ,) {
    // plus: ['', [Validators.required,this.valueRangeValidator.bind(this)]],
      // late: ['', [Validators.required,this.valueRangeValidator.bind(this)]],
    this.Formdata = this.fb.group({
      plus: ['', [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern(/^\d+$/)]],
      late: ['', [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern(/^\d+$/)]],
      sunday: [false],
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false]
    });
  }
  valueRangeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value) || value < 1 || value > 20) {
      return { range: true };
    }
    return null;
  }

  onCheckboxChange(checkboxName: string): void {
    const checkedBoxes = Object.values(this.Formdata.value).filter(value => value === true).length;
    if (checkedBoxes > this.maxCheckboxLimit) {
      this.Formdata.controls[checkboxName].setValue(false);
    }
  }
  



  ngOnInit(): void {
    this.service.getGenralSettings().toPromise()
      .then(data => {
        this.getdata = data;
        console.log(this.getdata[0]);
        this.Formdata.patchValue({
          plus: this.getdata[0].plus,
          late: this.getdata[0].late,
          sunday: this.getdata[0].holidayDayOne === 0 || this.getdata[0].holidayDayTwo === 0,
          monday: this.getdata[0].holidayDayOne === 1 || this.getdata[0].holidayDayTwo === 1,
          tuesday: this.getdata[0].holidayDayOne === 2 || this.getdata[0].holidayDayTwo === 2,
          wednesday: this.getdata[0].holidayDayOne === 3 || this.getdata[0].holidayDayTwo === 3,
          thursday: this.getdata[0].holidayDayOne === 4 || this.getdata[0].holidayDayTwo === 4,
          friday: this.getdata[0].holidayDayOne === 5 || this.getdata[0].holidayDayTwo === 5,
          saturday: this.getdata[0].holidayDayOne === 6 || this.getdata[0].holidayDayTwo === 6
        });
      })
      .catch(error => {
        console.error('Error occurred while fetching general settings:', error);
      });
    
  }

 
  get plus() {
    return this.Formdata.get('plus');
  }

  get late() {
    return this.Formdata.get('late');
  }


  get sunday() {
    return this.Formdata.get('sunday');
  }

  get monday() {
    return this.Formdata.get('monday');
  }

  get tuesday() {
    return this.Formdata.get('tuesday');
  }

  get wednesday() {
    return this.Formdata.get('wednesday');
  }

  get thursday() {
    return this.Formdata.get('thursday');
  }

  get friday() {
    return this.Formdata.get('friday');
  }

  get saturday() {
    return this.Formdata.get('saturday');
  }

  onSubmit(): void {
    console.log(this.Formdata.value);
    const updatedSettings = { ...this.getdata };

    updatedSettings.plus = this.Formdata.value.plus;
    updatedSettings.late = this.Formdata.value.late;
  
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const selectedWeekdays = weekdays.filter(day => this.Formdata.value[day]);
    const dayOfWeekMap: { [key: string]: number } = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6
    };
        const holidayDayOneIndex = selectedWeekdays.length > 0 ? dayOfWeekMap[selectedWeekdays[0]] : null;
        const holidayDayTwoIndex = selectedWeekdays.length > 1 ? dayOfWeekMap[selectedWeekdays[1]] : null;
 
      updatedSettings.holidayDayOne = holidayDayOneIndex != null ? holidayDayOneIndex : null;
      updatedSettings.holidayDayTwo = holidayDayTwoIndex != null ? holidayDayTwoIndex : null;
      
      console.log(updatedSettings.plus);
      console.log(updatedSettings.late);
      console.log(updatedSettings.holidayDayOne);
      console.log(updatedSettings.holidayDayTwo);
      console.log(updatedSettings)
  
    this.service.postGenralSettings(updatedSettings).subscribe(
      () => {
        Swal.fire('Success','Settings saved successfully',"success");
        
      },
      (error) => {
        console.log(error)
        Swal.fire("Error",'Error occurred while saving settings try again:',"error");
      }
    );
  }
  onSubmit2(): void {
    const updatedSettings = { ...this.getdata }; // Clone the existing settings
  
    // Assign the values from the form controls to the updatedSettings object
    updatedSettings.plus = this.Formdata.value.plus;
    updatedSettings.late = this.Formdata.value.late;
  
    // Map selected weekdays to their corresponding indices (0 for Sunday, 1 for Monday, etc.)
    const selectedWeekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      .filter(day => this.Formdata.value[day])
      .map(day => ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day));
  
    // Store the selected weekday indices in the updatedSettings object
    updatedSettings.holidayDayOne = selectedWeekdays.length > 0 ? selectedWeekdays[0] : null;
    updatedSettings.holidayDayTwo = selectedWeekdays.length > 1 ? selectedWeekdays[1] : null;
  
    // Send the updatedSettings object to the backend API for saving
    this.service.postGenralSettings(updatedSettings).subscribe(
      () => {
        // On successful response, display success message
        Swal.fire('Success', 'Settings saved successfully', 'success');
      },
      (error) => {
        // On error response, display error message
        console.log(error);
        Swal.fire('Error', 'Error occurred while saving settings', 'error');
      }
    );
  }
  






}

