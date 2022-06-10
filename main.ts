input.onButtonPressed(Button.A, function on_button_pressed_a() {
    basic.showString(timeanddate.time(timeanddate.TimeFormat.HMM))
})
function binaryDisplayOf(num: number, col: number) {
    for (let index = 0; index < 5; index++) {
        if (Math.idiv(num, 2 ** index) % 2 == 1) {
            led.plot(col, 4 - index)
        } else {
            led.unplot(col, 4 - index)
        }
        
    }
}

input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    timeanddate.advanceBy(15, timeanddate.TimeUnit.Minutes)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    timeanddate.advanceBy(1, timeanddate.TimeUnit.Minutes)
})
let blink = false
basic.showString("hr:")
while (!input.buttonIsPressed(Button.B)) {
    if (input.buttonIsPressed(Button.A)) {
        timeanddate.advanceBy(1, timeanddate.TimeUnit.Hours)
    }
    
    basic.showString(timeanddate.time(timeanddate.TimeFormat.HMM))
}
basic.showString("min:")
while (!input.buttonIsPressed(Button.B)) {
    if (input.buttonIsPressed(Button.A)) {
        timeanddate.advanceBy(1, timeanddate.TimeUnit.Minutes)
    }
    
    basic.showString(timeanddate.time(timeanddate.TimeFormat.HMM))
}
basic.forever(function on_forever() {
    
    timeanddate.numericTime(function on_numeric_time(hour: number, minute: number, second: number, month: number, day: number, year: number) {
        hour = 0 % 12
        if (hour == 0) {
            hour = 12
        }
        
        binaryDisplayOf(Math.idiv(hour, 10), 0)
        binaryDisplayOf(hour % 10, 1)
        binaryDisplayOf(Math.idiv(minute, 10), 3)
        binaryDisplayOf(minute % 10, 4)
    })
    basic.pause(1000)
    blink = !blink
    if (blink) {
        binaryDisplayOf(10, 2)
    } else {
        binaryDisplayOf(0, 2)
    }
    
})
