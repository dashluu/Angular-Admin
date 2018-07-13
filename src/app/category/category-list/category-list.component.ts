import { Component, OnInit, ComponentFactoryResolver, ViewChild, ComponentRef, ViewContainerRef, HostBinding } from '@angular/core';
import { CategoryModel } from '@app/category/Models/category.model';
import { CategoryCardComponent } from '@app/category/category-list/category-card/category-card.component';
import { CategoryUIService } from '@app/category/Services/category-ui.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryDataService } from '@app/category/Services/category-data.service';
import { CategoryMapperService } from '@app/category/Services/category-mapper.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @HostBinding("class.col-lg-7") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;
  
  @ViewChild('categoryListContainer', { read: ViewContainerRef }) categoryListContainer: any;
  componentRef: ComponentRef<CategoryCardComponent>;

  subscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private categoryDataService: CategoryDataService,
    private categoryMapperService: CategoryMapperService,
    private categoryUIService: CategoryUIService
  ) 
  {
  }

  ngOnInit() {
    this.categoryUIService.setCategoryList(this);
    
    let observableObject: Observable<Object> = this.categoryDataService.getCategories();

    this.subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        let categoryModels: CategoryModel[] = this.categoryMapperService.mapCategoryModelsServerToClient(object["data"]);
        let categoryModelCount: number = categoryModels.length;

        for (let i: number = 0; i < categoryModelCount; i++) {
          let categoryModel: CategoryModel = categoryModels[i];
          this.createCategoryCard(categoryModel);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.componentRef !== undefined) {
      this.componentRef.destroy();
    }

    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  createCategoryCard(categoryModel: CategoryModel) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CategoryCardComponent);
    this.componentRef = this.categoryListContainer.createComponent(componentFactory);
    this.componentRef.instance.categoryModel = categoryModel;
  }
}
