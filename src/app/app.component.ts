import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsComponent } from './components/forms/forms.component';
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { Location } from './components/types/UnitTypes';
import { GetUnitsService } from './services/get-units.service';
import { LegendComponent } from './components/legend/legend.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FormsComponent,
    CardsListComponent,
    LegendComponent,
  ],
  providers: [GetUnitsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[] = [];

  constructor(private unitsService: GetUnitsService) {}

  onSubmit() {
    console.log('chegou no app.module');
    this.unitsList = this.unitsService.getFilteredUnits();
    this.showList.next(true);
  }
}
