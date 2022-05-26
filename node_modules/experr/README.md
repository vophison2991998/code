# ExpErr

## Express error handler module

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

ExpErr is an Error handler module that provides an advanced and standard way to handle express errors.

## Features

- Easy to use.
- Standard Error response.
- Has a predefined list of status codes.
- Has a predefined list of common errors.
- Catches the not-found targets.

## Installation

```sh
npm i experr
```

## Usage

```js
const express = require("express");
const {
  ExpErr,
  ExpErrors,
  StatusCodes,
  AppErr,
  ExpErrStatuses,
  catchAsync,
} = require("experr");

const app = express();
// before any middleware
// use default config
app.use(expErr.config());

// use custom config
app.use(
  ExpErr.config({
    defaultErrStatus: ExpErrStatuses.error,
    defaultErrStatusCode: 500,
    defaultErrMessage: "Internal server error",
    defaultErrCode: "E-0",
    logError: true,
  })
);
.
.
// threw auth error if req.query.err
app.get("/er", (req, res, next) => {
  if (req.query.err) return req.error(ExpErrors.authFaild());
  res.json({ status: "success" });
});
.
.
// threw custom error
app.get("/custom", (req, res, next) => {
  if (req.query.err)
    return req.error(
      new AppErr({
        message: "custom error", // required
        status: ExpErrStatuses.failed, // optional default is "error"
        statusCode: StatusCodes.BAD_GATEWAY, // optional default is 500
        errCode: "E-7", // optional
      })
    );
  res.json({ status: "success" });
});
.
.
.
// catch all errors occured in target functions with catchAsync function
app.get(
  "/async",
  catchAsync(async (req, res, next) => {
    // will response with error if there is an error from "getUserFromDb" function
    const user = await getUserFromDb({ id: req.params.id });

    // will response with no document found err if no user found
    if (!user) return req.error(ExpErrors.noDocumentMatched("user not found"));
    res.json({ status: "success" });
  })
);
.
.
.
// after all middlewares
expErr.catchAppErrors(app);
app.listen(5053);
```

## Response

The response is in standard format (status, message, errCode)

```json
{
"status": "error",
"errCode": "E-7",
"message": "custom error"
}
{
"status": "error",
"errCode": "E-1",
"message": "This target '/csustom?err=r'' is not found with GET 'method'"
}
```

## License

MIT

**Feel free to fork it!**
