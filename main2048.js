var board=new Array();
var shock=new Array();
var score;
$(document).ready(function(){
	newgame();
});
function newgame(){
	//初始化页面
	init();
	setnum();
	setnum();
	$(document).keydown(
		function(e){
			e=window.e||e;
			e.preventDefault;
		switch (e.keyCode){
			case 37:if(moveleft()){
				setTimeout("setnum()",210);
				setTimeout("isgameover()",300);
			}
			break;
			case 38:if(movetop()){
				setTimeout("setnum()",210);
				setTimeout("isgameover()",300);
			}
			break;
			case 39:if(moveright()){
				setTimeout("setnum()",210);
				setTimeout("isgameover()",300);
			}
			break;
			case 40:if(movedown()){
				setTimeout("setnum()",210);
				setTimeout("isgameover()",300);
			}
			break;
			default:break;
			}
		}
	)
}
function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}
function gameover(){
	alert("Game Over!");
}
function init(){
	//构建基础样式
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			var gridcell=$("#grid-cell-"+i+"-"+j);
			gridcell.css('left',getposleft(i,j));
			gridcell.css('top',getpostop(i,j));
		}
	for(var i=0;i<4;i++)
	{
		board[i]=new Array();
		shock[i]=new Array();
		for(var j=0;j<4;j++)
			board[i][j]=0;
			shock[i][j]=false;
	}	
	updateboard();
	score=0;
}
function updateboard(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++)
	{	
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numbercell=$("#number-cell-"+i+"-"+j);
			shock[i][j]=false;
			if(board[i][j]== 0){
				numbercell.css('left',getposleft(i,j)+50);
				numbercell.css('top',getpostop(i,j)+50);
				numbercell.css('width',"0px");
				numbercell.css('height',"0px");	
			}
			else{//设置有方块时的样式
				numbercell.css('left',getposleft(i,j));
				numbercell.css('top',getpostop(i,j));
				numbercell.css('width',"100px");
				numbercell.css('height',"100px");
				numbercell.css('background',getbackcolor(board[i][j]));
				numbercell.css('color',getnumcolor(board[i][j]));
				numbercell.text(board[i][j]);
			}
		}
	}
}
function setnum(){
	if(nospace(board)) return false;
	var num=Math.random()>0.5?4:2;//生成初始数字2或者4
	//生成随机位置
	var ranx=parseInt(Math.floor(Math.random()*4));
	var rany=parseInt(Math.floor(Math.random()*4));
	//在随机位置生成数字
	var times=0;
	while(times<50){
		if(board[ranx][rany]==0){
			break;//跳出循环
		}
		else {
			ranx=parseInt(Math.floor(Math.random()*4));
			rany=parseInt(Math.floor(Math.random()*4));
		}
		times++;	
	}
	if(times==50){//如果超过50次，手动设置任意一个为0的位置
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
				ranx=i;
				rany=j;
			}
	}

	board[ranx][rany]=num;
	shownumAnimation(ranx,rany,num);
	return true;
}
function moveleft(){
	if(!canmoveleft(board)) return false;
	//moveleft
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlockHorizontal( i , k , j , board ))
					{//移动的目标位置上不存在方块，而且当前位置与目标位置之间没有其他方块
						showmoveanimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal( i , k , j , board ) &&!shock[i][k])
					{//目标位置和当前位置的值相同且没有其他方块在路径上
						
						showmoveanimation(i,j,i,k);
						board[i][k]+=board[i][j];
						score+=board[i][k];
						board[i][j]=0;

						updatescore(score);
						shock[i][k]=true;
						continue;
					}	
				}
			}
		}
	setTimeout(updateboard,200);
	return true;
}
function movetop(){
	if(!canmovetop(board)) return false;
	//movetop
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockVertical( j , k , i , board ))
					{
						showmoveanimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical( j , k , i , board ) &&!shock[i][k])
					{
						
						showmoveanimation(i,j,k,j);
						board[k][j]+=board[i][j];
						score+=board[k][j];
						board[i][j]=0;

						updatescore(score);
						shock[k][j]=true;

						continue;
					}	
				}
			}
		}
	setTimeout(updateboard,200);
	return true;
}
function moveright(){
	if(!canmoveright(board)) return false;
	//moveright
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board))
					{
						showmoveanimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) &&!shock[i][k])
					{
						showmoveanimation(i,j,i,k);
						board[i][k]+=board[i][j];
						score+=board[i][k];
						board[i][j]=0;

						updatescore(score);
						shock[i][k]=true;
						continue;
					}	
				}
			}
		}
	setTimeout(updateboard,200);
	return true;
}
function movedown(){
	if(!canmoveup(board)) return false;
	//moveup
	
	for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0 &&noBlockVertical( j , i , k , board ))
					{
						showmoveanimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical( j , i , k , board ) &&!shock[i][k])
					{
						
						showmoveanimation(i,j,k,j);
						board[k][j]+=board[i][j];
						score+=board[k][j];
						board[i][j]=0;
						updatescore(score);

						shock[k][j]=true;
						continue;
					}	
				}
			}
		}
	setTimeout(updateboard,200);
	return true;
}
function updatescore(score){
	$("#score").text(score);//更新分数
}