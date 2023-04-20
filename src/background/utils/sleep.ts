export function sleep (time: number, random: number) {
    const randomVal = time + Math.round(Math.random() * random * 2) - random;
    return new Promise(resolve => {
        setTimeout(function () {
            resolve({});
        }, time + randomVal);
    });
}
