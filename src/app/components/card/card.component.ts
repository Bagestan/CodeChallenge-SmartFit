import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../types/UnitTypes';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() unit!: Location;

  constructor() {}

  ngOnInit() {}
}
