# Simple Products Board

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

# Design
This project follows responsive design and fit to different size of screen and device on modern browsers.
Layout and UI is built based on Angular Material and fxFlex.
All of functions, such as sorting and searching is implemented manfully. 
No third-party library helps implemented functions.

# Components

## Product Card
Each product card presents a single product. 

Click on the card will show more details.

When Internet Connect is slow, a spinner will be shown to indicate that the picture of the product is loading.


## Product Page
A grid of [Product card]. Support pagination. 

At the bottom of the Product Page, there is a button to show more products, which could be useful to mobile phone user.

## Nav Side Bar
Click side bar button to sort the product in certain orders.
Click the triple lines at the title bar could open/close it.

## Top Search Box
Search by the name of products. Letter case is insensitive. 
Return a list of products if their names contain the searching key word.
Search results will be immediately present on the Product Page.

Performance searching only if the input stops for 500ms to avoid making query too frequently.

# Installation
Run `npm install` or `yarn install` to install supporting node modules.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
