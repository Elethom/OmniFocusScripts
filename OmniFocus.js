var app = Application('OmniFocus')
var doc = app.defaultDocument

function tasksWithContext(contextName) {
    return doc.flattenedContexts.whose({name: contextName})[0].tasks()
}

function setCompleted(tasks, completed) {
    tasks.forEach(function (task) {
        task.completed = completed
    })
}

function setDueDate(tasks, date) {
    tasks.forEach(function (task) {
        task.dueDate = date
    })
}
