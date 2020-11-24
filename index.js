var fs = require('fs');
var cuid = require('cuid');
var exec = require('child_process').exec;
var javaCompiler = require('./lib/javaC');
var pythonCompiler = require('./lib/pythonC');

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
    fs.exists('./temp', function(exists){
        if(!exists)
        {
            if(exports.stats)
            {
                console.log("Files folder created");
            }
            fs.mkdirSync('./temp');
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

executePython = function(envData, code, fn)
{
    if(exports.stats)
        pythonCompiler.stats = true;
    pythonCompiler.executePython(envData, code, fn);
}

executeWithInput = function(envData, code, input, fn)
{
    if(exports.stats)
        pythonCompiler.stats = true;
    pythonCompiler.executeWithInput(envData, code, input, fn);
}

exports.initialize = initialize;
exports.javaCompile = javaCompile;
exports.compileWithInput = compileWithInput;
exports.executePython = executePython;
exports.executeWithInput = executeWithInput;