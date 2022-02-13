const {db} = require('../firebase');
const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('contacts').get()
    const contactArr = querySnapshot.docs.map( doc => ({
        id: doc.id,
        firstname: doc.data().firstname,
        ...doc.data()
    }));
    res.render('index', {contactArr});
})

router.post('/new-contact', async (req, res) => {
    const {firstname, lastname, email, phone} = req.body
    console.log(firstname, lastname, email, phone);
    await db.collection('contacts').add ({firstname, lastname, email, phone})
    res.redirect('/')
})

router.get('/edit-contact/:id', async (req, res) => {
    const doc = await db.collection('contacts').doc(req.params.id).get()
    res.render('index', {contact : {id: doc.id, ...doc.data()}})
    
})

router.get('/delete-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).delete()
    res.redirect('/')
})

router.post('/update-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).update(req.body)
    res.redirect('/')
})

module.exports =router;