//要猜的数
let randomNumber = Math.floor(Math.random() * 100) + 1;
//猜的次数
let count = 0;
//游戏的次数
const N = 5;
//开始新游戏的按钮
let newButton;

const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

//重置游戏
function reset(){
	count = 0;
	const resetP = document.querySelectorAll(".resultParas p");
	for(const i of resetP){
		i.textContent = "";
	}
	newButton.parentNode.removeChild(newButton);
	
	guessField.disabled = false;
	guessSubmit.disabled = false;
	
	guessField.value = "";
	guessField.focus();
	
	lastResult.style.backgroundColor = "white";
	
	randomNumber = Math.floor(Math.random() * 100) + 1;
}

//游戏结束
function setGameOver(){
	guessField.disabled = true;
	guessSubmit.disabled = true;
	newButton = document.createElement("button");
	newButton.textContent = "Start new game";
	document.body.append(newButton);
	newButton.addEventListener("click",reset);
}

//submit 按钮的点击事件
function checkGuess(){
	const number = Number(guessField.value);
	if(count === 0){
		guesses.textContent = "Previous guesses:";
	}
	guesses.textContent = guesses.textContent + " " + number;
	if(number === randomNumber){
		lastResult.textContent = "Congratulations! You got it right!";
		lastResult.style.backgroundColor = "green";
		lowOrHi.textContent = "";
		setGameOver();
	}else{
		count++;
		if(count >= N){
			lastResult.textContent = "!!!GAME OVER!!!the number is " + randomNumber;
			lowOrHi.textContent = "";
			setGameOver();
		}else{
			lastResult.textContent = "wrong";
			lastResult.style.backgroundColor = "red";
			if(number > randomNumber){
				lowOrHi.textContent = "Last guess was too high!";
			}else{
				lowOrHi.textContent = "Last guess was too low!";
			}
		}
	}
	guessField.value = "";
	guessField.focus();
}
guessSubmit.addEventListener("click",checkGuess);
