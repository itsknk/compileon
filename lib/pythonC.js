var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');


exports.stats = false ;

executePython = function (envData , code , fn){

	var filename = cuid.slug();
	path = './temp/';

	fs.writeFile( path  +  filename +'.py' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: '+ err);
		    else
		    console.log('INFO: '+ filename +'.py created');	
		}
		if(!err)
		{
			var command = 'python3 ' + path + filename +'.py';
			exec( command , function ( error , stdout , stderr ){
				if(error)
				{
					if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
					{
						var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
						fn(out);								
					}
					else
					{
						if(exports.stats)
						{
							console.log('INFO: '+ filename + '.py contained an error while executing');
						}
							var out = { error : stderr };
							fn(out);								
					}													
				}
				else
				{
					if(exports.stats)
					{
						console.log('INFO: '+ filename + '.py successfully executed !');
					}
					var out = { output : stdout};
					fn(out);
				}
		    });
		}
	});
}

executeWithInput = function( envData , code , input ,  fn){
	var filename = cuid.slug();
	path = './temp/';

	fs.writeFile( path  +  filename +'.py' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: '+ err);
		    else
		    console.log('INFO: '+ filename +'.py created');	
		}
		if(!err)
		{

			fs.writeFile(path + filename + 'input.txt' , input , function(err){
				if(exports.stats)
				{
					if(err)
					console.log('ERROR: '+ err);
				    else
				    console.log('INFO: '+ filename +'input.txt created');	
				}
				if(!err)
				{
					var command = 'python3 ' + path + filename +'.py < ' + path + filename +'input.txt ' ;
					exec( command , function ( error , stdout , stderr ){
						if(error)
						{
							if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
							{
								var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
								fn(out);								
							}
							else
							{
								if(exports.stats)
								{
									console.log('INFO: '+ filename + '.py contained an error while executing');
								}
								var out = { error : stderr };
								fn(out);								
							}													
						}
						else
						{
							if(exports.stats)
							{
								console.log('INFO: '+ filename + '.py successfully executed !');
							}
							var out = { output : stdout};
							fn(out);
						}
				    });						
				}
			});
		}
	});
}

module.exports = {
	executePython,
	executeWithInput
}