console.log('Hello World!');
console.log('hello');


(
['exemple1.in', 'puzzle1.in'].forEach(f) ==> {
    const input = fs.readFileSync('../inputs/$(f)','utf-8').trim().split('\n');
});