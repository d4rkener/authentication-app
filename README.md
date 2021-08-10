
# Authentication App

This is a [DevChallenges.io](https://devchallenges.io/) challenge
and it was very fun to create. It has almost all the features that
an auth app contains.


## Tech Stack

**Client:** Vue, Sass

**Server:** Supabase

  
## Features

- I can register a new account
- I can log in
- I can log in or register with at least one of the following services: Google, Facebook, Twitter or Github
- I can sign out
- I can see my profile details
- I can edit my details including: photo, name, bio, phone, email and password
- I can upload a new photo or provide an image URL
  
## Run Locally

Clone the project

```bash
  git clone git@github.com:rahulshawdev/authentication-app.git
```

Go to the project directory

```bash
  cd authentication-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run serve
```

  
## Running Tests

To run tests, run the following command

```bash
  npm run test:e2e
```

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VUE_APP_SUPABASE_URL`

`VUE_APP_SUPABASE_ANON_KEY`

  