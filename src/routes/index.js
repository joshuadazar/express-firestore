const {db} = require('../firebase');
const {Router} = require('express');
const router = Router();

router.get('/contact', async (req, res) => {
    const querySnapshot = await db.collection('contacts').get()
    const contactArr = querySnapshot.docs.map( doc => ({
        id: doc.id,
        firstname: doc.data().firstname,
        ...doc.data()
    }));
    res.send(contactArr)
})

router.post('/new-contact', async (req, res) => {
    const {firstname, lastname, email, phone} = req.body
    console.log(firstname, lastname, email, phone);
    await db.collection('contacts').add ({firstname, lastname, email, phone})
    res.send('contact created')
})

router.get('/edit-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).get()
    res.send('contact founded')
})

router.get('/delete-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).get()
    res.send('contact deleted')
})

router.post('/update-contact/:id', async (req, res) => {
    
    await db.collection('contacts').doc(req.params.id).update(req.body)
    res.send('contact updated')
})

module.exports =router;