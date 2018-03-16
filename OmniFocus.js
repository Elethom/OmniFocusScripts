var app = Application('OmniFocus')
var doc = app.defaultDocument

function tasksWithContext(contextName) {
    return doc.flattenedContexts.whose({name: contextName})[0].tasks()
}

function setCompleted(tasks, completed) {
    tasks.forEach(function (task) {
        if (completed) {
            task.markComplete()
        } else {
            task.markIncomplete()
        }
    })
}

function setDueDate(tasks, date) {
    tasks.forEach(function (task) {
        task.dueDate = date
    })
}
