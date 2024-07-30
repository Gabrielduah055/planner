import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-pagination',
  standalone: true,
  imports: [



  ],
  templateUrl: './user-pagination.component.html',
  styleUrl: './user-pagination.component.css'
})
export class UserPaginationComponent {


  @Input() currentPage: number =  1
  @Input () total: number = 0
  @Input () limit: number = 10
  @Output () changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnit(): void{

    const pagesCount = Math.ceil(this.total/this.limit);
    console.log("pagesCount");

  }


}
