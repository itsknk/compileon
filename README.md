# compileon
[![GitHub license](https://img.shields.io/github/license/itsknk/compileon)](https://github.com/itsknk/compileon/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/itsknk/compileon)](https://github.com/itsknk/compileon/issues)
[![npm version](https://badge.fury.io/js/compileon.svg)](https://badge.fury.io/js/compileon)

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
1. For Java, install the <a href="https://www.oracle.com/in/java/technologies/javase-downloads.html"> JAVA SDK </a>.

<h5>Without Input:</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.javaCompile( envData , code , function(data){
        res.send(data);
    });    
```
**Note:** As compiling is same for Java in either of the OS can select either of the OS while using it.
<h5>With Input:</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.compileWithInput( envData , code , input ,  function(data){
        res.send(data);
    });
```
2. For python, install <a href="https://www.python.org/downloads/"> python</a>.

<h5>Without Input:</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.executePython( envData , code , function(data){
        res.send(data);
    });    
```
**Note:** As compiling is same for Python in either of the OS can select either of the OS while using it.
<h5>With Input:</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.executeWithInput( envData , code , input ,  function(data){
        res.send(data);
    });
```
3. For CPP, install <a href="https://gcc.gnu.org/install/index.html"> g++</a>.

<h5>Without Input:</h5>

```javascript
    //if windows 
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.cppCompile( envData , code , function(data){
        res.send(data);
    });    
```
**Note:**  GCC support is yet to add.
<h5>With Input:</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" };
    compiler.cppcompileWithInput( envData , code , input ,  function(data){
        res.send(data);
    });
```

## Further Updates
1. Have to add compilers for other languages - C, C++(GCC).
2. Have to add Examples.

## Contributing
- Fork it and then do the changes or else download the zip file, test to make sure nothing is going sideways.
- Make a pull request with a detailed explanation. 

## License
[MIT](https://github.com/itsknk/compileon/blob/master/LICENSE)