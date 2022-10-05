const md5 = require('js-md5');
const db = require('./dbconnector');

async function AddUser(name, cpf, room_number, permission, password)
{    
    db.query(`INSERT INTO users (name, cpf, room_number, permission_level, password) VALUES ('${name}', '${cpf}', '${room_number}', '${permission}', '${md5(password)}')`, function(err, result)
    {
        if(err) throw err;
        console.log(result)
    });
}

async function ListUsers()
{    
    db.query("SELECT * FROM users", function(err, result)
    {
        if(err) throw err;
        console.log(result)
    });
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


module.exports = {
AddUser,
ListUsers,
DeleteUser
};