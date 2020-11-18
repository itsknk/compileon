var fs = require('fs');
var cuid = require('cuid');
var exec = require('child_process').exec;
var javaCompiler = require('./lib/javaC');

exports.stats = false;

initialize = function(option)
{
    if(option)
    {
        if(option.stats === true)
        {
            console.log("Stats are selected");
            exports.stats = true;
        }
    }
    //creating a directory for compiled files
    fs.exists('./files', function(exists){
        if(!exists)
        {
            if(exports.stats)
            {
                console.log("Files folder created");
            }
            fs.mkdirSync('./files');
        }
    });
}

javaCompile = function(envData, code, fun)
{
    if(exports.stats)
        javaCompiler.stats = true;
    javaCompiler.javaCompile(envData, code, fun);
}

compileWithInput = function(envData, code, inp, fun)
{
    if(exports.stats)
        javaCompiler.stats = true;
    javaCompiler.compileWithInput(envData, code, inp, fun);
}

exports.initialize = this.initialize;
exports.javaCompile = this.javaCompile;
exports.compileWithInput = this.compileWithInput;