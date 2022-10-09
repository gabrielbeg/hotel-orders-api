const md5 = require('js-md5');
const db = require('./dbconnector');

async function AddUser(name, cpf, room_number, permission, password)
{    
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO users (name, cpf, room_number, permission_level, password) VALUES ('${name}', '${cpf}', '${room_number}', '${permission}', '${md5(password)}')`
        ,function(err, result)
        {
            if(err) return reject(err);
            return resolve(result);
        });
    })
}

async function LoginUser(cpf, password)
{
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE cpf='${cpf}' AND password='${password}'`, function(err, result)
        {
        if(err) return reject(err)
        return resolve(result)
        });
    })
    
}

async function ListUsers()
{    
    return new Promise((resolve, reject) => 
    {
        db.query("SELECT * FROM users", function(err, result)
        {
            if(err) return reject(err);
            return resolve(result);
        });
    })    
}

async function DeleteUser(id)
{    
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM users WHERE id='${id}'`, function(err, result)
        {
            if(err){
                return reject(err);
            }
            else if(result.affectedRows == 0)
            {
                return reject("User not found");
            }
            return resolve(result)
        });
    });
}

async function UpdateUserInfo(id, name, cpf, room_number, permission_level, password)
{    
    return new Promise((resolve, reject) => {
        var updated_at = Date.now();
        db.query(`UPDATE users SET name='${name}', cpf='${cpf}', room_number='${room_number}', permission_level='${permission_level}', updated_at='${updated_at}', password='${password}'  WHERE id='${id}' AND password='${password}'`, function(err, result)
        {
            if(err){
                return reject(err);
            }
            else if(result.affectedRows == 0)
            {
                return reject("User not found");
            }
            console.log(result);
            return resolve(result)
        });
    });
}


module.exports = {
AddUser,
ListUsers,
DeleteUser,
LoginUser,
UpdateUserInfo
};