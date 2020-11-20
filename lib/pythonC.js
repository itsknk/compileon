var fs = require('fs');
var exec = require('child_process').exec;
var cuid = require('cuid');

exports.stats = false ;

//No inputs
executePython = function (envData , code , fun){

	var dirName = cuid.slug();
	path = './files/'+dirName;

	fs.writeFile( path  + '/Index.py' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: ' + err);
		    else
		    console.log("AT: " + path + "Created Index.py file");	
		}
		if(!err)
		{
			var compCom = "cd "+path+ " & " + " python Index.py";
			exec( compCom , function ( error , stdout , stderr ){
				if(error)
				{
					if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
					{
						var outPut = { error : 'Error: MAXBUFFER exceeded.' };
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

//For user-input scenario
executeWithInput = function( envData , code , input ,  fun){
	var dirName = cuid.slug();
	path = './files/'+dirName;

	fs.writeFile( path + '/Index.py' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR'+ err);
		    else
		    console.log("AT: " + path + "Created Index.py file");	
		}
		if(!err)
		{

			fs.writeFile(path + "Index" + 'input.txt' , input , function(err){
				if(exports.stats)
				{
					if(err)
					console.log('ERROR: '+ err);
				    else
				    console.log('input.txt created');	
				}
				if(!err)
				{
					var compCom = 'python ' + path + 'Index.py < ' + path + 'Index' +'input.txt ' ;
					exec( compCom , function ( error , stdout , stderr ){
						if(error)
						{
							if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
							{
								var outPut = { error : 'MAXBUFFER exceeded' };
								fun(outPut);								
							}
							else
							{
								if(exports.stats)
								{
									console.log('An error occurred while executing');
								}
								var outPut = { error : stderr };
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
			});
		}
	});
}

exports.executePython = this.executePython;
exports.executeWithInput = this.executeWithInput;