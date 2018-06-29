import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CategoryModel } from '@app/category/Models/category.model';
import { CategoryUIService } from '@app/category/Services/category-ui.service';

@Component({
  selector: 'app-category-row',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.scss']
})
export class CategoryRowComponent implements OnInit, AfterViewChecked {
  @Input() categoryModel: CategoryModel;
  @ViewChild("categoryNameCell") categoryNameCellRef: ElementRef;
  @ViewChild("categoryDescriptionCell") categoryDescriptionCellRef: ElementRef;
  @ViewChild("categoryIdCell") categoryIdCellRef: ElementRef;

  categoryNameCell: HTMLElement;
  categoryDescriptionCell: HTMLElement;
  categoryIdCell: HTMLInputElement;

  constructor(private categoryUIService: CategoryUIService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.categoryNameCell = <HTMLElement>this.categoryNameCellRef.nativeElement;
    this.categoryDescriptionCell = <HTMLElement>this.categoryDescriptionCellRef.nativeElement;
    this.categoryIdCell = <HTMLInputElement>this.categoryIdCellRef.nativeElement;
  }

  getCategoryName(): string {
    return this.categoryNameCell.innerHTML;
  }

  getCategoryDescription(): string {
    return this.categoryDescriptionCell.innerHTML;
  }

  getCategoryId(): string {
    return this.categoryIdCell.value;
  }

  setCategoryName(name: string) {
    this.categoryNameCell.innerHTML = name;
  }

  setCategoryDescription(description: string) {
    this.categoryDescriptionCell.innerHTML = description;
  }

  selectRow() {
    this.categoryUIService.selectCategoryRecord(this);
  }

}
