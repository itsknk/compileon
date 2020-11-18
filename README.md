# compileon
[![GitHub issues](https://img.shields.io/github/issues/itsknk/compileon)](https://github.com/itsknk/compileon/issues)

Makes building online compilers easy.

compileon is a library written in node that helps you build online compilers and editors with ease.

## Install
The package can be installed with `node.js` `npm` package manager. If you don't have `node.js` installed you can download it [here](https://nodejs.org/en/download/)

```
$ npm install -g compileon
```

**Note:** The `-g` flag might require `sudo` permisson.

## Usage
First install the compilers required.
1. For Java, install the JAVA SDK.

<h5>For Java:</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.compileJava( envData , code , function(data){
        res.send(data);
    });    
```
**Note:** As compiling is same for Java in either of the OS can select option any while using it.
<h5>For ava with user-input</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.compileJavaWithInput( envData , code , input ,  function(data){
        res.send(data);
    });
```
Now after installing the SDK and the npm packaga, this can be used in any online editor/compiler by making a front-end.
Examples coming soon.

## Contributing
- Fork it and then do the changes or else download the zip file, test to make sure nothing is going sideways.
- Make a pull request with a detailed explanation. 

## License
[MIT](https://github.com/itsknk/compileon/blob/master/LICENSE)