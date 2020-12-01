var fs = require('fs');
var exec = require('child_process').exec;
var cuid = require('cuid');

exports.stats = false;

exports.cppCompile = function ( envData ,  code , fun ) {
	var filename = cuid.slug();
	path = './temp/';

	fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
		if(exports.stats)
		{
			if(err)
				console.log('ERROR: '+ err);
			else
			{
				console.log(filename +'.cpp Created');
				
				if(!err)
				{
					compCom = 'g++ ' + path + filename +'.cpp -o '+path + filename +'.exe' ;
					exec(compCom , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log("An Error occurred while compiling");
							}
							var outPut = { error : stderr };
							fun(outPut);
						}
						else
						{
							var progEnd=true;
							var comCom = "cd temp & "+ filename ;
							exec( comCom , function ( error , stdout , stderr ){
								if(error)
								{

									if(error.toString().indexOf('Error: stdout MAXBUFFER exceeded.') != -1)
									{
										var outPut = { error : 'MAXBUFFER Exceeded' };
										fun(outPut);
									}
									else
									{
										if(exports.stats)
										{
											console.log("An Error occurred while executing");
										}

										var outPut = { error : stderr };
										fun(outPut);
									}
								}
								else
								{
									if(progEnd){
										progEnd=false;
										if(exports.stats)
										{
											console.log("Successfully Executed");
										}
										var outPut = { output : stdout};
										fun(outPut);
									}
								}
							});
							
						}

					});

				}
			}
		}
	}); 


} 

exports.cppcompileWithInput = function ( envData , code , input ,  fun ) {
	var filename = cuid.slug();
	path = './temp/';

	fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
		if(exports.stats)
		{
			if(err)
				console.log('ERROR: '+ err);
			else
			{
				console.log(filename +'.cpp Created');
				
				if (!err)
				{
					compCom = 'g++ ' + path + filename +'.cpp -o '+ path + filename+'.exe' ;
					exec(compCom , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log("An Error occurred while compiling");
							}
							var outPut = { error : stderr };
							fun(outPut);
						}
						else
						{
							if(input){
								var inputfile = filename + 'input.txt';

								fs.writeFile( path  +  inputfile , input  , function(err ){
									if(exports.stats)
									{
										if(err)
											console.log('ERROR: '+ err);
										else
											console.log(inputfile +' Created');
									}
								});
								var progEnd=true;
								var comCom = "cd temp & " + filename ;

								exec( comCom + '<' + inputfile , function( error , stdout , stderr ){
									if(error)
									{
										if(error.toString().indexOf('Error: stdout MAXBUFFER exceeded.') != -1)
										{
											var outPut = { error : 'MAXBUFFER Exceeded'};
											fun(outPut);
										}
										else
										{
											if(exports.stats)
											{
												console.log("An Error occurred while executing");
											}
											var outPut = { error : stderr};
											fun(outPut);
										}
									}
									else
									{
										if(progEnd) {
											progEnd = false;
											if (exports.stats) {
												console.log("Successfully executed");
											}
											var outPut = {output: stdout};
											fun(outPut);
										}
									}
								});

							}
							else 
							{
								if(exports.stats)
								{
									console.log('Input file not found');
								}
								var outPut = { error : 'Input Missing' };
								fun(outPut);
							}

						}
					});
				}
			}	
		}	
	});								
} 