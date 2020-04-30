const fs = require('fs');
const crypto = require('crypto');

const encrypt = (password) =>{
    return new Promise((resolve,reject)=>{
        crypto.pbkdf2(password,'salt',100000,64,'sha512',(err,dkey)=>{
            if(err)throw err;
            resolve(dkey.toString('hex'));
            // 처리에 성공할 경우 resolve안에 넣어서 보내면 그것을 반환한다!
        })
    })    
}

/*
const encrypt = (password)=>{
    crypto.pbkdf2(password,'salt',100000,64,'sha512',(err,dkey)=>{
        if(err)throw err;
        return new Promise((resolve,reject)=>{
            password = dkey.toString('hex');
            resolve(password);
        });
    });
}
*/

fs.readFile(`${__dirname}/password.txt`, async (err,data)=>{
    if(err)throw err;
    
    const password = data.toString()
    const result = await encrypt(password);
    
    fs.writeFile(`${__dirname}/hashed.txt`,result,(err)=>{
        if(err)throw err;
        console.log('process suceed!');
    });
});