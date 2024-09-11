const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const db = require('./db');
const methodOverride = require('method-override');


//all middleware
app.use('/',express.static('./public'));
app.use(express.json());
app.use(methodOverride('_method'));

//get all - working
app.get('/',(req,res)=>{
    db.query('SELECT * from `subscribers`').then(([data])=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err)
    })
})

//get search - working
app.get('/:id',(req,res)=>{
    const id = req.params.id;
    db.query('SELECT * from subscribers WHERE id=?',[id]).then(([data])=>{
        res.send(data);
}).catch((err)=>{
    res.send(err);
})
});

app.get('/count',(req,res)=>{
    db.query('SELECT COUNT(*) FROM `subscribers`').then((data)=>{
        console.log(data);
         const count = data[0][0].count;
            res.json({ count: count });
    }).catch((err)=>{
        res.send(err)
    })
})

app.get('/users/:username', (req, res) => {
    const username = req.params.username;
    db.query('SELECT id FROM subscribers WHERE subscriber_name = ?', [username])
        .then(([rows]) => {
            if (rows.length > 0) {
                res.json(rows[0]); // Send the ID of the user
            } else {
                res.status(404).json({ error: 'Username not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});


//app.get('/edit/:id', (req,res)=>{
//    const id = req.params.id;
//    res.redirect('.html');
//})

//post data - working


app.post('/', (req, res) => {
    const data = req.body;
    console.log(data);

    db.query('INSERT INTO subscribers(subscription_type, subscriber_name, subscription_start_date, subscription_end_date, payment_status, payment_date) VALUES (?, ?, ?, ?, ?, ?)', [
        data.subscription_type,
        data.subscriber_name,
        data.subscription_start_date,
        data.subscription_end_date,
        data.payment_status,
        data.payment_date
    ])
    .then(() => res.send('Data added'))
    .catch(err => res.status(500).send('Error: ' + err));
});

//put data - working
app.put('/:id',(req,res)=>{
    const id = req.params.id;
    const data=req.body;
    console.log(data);
    db.query('UPDATE subscribers SET subscription_type=?, subscriber_name=?, subscription_start_date=?, subscription_end_date=?, payment_status=?, payment_date=? WHERE id=?',[data.subscription_type,data.subscriber_name,data.subscription_start_date,data.subscription_end_date,data.payment_status,data.payment_date,id]).then(([resdata])=>{
        res.redirect('data updated');
    }).catch((err)=>{
        res.send(err);
    })
})

app.get('/edit/:id',(req,res)=>{
    res.sendFile(__dirname+"/public/edit.html");
})

//delete data-working
app.delete('/:id',(req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM subscribers WHERE id=?',[id]).then(()=>res.send('data deleted')).catch((err)=>{
        res.send(err);
    })
})

//edit data - working
app.get('/editt/:id', (req,res)=>{
    const id = req.params.id;
    db.query('SELECT * from subscribers WHERE id=?',[id]).then(([item])=>{
        console.log(item);
        res.sendFile(path.join(__dirname, 'public', 'edit.html'));
    }).catch((err)=>{
        res.send(err);
    })
})


//listen app
app.listen(8080,()=>{
    console.log("server live at http://localhost:8080");
})