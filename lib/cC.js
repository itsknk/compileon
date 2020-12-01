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
					var compCom = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
					exec(compCom , function ( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)
							{
								console.log("An Error Occured While Compiling");
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
											console.log('An Error Occurred while executing');
										}
										var outPut = { error : stderr };
										fun(outPut);
									}
								}
								else
								{
									if(exports.stats)
									{
										console.log('Successfully Executed');
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
					compCom = 'gcc ' + path + filename +'.cpp -o '+ path + filename+'.out' ;
					exec(compCom , function ( error , stdout , stderr ){
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
											console.log(inputfile +' created');
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
											console.log('Successfully Executed');
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
									console.log('No Input file found');
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