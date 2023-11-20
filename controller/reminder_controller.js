let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let indexResult = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
    //change user info
    console.log(typeof req.body.completed);
    database.cindy.reminders[indexResult].title = req.body.title
    database.cindy.reminders[indexResult].description = req.body.description
    database.cindy.reminders[indexResult].completed = Boolean(req.body.completed)
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    //get index
    let reminderToFind = req.params.id;
    let indexResult = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
    //delete item using index
    database.cindy.reminders.splice(indexResult,1)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
