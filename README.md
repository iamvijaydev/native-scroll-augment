# Native Scroll Augment
A small engine that augments, few additional functionalities to native scroll.

<a href="https://codeclimate.com/github/iamvijaydev/native-scroll-augment/maintainability"><img src="https://api.codeclimate.com/v1/badges/a2cc06280bab4be9d957/maintainability" /></a> <a href="https://codeclimate.com/github/iamvijaydev/native-scroll-augment/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a2cc06280bab4be9d957/test_coverage" /></a>

## Added functionalities
### Connected scrolling
Connect two or more scrollable areas. Meaning when we scroll one area, others scroll with it.

### Kinetic scrolling
Kinetic scrolling with a tap, swipe, and flick features on a non-touch device. This feature can be enabled for devices that do not support smooth scrolling.

### Helper functions
Helper functions to smooth scroll a scrollable area to a specific scroll position, to scroll start, or to scroll end. Also, a helper function to smooth scroll a scrollable area by a certain value.

## Installation (Not published yet)
```shell
yarn add native-scroll-augment

# or 

npm install native-scroll-augment --save
```
## Usage
```javascript
// import the package
import NativeScrollAugment from 'native-scroll-augment';

// create an instance
const nsa = new NativeScrollAugment($parent, [$scrollArea], options);

// initialize the instance
nsa.init()
```
