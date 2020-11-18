var fs = require('fs');
var exec = require('child_process').exec;
var cuid = require('cuid');

exports.stats = false;

//Without input Compile
javaCompile = function(envData, code, fun)
{
    var dirName = cuid.slug();
    path = './files/'+dirName;

    fs.mkdir(path, 0777, function(err){
        if(err && exports.stats)
        {
            console.log(err.toString());
        }
        else
        {
            fs.writeFile(path + "/Index.java", code, function(err){
                if(err && exports.stats)
                {
                    console.log("Error: " + err);
                }
                else
                {
                    if(exports.stats)
                        console.log("AT: " + path + "Created Index.java file");
                    if(envData.OS === "any")
                        var compCom = "cd "+path+ " & " + " javac Index.java";
                        exec(compCom, function(error, stdout, stderr){
                            if(error)
                            {
                                if(exports.stats)
                                    console.log("AT: " + path + "An error occured while compiling in Index.java file");
                                var outPut = {error : stderr};
                                fun(outPut);
                            }
                            else
                            {
                                console.log("Java file compiled successfully");
                                var compCom = "cd "+path+" & java Index";
                                exec(compCom, function(error, stdout, stderr){
                                    if(error)
                                    {
                                        if(error.toString.indexOf('Error: stdout MAXBUFFER exceeded') != -1)
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
    });
}

//Compile with Input
compileWithInput = function(envData, code, inp, fun)
{
    var dirName = cuid.slug();
    path = './files/'+dirName;
    fs.mkdir(path, 0777, function(err){
        if(err && exports.stats)
            console.log(err.toString());
        else
        {
            fs.writeFile(path + "/Index.java", code, function(err){
                if(err && exports.stats)
                    console.log("ERROR: "+ err);
                else
                {
                    if(envData.OS === "any")
                    var compCom = "cd "+path+" & " + " javac Index.java";
                    exec(compCom, function(error, stdout, stderr){
                        if(error)
                        {
                            if(exports.stats)
                                console.log("AT: "+ path + "An Error occured while compiling Index.java file");
                            var outPut = {eror: stderr};
                            fun(outPut);
                        }
                        else
                        {
                            console.log("Java file Compiled");
                            var compCom = "cd "+path+" & java Index < input.txt";
                            exec(compCom, function(error, stdout, stderr){
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

exports.javaCompile = this.javaCompile;
exports.compileWithInput = this.compileWithInput;