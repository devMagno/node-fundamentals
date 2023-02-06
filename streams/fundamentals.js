import { Readable, Writable, Transform } from "node:stream"

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) return this.push(null)

      const buff = Buffer.from(i.toString())
      this.push(buff)
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    if (transformed < -100) return callback(new Error("Number too low"))

    callback(null, Buffer.from(transformed.toString())) 
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)

    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
