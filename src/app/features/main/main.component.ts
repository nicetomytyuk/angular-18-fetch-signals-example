import { Component, computed, inject } from '@angular/core';
import { CategoryService } from './services/category.service';
import { CategoryListComponent } from './components/category-list/category-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CategoryListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  service = inject(CategoryService);
  
  categories = computed(() => this.service.state().data);
  isLoading = computed(() => this.service.state().loading);
  error = computed(() => this.service.state().error);

  ngOnInit() {
    this.service.loadData();
  }

  onRemove(name: string) {
    this.service.removeItem(name);
  }

  onAdd() {
    this.service.addItem();
  }
}
