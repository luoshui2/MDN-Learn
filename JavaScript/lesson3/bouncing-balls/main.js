// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');//获得一个开始画画的环境,获取一个对象

const width = canvas.width = window.innerWidth;//窗口的宽度
const height = canvas.height = window.innerHeight;
const p = document.querySelector('p');

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

//小球的数量
const N = 25;
let balls = [];
p.textContent = p.innerHTML + ": " + N;
lastX = 0;
lastY = 0;
//球类
class Shape {
	x;
	y;
	velX;//x方向的速度
	velY;
	exists;//是否存在
	//小球的构造函数
	constructor(x, y, velX, velY,flag){
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.exists = flag;
	}
	//画小球
	DrawBall(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
	}
	//更新小球
	UpdateBall(){
		//小球的位置超出边界
		if(this.x + this.size >= width){
			this.velX = -this.velX;//反向
		}
		
		if (this.x - this.size <= 0) {
			this.velX = -this.velX;
		}
		
		if (this.y + this.size >= height) {
			this.velY = -this.velY;
		}
		
		 if (this.y - this.size <= 0) {
			this.velY = -this.velY;
		}
		//更新位置
		this.x = this.x + this.velX;
		this.y = this.y + this.velY;
	}
	//小球的碰撞检测
	//检测算法：两个小球中心的距离是否小于两个小球的半径之和
	CollideBall(){
		//检测当前小球与每个小球的位置关系
		for(let i = 0;i < balls.length;i++){
			if(balls[i] != this){//不是自己
				const dx = this.x - balls[i].x;
				const dy = this.y - balls[i].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size + balls[i].size) {
					balls[i].color = this.color = randomColor();
				}
			}
		}
	}	
}

//小球类
class Ball extends Shape{
	color;
	size;//半径
	constructor(x, y, velX, velY,flag, color, size){
		super(x,y,velX, velY,flag);
		this.color = color;
		this.size = size;
	}
}

//恶魔球
class EvilCircle extends Shape{
	color = "white";
	size = 20;//半径
	constructor(x, y, velX, velY,flag){
		super(x,y,velX, velY,flag);
	}
	//画小球
	drawBall(){
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.stroke();
	}
	//检查小球的位置
	checkBounds(){
		//小球的位置超出边界
		if(this.x + this.size >= width){
			this.x = this.x - this.size;//反向
		}
		
		if (this.x - this.size <= 0) {
			this.x = this.x + this.size;
		}
		
		if (this.y + this.size >= height) {
			this.y = this.y - this.size;
		}
		
		 if (this.y - this.size <= 0) {
			this.y = this.y + this.size;
		}
	}
	
	//设置小球的键盘控制监听
	setControls(){
		window.onkeydown = (e) => {
			switch (e.key) {
				case "a":
					this.x -= this.velX;
					break;
				case "d":
					this.x += this.velX;
					break;
				case "w":
					this.y -= this.velY;
					break;
				case "s":
					this.y += this.velY;
					break;
			}
		};
	}
	
	
	collideDelete(){
		//检测当前小球与每个小球的位置关系
		for(let i = 0;i < balls.length;i++){
			if(balls[i].exists){
				const dx = this.x - balls[i].x;
				const dy = this.y - balls[i].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size + balls[i].size) {
					balls[i].exists = false;
					let str = p.innerHTML;
					let str1 = str.slice(0,8);
					str = str.slice(8);
					p.textContent = str1 + String(Number(str) - 1);
				}
			}
		}
	}
}

//初始化n个小球
while(balls.length < N){
	let size = random(10, 20);
	let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
		random(0 + size, width - size),
		random(0 + size, height - size),
		random(-7, 7),
		random(-7, 7),
		true,
		randomColor(),
		size,
	);
	balls.push(ball);
}

//初始化恶魔球
evil = new EvilCircle(20,200,20,20,false);
evil.drawBall();
//设置小球的键盘控制监听
//evil.setControls();
//设置小球的鼠标控制监听
const flag = true;
function setMouseControls(){
	window.addEventListener("mousemove",function(event){
		let currentX = event.clientX;
		let currentY = event.clientY;

		if(flag){
			evil.x = currentX;
			evil.y = currentY;
			flag = false;
		}else{
			if (currentX > lastX) {
				console.log('鼠标向右移动');
				evil.x += evil.velX;
			} else if (currentX < lastX) {
				evil.x -= evil.velX;
			}

			if (currentY > lastY) {
				evil.y += evil.velY;
			} else if (currentY < lastY) {
				evil.y -= evil.velY;
			}
		}
		
		evil.drawBall();
		lastX = currentX;
		lastY = currentY;
	});
}

setMouseControls();

function loop() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillRect(0, 0, width, height);

	for (let i = 0; i < balls.length; i++) {
		if(balls[i].exists){
			balls[i].DrawBall();
			balls[i].UpdateBall();
			balls[i].CollideBall();
			balls[i].DrawBall();
		}
	}	
	
	evil.drawBall();
	evil.checkBounds();
	evil.collideDelete();
	//evil.drawBall();
	//使用 requestAnimationFrame() 方法再运行一次函数 —— 当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，这样我们可以得到一个平滑的动画效果
	requestAnimationFrame(loop);
}
loop();



