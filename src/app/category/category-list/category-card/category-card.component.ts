import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, HostBinding } from '@angular/core';
import { CategoryModel } from '@app/category/Models/category.model';
import { CategoryUIService } from '@app/category/Services/category-ui.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  @HostBinding("class.col-lg-12") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;
  
  categoryModel: CategoryModel;

  constructor(private categoryUIService: CategoryUIService) {
  }

  ngOnInit() {
  }

  getCategoryName(): string {
    return this.categoryModel.name;
  }

  getCategoryDescription(): string {
    return this.categoryModel.description;
  }

  getCategoryId(): string {
    return this.categoryModel.id;
  }

  setCategoryName(name: string) {
    this.categoryModel.name = name;
  }

  setCategoryDescription(description: string) {
    this.categoryModel.description = description;
  }

  selectCategoryCard() {
    this.categoryUIService.selectCategoryCard(this);
  }

}
