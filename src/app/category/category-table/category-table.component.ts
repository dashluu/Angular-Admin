import { Component, OnInit, ComponentFactoryResolver, ViewChild, ComponentRef, ViewContainerRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { CategoryModel } from '@app/category/Models/category.model';
import { CategoryRowComponent } from '@app/category/category-table/category-row/category-row.component';
import { CategoryUIService } from '@app/category/Services/category-ui.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {
  @ViewChild('categoryTableVar', { read: ViewContainerRef }) container: any;
  componentRef: ComponentRef<CategoryRowComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private categoryUIService: CategoryUIService) {
  }

  ngOnInit() {
    this.categoryUIService.setCategoryTable(this);
  }

  // ngOnDestroy() {
  //   if (this.componentRef !== null) {
  //     this.componentRef.destroy();
  //   }
  // }

  createRow(categoryModel: CategoryModel) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CategoryRowComponent);
    this.componentRef = this.container.createComponent(componentFactory);
    this.componentRef.instance.categoryModel = categoryModel;
  }
}
