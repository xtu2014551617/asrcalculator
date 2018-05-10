function calExpress(express) {
  var l = new Array()
  var op = new Array()
  var map = {
    "+": "1",
    "-": "1",
    "*": "2",
    "/": "2",
    "(": "3",
  }

  for (var i = 0; i < express.length; i++) {
    var num = parseFloat(express.substring(i, express.length))
    if (!isNaN(num)) {
      i += num.toString().length
      l.push(num)
    }
    var c = express.charAt(i)
    if (c == '=') {
      break
    }
    if (c == '(') {
      op.push(c)
    } else if (c == ')') {
      while (op.length != 0) {
        var p = op.pop()
        if (p == '(') {
          break
        }
        l.push(p)
      }
    } else {
      while (op.length != 0) {
        var p = op[op.length - 1]
        if (p == '(' || map[p] < map[c]) {
          break
        } else {
          l.push(op.pop())
        }
      }
      op.push(c)
    }
  }
  while (op.length != 0) {
    l.push(op.pop())
  }
  var nums = new Array()
  for (var i = 0; i < l.length; i++) {
    if (!isNaN(Number(l[i]))) {
      nums.push(l[i])
    } else {
      var num1 = nums.pop()
      var num2 = nums.pop()
      if (l[i] == "*") {
        nums.push(num1 * num2)
      } else if (l[i] == "/") {
        nums.push(parseFloat((num2 / num1).toFixed(10)))
      } else if (l[i] == "+") {
        nums.push(num1 + num2)
      } else if (l[i] == "-") {
        nums.push(num2 - num1)
      }
    }
  }
  return nums[0];
}

module.exports = {
  calExpress: calExpress
}
