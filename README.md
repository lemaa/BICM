# bicm
An example RESTful API .


# Getting Started

Clone the repo by using `git clone`.

Run `npm install` .

create .env file to suit your needs.

 
# Built With
Express  
Typescript
TypeOrm
Inversify
Tsoa

### project structure

app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   ├── stores
│       │   │   │   │   │   └── ReportsStore.js
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── components
│       │   │   │       └── index.js
│       │   │   ├── shared
│       │   │   │   └── stores
│       │   │   │       ├── AccountStore.js
│       │   │   │       └── UserStore.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── components
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       ├── components
│       │       │       └── index.js
│       │       └── index.js
│       ├── shared
│       │   └── components
│       │       ├── Avatar.js
│       │       └── Icon.js
│       └── index.js
├── shared
│   └── util
│       └── createStore.js
└── index.js


src
│   app.js          # App entry point
└───bin             # Express route starter file
└───config          # configuration related stuff
└───controllers     # Express route controllers for all the endpoints of the app
└───database 
    └───migrations  # Database migration files
    └───seeders     # Database seeders files
└───models          # Database models
└───repositories    # custom db repositories
└───routes          # tsoa swagger generated routes
└───services        # All the business logic is here
└───subscribers     # event subscribers 
└───types           # typescript custom types 
└───utils           # common helper classes

### Running Dev Server

Run on your terminal `npm run watch:dev`, the server will restart everytime we make a change in our code.

### Running Production Server

run `npm run start`

### Other scripts

* `transpile` - convert typescript and beyond code to es5 to a folder named `build`
* `clean` - delete transpiled folder
* `build` - clean and transpile
* `generate:swagger` - to generate swagger routes
* `migration:dev` - run migrations

# Versioning
For the versions available, see the tags on this repository.

# Authors
Amell Fezai - Initial work
 
# License
This project is licensed under the MIT License - see the LICENSE.md file for details