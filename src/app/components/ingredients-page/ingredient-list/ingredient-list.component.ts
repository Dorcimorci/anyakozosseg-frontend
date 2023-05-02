import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../ingredient-model/ingredient.model';
import { PageAction } from '../../shared/enums';

/**
 * Component for displaying a list of ingredients.
 */
@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent {
  /**
   * Array of Ingredient objects to be displayed in the list.
   */
  @Input() ingredientList: Ingredient[] = [];

  /**
   * Function to be executed when an ingredient is read.
   * Default behavior is to navigate to the ingredient details page.
   */
  @Input() onRead: Function = (ingredient: Ingredient) =>
    this.router.navigate(['/ingredients/details', ingredient.id]);

  /**
   * Function to be executed when an ingredient is updated.
   * Default behavior is to navigate to the ingredient update form page.
   */
  @Input() onUpdate: Function = (ingredient: Ingredient) =>
    this.router.navigate([
      '/ingredients/form',
      PageAction.Update,
      ingredient.id,
    ]);

  /**
   * Function to be executed when an ingredient is deleted.
   * Default behavior is an empty function.
   */
  @Input() onDelete: Function = (_ingredientId: number) => {};

  /**
   * CSS class to be applied on hover for the ingredient icons.
   */
  @Input() hoverIconClass: string = '';

  /**
   * Page action to determine the behavior of the ingredient list component.
   * Default value is PageAction.Read.
   */
  @Input() pageAction: PageAction = PageAction.Read;

  /**
   * Enum for representing the PageAction value.
   */
  public get PageAction() {
    return PageAction;
  }

  constructor(private readonly router: Router) {}
}
