import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../types/UnitTypes';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [GetUnitsService, FilterUnitsService],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<void>();
  results: Location[] = [];
  filteredResults: Location[] = [];
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private getUnit: GetUnitsService,
    private filterUnits: FilterUnitsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });

    this.getUnit.getAllUnits().subscribe((data) => {
      this.results = data;
      this.filteredResults = data;
    });
  }

  onSubmit() {
    let { showClosed, hour } = this.form.value;
    this.filteredResults = this.filterUnits.filter(
      this.results,
      showClosed,
      hour
    );

    this.getUnit.setFilteredUnits(this.filteredResults);

    this.submitEvent.emit();
  }

  onClean() {
    this.form.reset();
  }
}
