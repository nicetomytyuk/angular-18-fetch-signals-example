import { Component, input } from '@angular/core';
import { Category } from '../../../../core/models/category.model';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories = input.required<Category[]>();
}
