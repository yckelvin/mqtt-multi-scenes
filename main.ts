function do_sleeping () {
    if (pins.analogReadPin(AnalogPin.P1) > 300) {
        pins.analogWritePin(AnalogPin.P16, 256)
    } else {
        pins.analogWritePin(AnalogPin.P16, 0)
    }
}
function do_sunny () {
	
}
function do_rainly () {
	
}
ESP8266_IoT.MqttEvent("myhome/null/mode", ESP8266_IoT.QosList.Qos0, function (message) {
    mode = message
})
function do_security () {
    if (sonar.ping(
    DigitalPin.P13,
    DigitalPin.P14,
    PingUnit.Centimeters
    ) < 10) {
        music.play(music.stringPlayable("C5 B C5 B C5 B C5 B ", 277), music.PlaybackMode.LoopingInBackground)
    } else {
        music.stopAllSounds()
    }
}
let mode = ""
basic.showNumber(0)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("ssid", "password")
let clientID = randint(0, 99999999)
basic.showNumber(1)
ESP8266_IoT.setMQTT(
ESP8266_IoT.SchemeList.TCP,
convertToText(clientID),
"test",
"test",
""
)
ESP8266_IoT.connectMQTT("192.168.0.32", 1884, false)
basic.showNumber(2)
basic.pause(2000)
if (ESP8266_IoT.isMqttBrokerConnected()) {
    basic.showIcon(IconNames.Yes)
}
basic.forever(function () {
    if (mode == "sunny mode") {
        do_sunny()
    } else if (mode == "rainly mode") {
        do_rainly()
    } else if (mode == "security mode") {
        do_security()
    } else if (mode == "sleeping mode") {
        do_sleeping()
    } else {
    	
    }
    basic.pause(5000)
})
