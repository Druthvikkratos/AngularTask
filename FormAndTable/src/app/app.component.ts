import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
  });
  formData: any = {};
  submittedData: any[] = [];
  editData: boolean = false;
  editedIndex: number = -1;
  submitted = false;
  gender: any = ['Male', 'Female'];
  displayedColumns: string[] = [
    'name',
    'address',
    'email',
    'phone',
    'gender',
    'actions',
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        Validators.required,
        Validators.pattern('^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$'),
      ],
      gender: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  changeGender(e: any) {
    console.log(e.value);
    this.gender.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.editData) {
      this.submittedData[this.editedIndex] = { ...this.formData };
      this.editData = false;
      this.formData = {};
    } else {
      this.submittedData.push({ ...this.formData });
      this.formData = {};
    }
  }

  editSavedData(index: number) {
    this.formData = { ...this.submittedData[index] };
    this.editData = true;
    this.editedIndex = index;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
