# Auth Boilerplate

> Some starter code to start developing web apps with authentication.

Contains password reset and email activation functionality. 

## Development Workflow

Having Docker and docker-compose installed run `docker-compose up`. This will expose:

- Client application in development mode on port `localhost:3000`
- API server in development mode on port `localhost:8080`
- [MailHog](https://github.com/mailhog/MailHog) front-end on port `localhost:8025`

## Deployment

This repo contains CircleCI configuration to automatically deploy API server to Heroku and upload static files to the S3 bucket.

Following environment variables need to be configured in CircleCI console for build and deployment to work:

- `PUBLIC_URL`: Front-end URL.
- `REACT_APP_API_URL`: API URL including `/api` suffix.
- `HEROKU_APP_NAME`: Name of your heroku application.
- `HEROKU_API_KEY`: API Key obtained from [Account Management](https://dashboard.heroku.com/account/applications) console.

In addition to the above, Heroku application must be configured with following environment variables:

- `DATABASE_URL`: PostgreSQL credentials, configured automatically when using [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) addon.
- `REDIS_URL`: Redis server credentials, configured automatically when using [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) addon.
- `SMTP_URL`: SMTP server credentials in form `smtp(s)://<login>:<password>@<host>:<port>`.
