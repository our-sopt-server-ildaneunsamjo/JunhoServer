// module.exports = [
//     {
//         id: 'gngsn',
//         name: '박경선',
//         password: 'qwerty',
//         email: 'gngsn@gmail.com'
//     },
//     {
//         id: 'EZYOON',
//         name: '이지윤',
//         password: 'fl0wer',
//         email: 'gngsn@gmail.com'
//     },
//     {
//         id: 'wjdrbs',
//         name: '최정균',
//         password: 'password',
//         email: 'wjdrbs@gmail.com'
//     }
// ];

const pool = require('../modules/pool');
const crypto = require('../modules/encrypt');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    signin: async (id,password)=>{
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            const user = result[0];
            const salt = user.salt; // userdb에서 접근한 salt
            const hashed = await crypto.encrypt(password,salt);
            if(user.password === hashed){
                return result;
            }else{
                return false;
            }
        } catch(err){
            console.log('signin ERROR :',err);
            throw err;
        }
    },
    getUserById: async (id) => {
        // query문 작성
        const query = `SELECT * FROM ${table} WHERE id ="${id}"`;
        try{
            // pool module로 전달해서 결과값 받기
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('getUserById ERROR : ',err);
            throw err;
        }
        // try - catch로 ERROR 받기
    },
}

module.exports = user;