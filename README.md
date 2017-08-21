# express-typescript-boiler
Simple Typescript/Express/Mongo Boilerplate code
Just a simple boilerplate that I use on new projects.

Having Gulp installed globally is a prerequisite for using the boilerplate

### Running ```gulp``` does the following:
1. Transpiles the .ts server code to .js to /dist
2. Tranpiles, uglifies, and bundles the .ts files in the public folder to .js to /dist
3. Compiles the .sass files to .css to /dist
4. Copies all static files (like views and images)
5. Watches files for changes to recompile/transplie
6. Watches server files for changes and starts server


## Stack Used
* Typescript
* Node
* Express
* Gulp (Build Tool / LiveReload)
* EJS (View Engine)
* MongoDB (Not Added yet)
* Mongoose (For Schema Design)
* SASS

## TODOS
* Session management
* Simple DB setup
* Passportjs basic setup
* Simple views
* Add ESLint (Not Sure about this yet)