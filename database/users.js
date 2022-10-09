const db = require('./database');

async function AddUser(req, res){
    if(!req.body.name || !req.body.cpf || !req.body.permission || !req.body.password)
    {
        console.log(req.body);
        res.sendStatus(400)
        return;
    }     
    var returnResult;
    await db.AddUser(req.body.name, req.body.cpf, req.body.room_number, req.body.permission, req.body.password).then(data =>
        {
            returnResult = data;
            res.json(returnResult);
        }).catch(err => {
            returnResult = err.message;
        });        
    console.log(returnResult);
}

async function LoginUser(req, res, next){
    if(!req.body.cpf || !req.body.password)
    {
        res.sendStatus(401);
        return;
    }
    var returnResult;
    await db.LoginUser(req.body.cpf, req.body.password).then(data =>
        {
            returnResult = data;
            res.json(returnResult);
        }).catch(err => {
            res.sendStatus(401)
            returnResult = err.message;
         })
    console.log(returnResult);
}

async function ListUsers(req, res){
    var returnResult;
    await db.ListUsers().then(data =>{
        returnResult = data;
        res.json(returnResult);
    }).catch(err =>{
        res.sendStatus(401)
        returnResult = err.message;
    });
    //console.log(returnResult);
}

async function DeleteUser(req, res){

    if(!req.query.id)
    {
        res.sendStatus(400)
        return;
    }
    console.log(req.query);
    var returnResult;
    await db.DeleteUser(req.query.id).then(data =>
    {
        returnResult = `${data.affectedRows} User(s) sucefully deleted.`;
        res.json(returnResult);
    }).catch(err => {
        returnResult = `Error when trying to delete user: ${err}`;
        res.sendStatus(400)
    })        
    console.log(returnResult);
}

async function UpdateUserInfo(req, res)
{
    if(!req.body.id || !req.body.name || !req.body.cpf || !req.body.room_number || !req.body.permission_level || !req.body.password)
    {
        res.sendStatus(400)
        return;
    }
    var returnResult;
    await db.UpdateUserInfo(req.body.id, req.body.name, req.body.cpf, req.body.room_number, req.body.permission_level, req.body.password).then(data =>
    {
        returnResult = data;
        res.json(returnResult);
    }).catch(err => {
        returnResult = err.message;
        res.sendStatus(400)
    })
    console.log(returnResult);
}

module.exports = { AddUser, ListUsers, DeleteUser, LoginUser, UpdateUserInfo };