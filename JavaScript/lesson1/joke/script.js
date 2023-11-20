const customName = document.getElementById('customname');//名字
const randomize = document.querySelector('.randomize');//按钮
const story = document.querySelector('.story');//故事

let storyText = "今天气温 34 摄氏度，:inserta:出去遛弯。当走到:insertb:门前时，突然就:insertc:。人们都惊呆了，李雷全程目睹但并没有慌，因为:inserta:是一个 130 公斤的胖子，天气又辣么热。";
let insertX = ["怪兽威利","大老爹","圣诞老人"]; 
let insertY = ["肯德基","迪士尼乐园","白宫"]; 
let insertZ = ["自燃了","在人行道化成了一坨泥","变成一条鼻涕虫爬走了"]; 

//数组随机返回
function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

randomize.addEventListener('click', result);

function result() {
	let tp = storyText;
	if(customName.value !== '') {
		let name = customName.value;
		console.log(name);
		tp = tp.replace("李雷",name);
	}
	
	if(document.getElementById("american").checked) {
		let weight = Math.round(300);
		let temperature = Math.round(94);
		tp = tp.replace("34",temperature);
		tp = tp.replace("140",weight);
		tp = tp.replace("华氏度","摄氏度");
		tp = tp.replace("公斤","磅");
	}
	
	tp = tp.replaceAll(":inserta:",randomValueFromArray(insertX));
	tp = tp.replace(":insertb:",randomValueFromArray(insertY));
	tp = tp.replace(":insertc:",randomValueFromArray(insertZ));
	story.textContent = tp;
	story.style.visibility = 'visible';
}