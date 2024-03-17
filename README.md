# InterviewProject
Interview project for fitillion

• Build a Github client showing the latest changes for a developer
• Add ability to do a simple search across their changes
• Finally, give the option to mark as Read Later, and give the ability to see these items later
• You can choose the tech - there is no 1 right way. Keep it simple

# To run the project 
# Note you need 2 terminals and docker installed

# To Run API
# Terminal 1
# At root of project run the following in 

`npm install`

# To build the project
`docker-compose -f docker-compose.yml up --build --remove-orphans`

# To rerun project after been stopped
`docker-compose -f docker-compose.yml up`

# Note any .env changes will require a rebuild



# To Run Client
# Terminal 2

Navigate to the directory
`cd apps/client/my-github-client`
where the file package.json is located.

Run
`npm install`

Then run
  `npm start`
  To start the development server.

# Note for the .env files
Please note you need update the TOKEN is api.env file.
The following variables are place holders for default DB.
OWNER=GabrielPora
REPOS=CodeWars

# For crashes
If api crashes. I added hotreloading to it. you just need to save any file and the api will hot reload.