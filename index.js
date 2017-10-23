const co = require('co');
const axios = require('axios');
const regeneratorRuntime = require("regenerator-runtime");

let  execute = (generator, yieldValue)=>{

        let next = generator.next(yieldValue);
        if(next.done) return next.value
        if (next.value instanceof Promise) {
          return next.value.then(
            result => execute(generator, result),
            err => generator.throw(err));
        }else{
            execute(generator, next.value)
        }
};

function* getData() {
    const resUsers = yield axios.get('http://jsonplaceholder.typicode.com/users/');
    let users = [...resUsers.data.map(({username, email}) => ({ nick: username, email: email }))];
    const resPosts = yield axios.get('http://jsonplaceholder.typicode.com/posts/1');
    const resComments = yield axios.get('http://jsonplaceholder.typicode.com/comments/1');
        return { users, resPosts, resComments };
}

execute(getData()).then(res => console.log(res));
co(getData()).then( res => console.log(res));

