const router = require('express').Router();
const store = require('../db/store');

   router.get('/notes', (req, res) => {
    store.getNotes()
    .then((notes) => {
        return res.json(notes)
    })
    .catch((err) => res.status(500).json(err))
})
    
    router.post('/notes', (req, res) => {
        store.saveNote(req.body)
        .then((noteNew) => {
            return res.json(noteNew)
        })
        .catch((err) => res.status(500).json(err))
    })
    
    
    router.delete('/notes/:id', (req, res) => {
        store.deleteNotes(req.params.id)
        .then(() => {
            return res.json({ ok: true })
        })
        .catch((err) => res.status(500).json(err))
    })

module.exports = router;
