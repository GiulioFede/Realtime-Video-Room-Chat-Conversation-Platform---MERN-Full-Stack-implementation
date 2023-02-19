
async function sleep(ms) {
    return new Promise(resolve => {
        console.log(`starting ${ms}`);
        setTimeout(() => {
            console.log(`done ${ms}`);
            resolve(ms);
        }, ms);
    });
}



async function func() {
    console.log("Hey I am Line number 1");
    await sleep(5);
    console.log("Hey I am Line number 3");
  
}
console.log("Hey I am Line number 4");
func().then(()=>{}).catch(()=>{});