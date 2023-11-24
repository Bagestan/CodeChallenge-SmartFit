import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../types/UnitTypes';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  providers: [GetUnitsService],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css',
})
export class CardsListComponent implements OnInit {
  @Input() unitsList: Location[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.unitsList);
  }
}
