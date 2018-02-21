


var config = require('./config');
var _ = require('underscore');
var NginxConfFile = require('nginx-conf').NginxConfFile;
var fs = require('fs');
var assert = require('assert');
var fs = require('fs');
var forge = require('node-forge');
var decrypt = function(cipherText, password, salt, iv, options) {
    var key = forge.pkcs5.pbkdf2(password, forge.util.decode64(salt), 4, 16);
    var decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({iv: forge.util.decode64(iv)});
    decipher.update(forge.util.createBuffer(forge.util.decode64(cipherText)));
    decipher.finish();
    if(options !== undefined && options.hasOwnProperty("output") && options.output === "hex") {
        return decipher.output.toHex();
    } else {
        return decipher.output.toString();
    }
};
exports.post =function(req, res) {
if (req.headers['no-check']) {
        fs.readFile('pwd.txt', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            var temp = JSON.parse(data);

            try {
               var decrypted = decrypt(temp.cipher_text, req.headers['pwd'], temp.salt, temp.iv);
            } catch (e) {
            }
	    console.log(decrypted);
	    if (decrypted === 'SmartCity') {
               		console.log('Password is correct');
    			console.log(req.query.id);
    			console.log(req.query.playurl);
    			NginxConfFile.create('/usr/local/nginx/conf/nginx.conf', function(err, conf) {
  			if (err) {
    				console.log(err);
    				return;
  			}
			try
                        {
			if (!conf.nginx.rtmp.server.application.exec_static.length)
			{

			string_arr=conf.nginx.rtmp.server.application.exec_static._value.split("/");
			string=string_arr.pop();
			string=string.replace(";","");
			if (string == req.query.id)
			{
			res.send(403,req.query.id+" exists. Choose another name");
			}
			else{
			conf.nginx.rtmp.server.application._add('exec_static','/usr/bin/ffmpeg -i '+req.query.playurl+' -an -vcodec copy -f flv rtmp://localhost:1935/live1/'+req.query.id);
			res.send(200,req.query.id+" has been added");
			}
			
			}
			else
			{
                        for(var i=0,count=0;i<conf.nginx.rtmp.server.application.exec_static.length;i++)
			{
			string_arr=conf.nginx.rtmp.server.application.exec_static[i]._value.split("/");
			string=string_arr.pop();
			string=string.replace(";","");
			if (string == req.query.id)
			{
			res.send(403,req.query.id+" exists. Choose another name");
			}
			else{
			count++;
			if(count == conf.nginx.rtmp.server.application.exec_static.length){
  			conf.nginx.rtmp.server.application._add('exec_static','/usr/bin/ffmpeg -i '+req.query.playurl+' -an -vcodec copy -f flv rtmp://localhost:1935/live1/'+req.query.id);
			res.send(200,req.query.id+" has been added");
			break;  
			}}
			}
			}
			}
			catch (TypeError)
			{
                       //when no stream exists, conf.nginx.rtmp.server.application.exec_static.length return type error
		        conf.nginx.rtmp.server.application._add('exec_static','/usr/bin/ffmpeg -i '+req.query.playurl+' -an -vcodec copy -f flv rtmp://localhost:1935/live1/'+req.query.id);
			res.send(200,req.query.id+" has been added");
			}
			});
            }    
            else {
                res.send(403, 'Incorrect Password');
            }
});
}
else { res.send(403, "You don't have access to edit this item");
                }

};
	
exports.delete =function(req, res) {
if (req.headers['no-check']) {
        fs.readFile('pwd.txt', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            var temp = JSON.parse(data);

            try {
               var decrypted = decrypt(temp.cipher_text, req.headers['pwd'], temp.salt, temp.iv);
            } catch (e) {
            }
	    console.log(decrypted);
	    if (decrypted === 'SmartCity') {	
    		console.log(req.query.id);
    		NginxConfFile.create('/usr/local/nginx/conf/nginx.conf', function(err, conf) {
  		if (err) {
    			console.log(err);
    			return;
  		}
		try
                        {
			if (!conf.nginx.rtmp.server.application.exec_static.length)
			{
			string_arr=conf.nginx.rtmp.server.application.exec_static._value.split("/");
			string=string_arr.pop();
			string=string.replace(";","");
			if (string == req.query.id)
				{			
			conf.nginx.rtmp.server.application._remove('exec_static');
		        res.send(200,req.query.id+" deleted")
				}
			else
				{
		res.send(403,req.query.id+' not found. Could not delete stream');
				}			
			}
			else
			{
		for(var i=0,count=0;i<conf.nginx.rtmp.server.application.exec_static.length;i++)
		{
			string_arr=conf.nginx.rtmp.server.application.exec_static[i]._value.split("/");
			string=string_arr.pop();
			string=string.replace(";","");
			if (string == req.query.id)
			{
			conf.nginx.rtmp.server.application._remove('exec_static',i);
		        res.send(200,req.query.id+" deleted")
			}
			else
			{
			count++;
			console.log(count);
			if(count == conf.nginx.rtmp.server.application.exec_static.length)
			{res.send(403,req.query.id+' not found. Could not delete stream');}
			}
		} 
		}
		}
		catch (TypeError)
			{
		res.send(403,req.query.id+' not found. Could not delete stream');
			}

		});
		}else {
                res.send(403, 'Incorrect Password');
            	}
});
}
else { res.send(403, "You don't have access to edit this item");
                }

};



