var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');



exports.stats = false ;


ccCompile = function ( envData ,  code , fun ) {
	var filename = cuid.slug();
	path = './temp/';

	fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
		if(exports.stats)
		{
			if(err)
				console.log('ERROR: '+ err);
			else
			{
				console.log(filename +'.cpp created');
				if(envData.cmd === 'g++')
				{
					comComp = 'g++ ' + path + filename +'.cpp -o '+path + filename +'.exe' ;
					exec(comComp , function ( error , stdout , stderr ){
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
							var tcom = "cd temp & "+ filename ;
							exec( tcom , function ( error , stdout , stderr ){
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
											console.log("An error occurred while executing");
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
											console.log('Successfully Executed');
										}
										var outPut = { output : stdout};
										fun(outPut);
									}
								}
							});
						}

					});


				}
				else if(envData.cmd === 'gcc')
				{
					comComp = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
					exec(comComp , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log("An error occurred while compiling");
							}
							var outPut = { error : stderr};
							fun(outPut);
						}
						else
						{
							exec( path + filename + '.out', function ( error , stdout , stderr ){
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
											console.log("An error occurred while executing");
										}
										var outPut = { error : stderr };
										fun(outPut);
									}
								}
								else
								{
									if(exports.stats)
									{
										console.log("Successfully executed");
									}
									var outPut = { output : stdout};
									fun(outPut);
								}
							});

						}
					});
				}
			}	
		}
	}); 


} 

ccCompileWithInput = function ( envData , code , input ,  fun ) {
	var filename = cuid.slug();
	path = './temp/';

	fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){
		if(exports.stats)
		{
			if(err)
				console.log('ERROR: '+ err);
			else
			{
				console.log(filename +'.cpp created');
				if(envData.cmd ==='g++')
				{

					comComp = 'g++ ' + path + filename +'.cpp -o '+ path + filename+'.exe' ;
					exec(comComp , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log('An Error occurred while compiling');
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
								var tcom = "cd temp & " + filename ;

								exec( tcom + '<' + inputfile , function( error , stdout , stderr ){
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
												console.log('An error occurred while executing');
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
												console.log('Successfully executed');
											}
											var outPut = {output: stdout};
											fun(outPut);
										}
									}
								});
							}
							else //input not provided
							{
								if(exports.stats)
								{
									console.log("Input file not found");
								}
								var outPut = { error : 'Input Missing' };
								fun(outPut);
							}

						}


					});

				}
				//gcc 
				else if ( envData.cmd == 'gcc')
				{
					comComp = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
					exec(comComp , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log('An Error occurred while compiling');
							}
							var outPut = { error : stderr};
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

								exec( path + filename +'.out' + ' < ' + path + inputfile , function( error , stdout , stderr ){
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
												console.log('An Error occurred while executing');
											}
											var outPut =  { output : stderr};
											fun(outPut);
										}
									}
									else
									{
										if(exports.stats)
										{
											console.log('Successfully executed');
										}
										var outPut = { output : stdout};
										fun(outPut);
									}
								});

							}
							else 
							{
								if(exports.stats)
								{
									console.log("No input file found");
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

module.exports = {
	ccCompile,
	ccCompileWithInput
}