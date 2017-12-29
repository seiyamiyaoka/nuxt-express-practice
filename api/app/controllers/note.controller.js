var Note = require('../models/note.model.js')

exports.create = (req, res) => {
  if(!req.body.content) {
    res.status(400).send({message: "empty"})
  }
  var note = new Note({title: req.body.title || "untitled note", content: req.body.content})

  note.save((err, data) => {
    console.log(data)
    if(err) {
      console.log(err)
      res.status(500).send({message: "エラーが発生中"})
    } else {
      res.send(data)
    }
  })
}

exports.findAll = (req, res) => {
  Note.find((err, notes) => {
    if(err){
      res.status(500).send({message: "some error 発生"})
    } else {
      res.send(notes)
    }
  })
}

exports.findOne = (req, res) => {
  Note.findById(req.params.noteId, (err, data) => {
    if(err) {
      res.status(500).send({message: '見つかりませんでした'})
    } else {
      res.send(data)
    }
  })
}

exports.update = (req, res) => {
  Note.findById(req.params.noteId, (err, note) => {
    if(err) {
      res.status(500).send({message: `指定されたidが見つかりません: ${req.params.noteId}`})
    }
    note.title = req.body.title
    note.content = req.body.content

    note.save((err, data) => {
      if(err) {
        res.status(500).send({message: "updateに失敗しました"})
      } else {
        res.send(data)
      }
    })
  })
}

exports.delete = (req, res) => {
  Note.remove({_id: req.params.noteId}, (err, data) => {
    if(err) {
      res.status(500).send({message: "消せませんでした"})
    } else {
      res.send({messgage: ""})
    }
  })
}
