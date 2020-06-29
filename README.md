
# react-native-x5-web-view

## Getting started

`$ npm install react-native-x5-web-view --save`

### Mostly automatic installation

`$ react-native link react-native-x5-web-view`

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.yopoint.x5.webview.RNX5WebViewPackage;` to the imports at the top of the file
  - Add `new RNX5WebViewPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-x5-web-view'
  	project(':react-native-x5-web-view').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-x5-web-view/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-x5-web-view')
  	```


## Usage
```javascript
import RNX5WebView from 'react-native-x5-web-view';

// TODO: What to do with the module?
RNX5WebView;
```
  