# Simple weather app

Implementation of the app is available on the [STAND](https://feinminen.github.io/weather-forecast-app/)

Implemented according to the [BEM](https://en.bem.info/methodology/) methodology.

## Project description:

An application for viewing the weather forecast for 5 days. Available for any city or user's current coordinates.

## Project requirements:

- Application should provide 7-day (or less if there any API restrictions) forecast starting from
today; **
- City can be selected by name or current geo-coordinates can be used;
- In the list temperature should be shown for a daytime, icons should be neutral;
- In the section "Current weather" the temperature and icon depend on the current time;
- According to changes in control "Scale's type" (C or F) convert temperature from Celsius to
Fahrenheit or vice versa;
- If page was reloaded then application should restore state (if any city was selected by name or
coordinates, it should be shown saved forecast, but in background, app should ask about new
data);
- Make it responsive (suggest your option for mobile)
- The result should be available in a Git repository (on Github or Bitbucket for example)
- You can use any JavaScript framework
- CSS frameworks shouldn't be used for this test assignment. Preferably use a CSS preprocessor
(Stylus, Sass, etc...)
- It should work as single page application. Although this specific task can be done in a more
simple way, it is important that you use some package manager and other tools (like task runners
or JS transpilers and CSS preprocessors)

** Free version of [API](https://openweathermap.org/forecast5) limits the number of days when searching by city, so the forecast is only available for 5 days.

## Getting Started:

### Cloning repository

Cloning is performed by the ```git clone``` command with a link to the remote project repository.

### Install dependencies

Before starting the project, dependencies that are specified in the package.json must be installed via ```yarn install ``` command.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn deploy`

To deploy project on gh-pages


## References:

Project is bootstraped with create-react-app;

