# Auth Boilerplate

> Some starter code to start developing web apps with authentication.

Contains password reset and email activation functionality. Admin functionality and OAuth providers are in the works.

## Development Workflow

### Without Docker



### Using Docker


## CircleCI Deployment

Following environment variables need to be set for the continuous deployment to work:

- `GH_NAME`: Your GitHub username
- `GH_EMAIL`: Email associated with your GitHub account
- `HEROKU_APP_NAME`: name of your Heroku application
- `HEROKU_API_KEY`: Heroku API key obtained from [Account Management](https://dashboard.heroku.com/account/applications) console
- `PUBLIC_URL`: This should be the absolute URL to your application, without trailing slash, for example: `https://mpontus.github.io/auth-boilerplate`
- `REACT_APP_BASE_PATH`: If your app is served from sub-directory, this should be the name of the directory, including the leading slash and without trailing slash, for example: `/auth-boilerplate`
- `REACT_APP_API_URL`: Deployed server URL, including `api` suffix and excluding trailing slash, for example: `https://mpontus-auth-boilerplate.herokuapp.com/api`

In addition to that GitHub and Heroku be configured separately to accept and run deployments from CircleCI.

### GitHub Pages Configuration

Create GitHub user key for CircleCI to authorize it to deploy client to `gh-pages` branch of your repository, as described here:

https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-user-key

### Heroku Application Setup

1. Provision [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) and [Heroku Redis](https://elements.heroku.com/addons/heroku-redis) addons for your Heroku application.

2. Set the following environment variables using Heroku Dashboard or CLI:

	- `JWT_SECRET`: Secret key used to encode tokens for email activation and password recovery. Should be decently long and random string.
   - `SMTP_URL`: SMTP server credentials specified in the following format: `smtp://login:password@hostname:port`.
   - `EMAIL_FROM`: This will be be included in the `From: ` header of outgoing emails. For example: `Michael Pontus <noreply@mpontus.github.io>`.

