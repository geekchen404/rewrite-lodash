let number = parseInt(process.argv[2]) || 100

console.log(number + ':')


for (let i = 2; i <= number; i++) {
  while (number % i == 0) {
    console.log(i)
    number = number / i
    if (number == 1) {
      process.exit(0)
    }
  }
}

