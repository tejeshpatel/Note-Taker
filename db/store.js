const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const readNotes = util.promisify(fs.readFile);
const postNotes = util.promisify(fs.writeFile);

class Store {
    
    readAll(){
        return readNotes( './db/db.json',  'utf8')
    };
    
    
    getNotes () {
        return this.readAll()
        .then((notes) => {
            let parsedNotes
            try {parsedNotes = [].concat(JSON.parse(notes))}
            catch (err) {
                console.log("There are no notes", err);
            }
            return parsedNotes;    
            
        })};
        
        writeNotes(note){
            return postNotes( './db/db.json', JSON.stringify(note))
        };
        
        saveNote(note) {
            const { title, text } = note;
            const newNote = { title, text, id: uuidv4() }
            
            console.log('store post /notes', newNote)
            return this.getNotes()
            .then((notes) => [ ...notes, newNote ])
            .then((newNotes) => this.writeNotes(newNotes))
            .then(() => newNote)
        }
        
        
        deleteNotes(id){
            console.log('store delete /notes', id)
            return this.getNotes()
            .then((notes) => notes.filter(
                note => note.id !==id
            ))
            .then((clearNote) => this.writeNotes(clearNote))
        };
            
}

module.exports = new Store();