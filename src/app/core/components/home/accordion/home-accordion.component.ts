import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Faqs } from '../../../Interface/Home/accordion';
import { homeConstants } from '../home-text';

@Component({
  selector: 'app-home-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-accordion.component.html',
  styleUrl: './home-accordion.component.css'
})
export class HomeAccordionComponent {

  constant = homeConstants

  toggle(faq:any):void {
    faq.open = !faq.open
  }
}
