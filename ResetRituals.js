of = Library('OmniFocus')
weekStartFromMonday = true
msPerDay = 86400000

/** Same thing as the Date one. Makes dayOfWeek happy. */
Number.prototype.getDay = function(){ return Math.floor(this / 86400000 + 4) % 7; }

function dayOfWeek(date_) {
    if (weekStartFromMonday) {
        return (date.getDay() + 6) % 7
    } else {
        return date.getDay()
    }
}

today = Date.now() /* Number */
today = today - today % msPerDay
dailyTasks = of.tasksWithContext('Daily')
dailyTasks.forEach(function(task) {
    dueDate2 = task.dueDate - task.dueDate % msPerDay
    if (dueDate2 < today) {
        task.dueDate = Date(today + task.dueDate % msPerDay)
        task.completed = false
    }
})

console.log("Today: " + dayOfWeek(date)) /* debug */
thisWeek = today - dayOfWeek(today) * msPerDay
weeklyTasks = of.tasksWithContext('Weekly')
weeklyTasks.forEach(function(task) {
    dueDate2 = task.dueDate - task.dueDate % msPerDay
    if (dueDate2 - dayOfWeek(dueDate2) * msPerDay < thisWeek) {
        task.dueDate = Date(thisWeek + task.dueDate % msPerDay + dayOfWeek(dueDate2) * msPerDay)
        task.completed = false
    }
})

monthlyTasks = of.tasksWithContext('Monthly')
monthlyTasks.forEach(function(task) {
    dueDate = task.dueDate()
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
