import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, HostBinding } from '@angular/core';
import { CategoryModel } from '@app/category/Models/category.model';
import { CategoryUIService } from '@app/category/Services/category-ui.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit, AfterViewChecked {
  @HostBinding("class.col-lg-12") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;
  
  @Input() categoryModel: CategoryModel;
  @ViewChild("categoryNameContainer") categoryNameContainerRef: ElementRef;
  @ViewChild("categoryDescriptionContainer") categoryDescriptionContainerRef: ElementRef;

  categoryNameContainer: HTMLElement;
  categoryDescriptionContainer: HTMLElement;

  constructor(private categoryUIService: CategoryUIService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.categoryNameContainer = <HTMLElement>this.categoryNameContainerRef.nativeElement;
    this.categoryDescriptionContainer = <HTMLElement>this.categoryDescriptionContainerRef.nativeElement;
  }

  getCategoryName(): string {
    return this.categoryNameContainer.innerHTML;
  }

  getCategoryDescription(): string {
    return this.categoryDescriptionContainer.innerHTML;
  }

  getCategoryId(): string {
    return this.categoryModel.id;
  }

  setCategoryName(name: string) {
    this.categoryNameContainer.innerHTML = name;
  }

  setCategoryDescription(description: string) {
    this.categoryDescriptionContainer.innerHTML = description;
  }

  selectCategoryCard() {
    this.categoryUIService.selectCategoryCard(this);
  }

}
