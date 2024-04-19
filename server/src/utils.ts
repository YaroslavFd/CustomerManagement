export const generateRandomNumber = (length: number) => {
    let min = Math.pow(10, length - 1)
    let max = Math.pow(10, length) - 1
    return Math.floor(Math.random() * (max - min + 1)) + min
}
