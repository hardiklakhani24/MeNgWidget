# General

#### Step - 1
Clone the project source.

#### Step - 2
Install all dependencies by `npm install`

#### Step - 3
After installing dependencies run this `npm run webbuilder` command to generate build (eg. `mc.js` ) file in element directory.

#### Step - 4
Import our script file mc.js into your HTML in between <body></body>.
you need to give `id="mc"` fixed attribute for set our apikey and initialize it once in the app.
you can give apikey as attribute to set apikey.

# History widget

#### Step - 1
Import any css file if you want and give ref. link in between <head></head> to change the native styles.

#### Step - 2
Use <listing-history> with dynamic attributes for `title` & `vin` of your data & table.


### Example:

```sh
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Zerebral</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="./styles.css" />
</head>

<body>
    <listing-history title="Listing History" vin="WMWZB3C58EWR40686"></listing-history>
    <script id="mc" src="./mc.js" apikey="ifQw00jC3LtQS4c4rfSbJOJFY7EmTvWP"></script>
</body>

</html>
```
