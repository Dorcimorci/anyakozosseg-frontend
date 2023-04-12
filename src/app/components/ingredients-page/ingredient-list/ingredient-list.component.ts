import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { PageAction } from '../../shared/enums';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent {
  @Input() ingredientList: Ingredient[] = [];
  @Input() onRead: Function = (ingredient: Ingredient) =>
    this.router.navigate(['/ingredients/details', ingredient.id]);
  @Input() onUpdate: Function = (ingredient: Ingredient) =>
    this.router.navigate([
      '/ingredients/form',
      PageAction.Update,
      ingredient.id,
    ]);
  @Input() onDelete: Function = (ingredientId: number) => {};
  @Input() hoverIconClass: string = '';
  @Input() pageAction: PageAction = PageAction.Read;

  public get PageAction() {
    return PageAction;
  }

  constructor(private readonly router: Router) {}
}
