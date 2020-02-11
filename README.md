# Lucent

[![Build Status](https://travis-ci.org/bahdcoder/pangaso.svg?branch=master)](https://travis-ci.org/bahdcoder/lucent)

![Lucent Dashboard](https://res.cloudinary.com/bahdcoder/image/upload/v1559663583/Screen_Shot_2019-06-04_at_4.51.55_PM_pynz6n.png)

For auth, we are going to save the auth user token into cookies.
Then before rendering the index.edge file, we'll get the authenticated user, and add it to the request object, before rendering the index.edge file.
