const db = require('./database');

async function AddUser(req, res){
    if(!req.body.name || !req.body.cpf || !req.body.permission || !req.body.password)
    {
        console.log(req.body);
        res.sendStatus(400)
        return;
    }     
    db.AddUser(req.body.name, req.body.cpf, req.body.room_number, req.body.permission, req.body.password);    
    console.log(req.body);
    res.sendStatus(200);
}

async function ListUsers(req, res){
    db.ListUsers();
    res.sendStatus(200);
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
        res.sendStatus(200);
    }).catch(err => {
        returnResult = `Error when trying to delete user: ${err}`;
        res.sendStatus(400)
    })        
    console.log(returnResult);
}


module.exports = { AddUser, ListUsers, DeleteUser };