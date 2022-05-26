# GUI project - Pillow

## Running the project

`npm i`  
`ng serve`

## Running the db

`json-server --watch db.json`

## What is Pillow?

Pillow is a project for my subject GUI development.  
Pillow is heavily inspired by [Blanket](https://github.com/rafaelmardojai/blanket). Pillow sets out to be web driven and allow for more customizability in terms of custom sounds and presets.  
Presets and filters easy to use and access.

![Main screen of Pillow](screenshots/pillow-main-screen.png)  
*Main screen interface of Pillow*

![Responsive screen of Pillow](screenshots/pillow-responsive.jpg)
*Responsive variation of the main interface*

![Edit categories](screenshots/pillow-categories.png)  
*Edit categories*

## Requirements

Requirements for the project (excluding studies, design etc) are as following:

- [X] At least 4 self-made angular components (excludes app-component)
- [X] Atleast 1 self-made service
  - Audio service to handle audio requests
  - Data service to make use of the database
- [X] Atleast 2 routes, where one has routing parameters
  - Root goes to the main app
  - About page for more information
  - Status-code route with parameter to show the status code
- [X] Atleast 1 self-made pipe
  - 2 pipes for filtering categories and sounds
- [X] Make sure to use atleast edit, add and delete functions
  - The data service contains funtions to create, edit and delete sounds and presets
- [X] Make use of a simple database to store information. This may be json.db but any other is also allowed
  - For ease of use I decided to use json-server for quick development. I might switch this for an API in a fork later to support sound uploading.
