const crypto = require('crypto');

const makesalt =() =>{
    return crypto.randomBytes(32);
}

const encrypt = (password,salt) =>{
    return new Promise((resolve,reject)=>{
        crypto.pbkdf2(password,salt,100000,64,'sha512',(err,dkey)=>{
            if(err)throw err;
            resolve(dkey.toString('hex'));
            // 처리에 성공할 경우 resolve안에 넣어서 보내면 그것을 반환한다!
        })
    })    
  }

module.exports = {
    makesalt,encrypt
}