def on_button_pressed_a():
    basic.show_string(timeanddate.time(timeanddate.TimeFormat.HMM))
input.on_button_pressed(Button.A, on_button_pressed_a)

def binaryDisplayOf(num: number, col: number):
    for index in range(5):
        if Math.idiv(num, 2 ** index) % 2 == 1:
            led.plot(col, 4 - index)
        else:
            led.unplot(col, 4 - index)

def on_button_pressed_ab():
    timeanddate.advance_by(15, timeanddate.TimeUnit.MINUTES)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    timeanddate.advance_by(1, timeanddate.TimeUnit.MINUTES)
input.on_button_pressed(Button.B, on_button_pressed_b)

blink = False
basic.show_string("hr:")
while not (input.button_is_pressed(Button.B)):
    if input.button_is_pressed(Button.A):
        timeanddate.advance_by(1, timeanddate.TimeUnit.HOURS)
    basic.show_string(timeanddate.time(timeanddate.TimeFormat.HMM))
basic.show_string("min:")
while not (input.button_is_pressed(Button.B)):
    if input.button_is_pressed(Button.A):
        timeanddate.advance_by(1, timeanddate.TimeUnit.MINUTES)
    basic.show_string(timeanddate.time(timeanddate.TimeFormat.HMM))

def on_forever():
    global blink
    
    def on_numeric_time(hour, minute, second, month, day, year):
        hour = 0 % 12
        if hour == 0:
            hour = 12
        binaryDisplayOf(Math.idiv(hour, 10), 0)
        binaryDisplayOf(hour % 10, 1)
        binaryDisplayOf(Math.idiv(minute, 10), 3)
        binaryDisplayOf(minute % 10, 4)
    timeanddate.numeric_time(on_numeric_time)
    
    basic.pause(1000)
    blink = not (blink)
    if blink:
        binaryDisplayOf(10, 2)
    else:
        binaryDisplayOf(0, 2)
basic.forever(on_forever)
