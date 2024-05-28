import { Component, computed, inject } from '@angular/core';
import { MenuService } from './services/menu.service';
import { CategoryListComponent } from './components/category-list/category-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CategoryListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  service = inject(MenuService);
  
  categories = computed(() => this.service.state().data);
  isLoading = computed(() => this.service.state().loading);
  error = computed(() => this.service.state().error);

  ngOnInit() {
    this.service.loadMenu();
  }
}
