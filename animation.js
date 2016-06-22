function shownumAnimation(ranx,rany,num){
	var numbercell=$("#number-cell-"+ranx+"-"+rany);
	numbercell.css('background',getbackcolor(num));
	numbercell.css('color',getnumcolor(num));
	numbercell.text(num);
	numbercell.animate({
		width:"100px",
		height:"100px",
		left:getposleft(ranx,rany),
		top:getpostop(ranx,rany)
	},50);
}
function showmoveanimation(fromx,fromy,endx,endy){
	var numbercell=$("#number-cell-"+fromx+"-"+fromy);
	numbercell.animate({
		left:getposleft(endx,endy),
		top:getpostop(endx,endy)
	},200);
	
}