// 生成随机字符串
const upper_letters = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';
const lower_letters = upper_letters.toLocaleLowerCase();
const string = '0123456789' + upper_letters + lower_letters;
export function randomStr(num: number) {
    let result = '', len = string.length;
    for (let i = 0; i < num; i++) {
        const random =  Math.floor(Math.random() * len);
        result += string.charAt(random);
    }
    return result;
}
