#Intra Watcher

### ABOUT

Watch Epitech intra's API
Subscribe you to any new module
Send an email + web notification if success

### USING

- Node.js
- ESLint with ECMAScript 6 (https://github.com/eslint/eslint)
- Babel node (https://babeljs.io/docs/usage/cli/)
- Code norm : airbnb-base (https://github.com/airbnb/javascript)
- AWS Lambda functions (https://aws.amazon.com/fr/lambda/faqs/)
- Serverless to deploy the project (https://serverless.com/)
 
### HOW TO INITALISE THE SERVERLESS PROJECT

1. install serverless (https://serverless.com/)
2. git clone https://github.com/eole1712/IntraWatcher
3. cd IntraWatcher
4. npm i
5. open serverless.yml and replace 
    - service
    - profile (http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
    - region
6. add your functions
7. sls deploy

### HOW TO CONFIGURE INTRA WATCHER

create src/intra/config.json

it should contains

        {
          "url": "INTRANET AUTO-LOGIN URL",   // REQUIRED
          "excluded_modules": ["MODULE ID"], // REQUIRED
          "token": "PHPSESSID=INTRANET TOKEN;", // OPTIONAL
          "intra_year": "SCHOOL YEAR", // REQUIRED
          "intra_city": "INTRA LOCATION", // REQUIRED (example : FR/PAR)
          "push": {
            "projectId": INTEGER, // PUSH NOTIFICATION ID
            "authToken": "STRING" // PUSH NOTIFICATION TOKEN
          }, // OPTIONAL
          "email": {
            "smtp": "smtps://EMAIL:PASSWORD@smtp.gmail.com", // SMTP
            "email": "EMAIL TO SENT" // EMAIL
          } // OPTIONAL
        }
        
### TODO
- add minimum first session interval
    example : not subscribe to any module when the first session begins 48 hours before now
- add sms notification
- add automatic cancelling of the subscription before the limit date if not confirmed by the user (email confirmation or POST request to a specific gateway url ?)

### TO CONTRIBUTE

Start by contact me / open an issue. We can talk about it.
> https://www.facebook.com/litgreycat
