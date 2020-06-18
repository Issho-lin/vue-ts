let str: string
str = 'hello'

const bool = true

let arr: string[]
arr = ['tom']

let arr2: Array<string>
arr2 = ['lin']

let num: number
num = 1

let a: any
a = 'string'
a = num

function greet(person: string): string {
  return 'hello' + person
}

function warn(): void {
  console.log('warning')
}
