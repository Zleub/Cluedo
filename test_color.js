//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-29T00:24:11+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-29T01:50:49+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let { Color } = require('./server/utils/color.js')

console.log(Color.Foreground.RED() + "Hello" + Color.Modifier.RESET() + " World")
console.log(Color.Foreground.red() + Color.Modifier.bold() + "Hello" + Color.Modifier.reset() + " World")
console.log(Color.Foreground.red().Modifier.bold()("Hello").Modifier.reset()(" World"))
console.log(Color.red().bold()("Hello").reset()(" World"))
console.log(Color.Foreground.Generic(102) + "Hello" + Color.Modifier.RESET() + " World")

let redHello = Color('BACKGROUND')('RED')('BOLD')("Hello")

console.log(redHello('HAHAH')());
console.log(redHello('HOHOH')());
