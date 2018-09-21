Facebook authentication in backend using passport and mongoose

### Summary
Uses `passport-facebook-token` library to validate facebook access_token sent through front-end after user authentication


#### Screenshots 1 [Authenticate User using Facebook access token]

![authenticate-user](https://github.com/syuraj/fb-backend-authentication/blob/master/img/postman-authenticate.png)



#### Screenshots 2 [Subsequent calls (without locally generated token)]

![401-Unauthorized-without-token](https://github.com/syuraj/fb-backend-authentication/blob/master/img/postman-unauthenticated-call.png)



#### Screenshots 3 [Subsequent calls (with locally generated token]

![Authenticated call with token](https://github.com/syuraj/fb-backend-authentication/blob/master/img/postman-authenticated-call.png)


#### Setup
1. Create FACEBOOK_APP_ID & FACEBOOK_APP_SECRET in .env file or environment variables
