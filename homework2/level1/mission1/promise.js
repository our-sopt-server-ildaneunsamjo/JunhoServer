let isMomHappy = false;
let phone = {
    brand: 'Samsung',
    color: 'black'
};

var willIGetNewPhone = new Promise((resolve,reject)=>{
    if(isMomHappy){
        resolve(console.log(phone));
    }else{
        reject(Error("mom is not happy"));
    }
});
/*
let isMomHappy = false;
let phone = {
    brand: 'Samsung',
    color: 'black'
};

var willIGetNewPhone = new Promise((resolve,reject)=>{
    if(isMomHappy){
        resolve(phone);
    }else{
        reject(Error("mom is not happy"));
    }
});

willIGetNewPhone.then((obj)=>{
    console.log(obj);
})
*/