const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

//链式
//只有promise对象才有then()方法，所有必须返回的是promise对象
/*alice1.animate(aliceTumbling, aliceTiming)
		.finished.then(() => {
			return alice2.animate(aliceTumbling, aliceTiming).finished;
		}).then(() => {
			alice3.animate(aliceTumbling, aliceTiming);
		}).catch((error) => {
			console.error(error);
		});
*/

//async和await
//当动画完成时，finished 属性的值为 true，否则为 false
async function fun(){
	animate1 = await alice1.animate(aliceTumbling, aliceTiming).finished;
	if(animate1){
		animate2 = await alice2.animate(aliceTumbling, aliceTiming).finished;
		if(animate1){
			animate3 = await alice3.animate(aliceTumbling, aliceTiming).finished;
			if(!animate1){
				console.error("alice3 error");
			}
		}else{
			console.error("alice2 error");
		}
	}else{
		console.error("alice1 error");
	}
}

fun();