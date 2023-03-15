# Anyakozosseg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Steps for getting updates from the current develop branch

On the frontend side:

- Stash your work if you have local changes
- Checkout the develop branch
- Fetch
- Pull
- Run `npm i`

On the backend side:

- Stash your work if you have local changes
- Checkout the develop branch
- Fetch
- Pull
- Backup (export) your database in phpMyAdmin
- Run the following query in a phpMyAdmin SQL console:  
  `DROP DATABASE mother_community;`
- Within phpMyAdmin Import the `Database/mother_community.sql` file from your local backend repository

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
