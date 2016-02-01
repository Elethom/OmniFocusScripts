of = Library('OmniFocus')
weekStartFromMonday = true

dailyTasks = of.tasksWithContext('Daily')
dailyTasks.forEach(function(task) {
    dueDate = task.dueDate()
    if (dueDate === null) return
    date = new Date
    if (dueDate.getFullYear() < date.getFullYear() ||
        (dueDate.getFullYear() === date.getFullYear() && dueDate.getMonth() < date.getMonth()) ||
        (dueDate.getFullYear() === date.getFullYear() && dueDate.getMonth() === date.getMonth() && dueDate.getDate() < date.getDate())) {
        date.setHours(task.dueDate().getHours())
        date.setMinutes(task.dueDate().getMinutes())
        task.dueDate = date
        task.completed = false
    }
})

function dayOfWeek(date) {
    if (weekStartFromMonday) {
        return (date.getDay() + 6) % 7
    } else {
        return date.getDay()
    }
}
weeklyTasks = of.tasksWithContext('Weekly')
weeklyTasks.forEach(function(task) {
    dueDate = task.dueDate()
    if (dueDate === null) return
    date = new Date
    dueDay = dayOfWeek(dueDate)
    console.log(dayOfWeek(date))
    dueDate.setDate(dueDate.getDate() - dueDay)
    date.setDate(date.getDate() - dayOfWeek(date))
    if (dueDate.getFullYear() < date.getFullYear() ||
        (dueDate.getFullYear() === date.getFullYear() && dueDate.getMonth() < date.getMonth()) ||
        (dueDate.getFullYear() === date.getFullYear() && dueDate.getMonth() === date.getMonth() && dueDate.getDate() < date.getDate())) {
        date.setDate(date.getDate() + dueDay)
        date.setHours(dueDate.getHours())
        date.setMinutes(dueDate.getMinutes())
        task.dueDate = date
        task.completed = false
    }
})

monthlyTasks = of.tasksWithContext('Monthly')
monthlyTasks.forEach(function(task) {
    dueDate = task.dueDate()
    if (dueDate === null) return
    date = new Date
    if (dueDate.getFullYear() < date.getFullYear() ||
        (dueDate.getFullYear() === date.getFullYear() && dueDate.getMonth() < date.getMonth())) {
        date.setDate(dueDate.getDate())
        date.setHours(dueDate.getHours())
        date.setMinutes(dueDate.getMinutes())
        task.dueDate = date
        task.completed = false
    }
})

annualTasks = of.tasksWithContext('Annual')
annualTasks.forEach(function(task) {
    dueDate = task.dueDate()
    if (dueDate === null) return
    date = new Date
    if (dueDate.getFullYear() < date.getFullYear()) {
        date.setMonth(dueDate.getMonth())
        date.setDate(dueDate.getDate())
        date.setHours(dueDate.getHours())
        date.setMinutes(dueDate.getMinutes())
        task.dueDate = date
        task.completed = false
    }
})
