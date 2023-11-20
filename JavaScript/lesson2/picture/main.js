const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const picture = ["./images/pic1.jpg","./images/pic2.jpg","./images/pic3.jpg","./images/pic4.jpg","./images/pic5.jpg"];
/* Declaring the alternative text for each image file */

/* Looping through images */
//加载图片
for(const pic of picture){
	const newImage = document.createElement('img');
	newImage.setAttribute('src', pic);
	newImage.setAttribute('alt', "QAQ");
	newImage.addEventListener("click",PicClick);
	thumbBar.appendChild(newImage);
}
//每张图片的点击事件
function PicClick(e){
	displayedImage.setAttribute('src', e.target.src);
	btn.setAttribute("class","dark");
	btn.textContent = "Darken";
	overlay.style.backgroundColor = "rgba(0,0,0,0)";
}

/* Wiring up the Darken/Lighten button */
//图片的点击按钮
function ButtonClick(e){
	if(btn.getAttribute("class") === "dark"){
		btn.setAttribute("class","light");
		btn.textContent = "Lighten";
		overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
	}else{
		btn.setAttribute("class","dark");
		btn.textContent = "Darken";
		overlay.style.backgroundColor = "rgba(0,0,0,0)";
	}
}

btn.onclick = ButtonClick;