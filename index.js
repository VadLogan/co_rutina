import co from 'co';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";




const wait = (time, times = 0) => new Promise((res,rej)=>{
    setTimeout(()=> res(`$resolved$ ${++times}`), time);
});

function* traningGenerator(){
    const prom = yield wait(1000);
    const res = yield prom;
    return res;
}
function execute(generator, yieldValue) {
    // if(generator.isPrototypeOf()){
    //     console.dir( generator);
    //    console.info('use function* as argument');
    //     return;
    // }

    // let next = generator.next(yieldValue);
    // if(next.done) return next.value;
    // if(!(next.value instanceof Promise)) return execute( generator, next.value)
    // return  next.value.then(
    //     result => execute(generator, result),
    //     err => generator.throw(err)
    //          );

        let next = generator.next(yieldValue);
        if(next.done) {
            return next.value
        } else if (next.value instanceof Promise) {
        return next.value.then(
           result => execute(generator, result),
           err => generator.throw(err)
                );
        }else{
            execute(generator, next.value)
        }
}

execute(getData()).then(res => console.log(res));



function* getData() {
    const resUsers = yield axios.get('http://jsonplaceholder.typicode.com/users/');
    let users = [...resUsers.data.map(({username, email}) => ({ nick: username, email: email }))];
    const resPosts = yield axios.get('http://jsonplaceholder.typicode.com/posts/1');
    const resComments = yield axios.get('http://jsonplaceholder.typicode.com/comments/1');
return { users, resPosts, resComments };
}


// co(getData).then( res => console.log(res));
//myCo(getData).then( res => console.log(res));



function myCo(func){
    if(typeof func !== 'function'){
        console.info('use function* as argument')
            return;
}	   
const gener = func();

for( let gen of gener){
        if(gen instanceof Promise){
           return Promise.resolve(gen)
    }
    }
}