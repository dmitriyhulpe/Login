# Fullstack JWT Login Form
This repository includes backend part using NodeJS and MongoDB and likewise frontend using React JS and TypeScript.
This form application can be used in any SPA. And it has several features such as:
* Registration and login with access and refresh tokens.
* Simple email validation.
* Account confirmation via email.
* Test function to get all users if you are logged in.


## Backend Stack Technologies and Dependencies
* NodeJS
* Express
* MongoDB
* Mongoose
* Nodemailer
* Uuid
* JsonWebToken
* Cors
* Bcrypt

## Frontend Stack Technologies
* ReactJS
* TypeScript
* Axios
* MobX

## Steps during the development

* Create new project with two folders. Server and Client.
* Inside the first one deploy the index.js file.
* Initialize with node package manager. npm init -y to create package.json file.
* Install all necessary dependencies. npm install. For example use @2.1.5 to install needed version of the package.
* Create a database.
* Develop server part.
* After backend go into client folder and deploy react app with typescript template.
* Develop client part.

## How to load script?

* Download zip archive.
* Install all necessary dependencies. npm install.
* Create database using MongoDB.
* Place the connection string inside .env file and change other variables such as email port host etc.
* Run script using command npm run develop for server. For client use npm start.
