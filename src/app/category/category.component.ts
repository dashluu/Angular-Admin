import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { CategoryDataService } from '@app/category/Services/category-data.service';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from '@app/category/Models/category.model';
import { CategoryTableComponent } from '@app/category/category-table/category-table.component';
import { CategoryEditorComponent } from '@app/category/category-editor/category-editor.component';
import { CategoryUIService } from '@app/category/Services/category-ui.service';
import { CategoryMapperService } from '@app/category/Services/category-mapper.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryUIService: CategoryUIService) {

  }

  ngOnInit() {
    this.categoryUIService.setCategoryUI(this);
    this.categoryUIService.getCategories();
  }

  toggleMode() {
    let editBtn: HTMLElement = document.getElementById("edit-category-btn");
    editBtn.classList.toggle("mode-btn");
    editBtn.classList.toggle("mode-btn-inactive");

    let addBtn: HTMLElement = document.getElementById("add-category-btn");
    addBtn.classList.toggle("mode-btn");
    addBtn.classList.toggle("mode-btn-inactive");
  }

  addModeOn() {
    this.categoryUIService.addModeOn();
  }

  editModeOn() {
    this.categoryUIService.editModeOn();
  }

  submitCategory() {
    this.categoryUIService.submitCategory();
  }
}


