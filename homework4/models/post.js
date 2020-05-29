const pool = require('../modules/pool');
const table = 'post';

const post ={
    // (1)checkPost
    checkPost: async (postidx) =>{
        const query = `SELECT * FROM ${table} WHERE postIdx = "${postidx}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return false;
            }else {
                return true;
            }
        } catch(err){
            console.log('checkPost ERROR : ', err);
            throw err;
        }
    },
    postSearchAll: async()=>{
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('postSearchAll ERROR : ',err);
            throw err;
        }
    },
    // (2)게시글 조회(by id)
    postSearch: async(postidx)=>{
        const query = `SELECT * FROM ${table} WHERE postIdx="${postidx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('postSearch ERROR : ',err);
            throw err;
        }
    },
    // (3)게시글 생성
    postCreate: async(postidx, author, title, content, createdAt)=>{
        const fields = 'postidx, author, title, content, createdAt';
        const questions =`?, ?, ?, ?, ?`;
        const values = [posdtidx, author, title, content, createdAt];
        const query = `INSERTED INTO ${table}(${fields}) VALUES (${questions})`;
        try{
            const result = await pool.queryParamArr(query,values);
            const insertId = result.insertId;
            return insertId; 
        } catch(err){
            if(err.errno == 1062){
                console.log('postCreate ERROR : ', err.errno,err.code);
                return -1;
            }
            console.log('postCreate ERROR : ', err);
            throw err;
        }
    },
    // (4)게시글 수정
    postUpdate: async(postidx,title,content,createdAt)=>{
        // UPDATE table SET col1=val1, col2=val2 WHERE 조건;
        const fields = `title=?, content=?, createdAt=?`;
        const values = [title, content, createdAt];
        const query = `UPDATE ${table} SET ${fields} WHERE postIdx="${postidx}"`;
        try{
            const result = await pool.queryParamArr(query,value);
            return true;
        } catch(err){
            console.log('postUpdate ERROR : ',err);
            throw err;
        }
    },
    // (5)게시글 삭제
    postDelete: async(postidx) =>{
        const query = `DELETE FROM ${table} WHERE ="${postidx}"`;
        try{
            const result = await pool.queryParam(query);
            return true;
        } catch(err){
            console.log('postDelete ERROR : ',err);
            throw err;
        }
    },
};

module.exports = post;

// module.exports = [
//     {
//         id: "juno1234",
//         name: "homework",
//         content:"시리야 오늘 날씨알려죠"
//     }
// ];