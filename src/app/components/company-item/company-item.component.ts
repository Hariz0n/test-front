import { Component, Input } from '@angular/core';
import { CompanyResponseDto } from '../../dtos/CompanyResponseDto';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-company-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './company-item.component.html',
  styleUrl: './company-item.component.scss'
})
export class CompanyItemComponent {
  @Input() company!: CompanyResponseDto;
}
