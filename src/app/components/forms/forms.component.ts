import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GetUnitsService } from '../../services/get-units.service';
import { LocationData } from '../types/UnitTypes';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [GetUnitsService],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  results: LocationData[] = [];
  fileteredResults: LocationData[] = [];
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });

    this.unitService.getAllUnits().subscribe((data) => {
      this.results = data.locations;
    });
  }

  onSubmit() {
    if (!this.form.value.showClosed) {
      this.fileteredResults = this.results.filter(
        (location) => location.opened === true
      );
    } else {
      this.fileteredResults = this.results;
    }
  }

  onClean() {
    this.form.reset();
  }
}
