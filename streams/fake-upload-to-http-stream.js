import { Readable } from "node:stream"

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) return this.push(null)

      const buff = Buffer.from(i.toString())
      this.push(buff)
    }, 1000)
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
})
  .then((response) => response.text())
  .then(console.log)
