# InterviewProject
Interview project for fitillion

• Build a Github client showing the latest changes for a developer
• Add ability to do a simple search across their changes
• Finally, give the option to mark as Read Later, and give the ability to see these items later
• You can choose the tech - there is no 1 right way. Keep it simple

To run the project 

docker-compose -f docker-compose.yml up --build --remove-orphans
docker-compose -f docker-compose.yml up --build 
docker-compose -f docker-compose.yml up



# To Run Client
`cd apps/client/my-github-client/package.json`
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd my-github-client
  npm start

Happy hacking!