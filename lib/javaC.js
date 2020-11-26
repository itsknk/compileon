var fs = require('fs');
var exec = require('child_process').exec;
var cuid = require('cuid');

exports.stats = false;

//No inputs
exports.javaCompile = function(envData, code, fun)
{
    var filename = cuid.slug();
    path = './temp/';
    fs.writeFile(path + filename + '.java', code, function(err){
        if(exports.stats)
        {
            if(err)
                console.log("Error: " + err);
            else
                console.log(filename + '.java created');    
        }
        if(!err)
        {
            var compCom = 'javac ' + path + filename + '.java';
            exec(compCom, function(error, stdout, stderr)
            {
                if(error)
                {
                    if(exports.stats)
                        console.log("AT: " + path + "An error occured while compiling");
                    var outPut = {error : stderr};
                    fun(outPut);
                }
                else
                {
                    console.log("Java file compiled successfully");
                    var compCom = 'java ' + path + filename;
                    exec(compCom, function(error, stdout, stderr)
                    {
                        if(error)
                        {
                            //maybe an infinite loop
                            if(error.toString().indexOf('Error: stdout MAXBUFFER exceeded') != -1)
                            {
                                var outPut = {error: "MAXBUFFER exceeded"};
                                fun(outPut);
                            }
                            else
                            {
                                if(exports.stats)
                                {
                                    console.log("AT: "+ path + "An Error occured while executing");
                                }
                                var outPut = {error: stderr};
                                fun(outPut);
                            }
                        }
                        else
                        {
                            if(exports.stats)
                            {
                                console.log("Compiled and Executed Successfully");
                            }
                            var outPut = {output: stdout};
                            fun(outPut);
                        }
                    });
                }
            });    
        }
    });
}

//For user-input scenario
exports.compileWithInput = function(envData, code, inp, fun)
{
    var filename = cuid.slug();
    path = './temp/'
            fs.writeFile(path + filename + '.java', code, function(err){
                if(exports.stats)
                {
                    if(err)
                        console.log("ERROR: "+ err);
                    else
                        console.log(filename + '.java created');
                }
                if(!err)
                {
                    fs.writeFile(path + filename + 'input.txt', input , function(err)
                    {
                        if(exports.stats)
                        {
                            if(err)
                                console.log("Error: "+ err);
                            else
                                console.log(filename + 'input.txt created');
                        }
                        if(!err)
                        {
                            var compCom = 'javac ' + path + filename + '.java';
                            exec(compCom, function(error, stdout, stderr)
                            {
                                if(error)
                                {
                                    if(exports.stats)
                                        console.log("AT: "+ path + "An Error occured while compiling");
                                    var outPut = {eror: stderr};
                                    fun(outPut);
                                }
                            else
                            {
                                console.log("Java file Compiled");
                                var compCom = 'java '+ path + filename + path + filename +'input.txt';
                                exec(compCom, function(error, stdout, stderr)
                                {
                                    if(error)
                                    {
                                        if(exports.stats)
                                        {
                                            console.log("AT: " + path + "An Error Occured");
                                        }
                                        if(error.toString().indexOf('Error: stdout MAXBUFFER exceeded')!= -1)
                                        {
                                            var outPut = {error: "Error: MAXBUFFER exceeded"};
                                            fun(outPut);
                                        }
                                        else
                                        {
                                            var outPut = {error: stderr};
                                            fun(outPut);
                                        }
                                    }
                                    else
                                    {
                                        if(exports.stats)
                                        {
                                            console.log("Compiled and Executed successfully");
                                        }
                                        var outPut = {output : stdout};
                                        fun(out);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })  
    }
