# Internet and Applications Appathon

## Youtube Link
https://youtu.be/h_pdOxZ190Y
## Requirements

For development, you will only need Node.js,PostgreSQL and a node global package installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version

    $ npm --version

If you need to update `npm`, you can make it using `npm`! After running the following command, just open again the command line and be happy.



## Running the backend

    $ cd /back-end
    Configure postgreSQL credentials and database name in /back-end/database.js
    Import db.tar into postgreSQL
    $ npm install
    $ npm start

## Running the frontend

    $ cd /front-end
    $ npm install
    $ npm start
    
    


