function getpostop(i,j){
	return 20+i*120;
}
function getposleft(i,j){
	return 20+j*120;
}
function getbackcolor(value){
	switch (value){
		case 2:return "#eee4da"; break;
		case 4:return "#ede0c8"; break;
		case 8:return "#f2b179"; break;
		case 16:return "#f59563"; break;
		case 32:return "#f67c5f"; break;
		case 64:return "#fb5e3b"; break;
		case 128:return "#edcf72"; break;
		case 256:return "#ed0061"; break;
		case 512:return "#9c0"; break;
		case 1024:return "#33b5e5"; break;
		case 2048:return "#09c"; break;
		case 4096:return "#a6c"; break;
		case 8192:return "#93c"; break;
	}
	return "black";
}
function getnumcolor(value){
	if(value==2||value==4){
		return "#776e65"
	}
	else return "white";
}
function nospace(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]==0)
				return false;
		}
	return true;
}
function canmoveleft(board){
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0)
			{
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
				return true;
			}
		}
	return false;
}
function canmovetop(board){
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0)
			{
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j])
				return true;
			}
		}
	return false;
}
function canmoveright(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<3;j++){
			if(board[i][j]!=0)
			{
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j])
				return true;
			}
		}
	return false;
}
function canmoveup(board){
	for(var i=0;i<3;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0)
			{
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j])
				return true;
			}
		}
	return false;
}
function noBlockHorizontal(row,col1,col2,board){
	//竖直方向上没有其他方块
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0)
		return false;
	}
	return true;
}
function noBlockVertical(col,row1,row2,board){
	//水平方向上没有其他方块
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0)
		return false;
	}
	return true;
}
function nomove(board){
	//都不能移动
	if(canmoveup(board)||canmoveright(board)||canmovetop(board)||canmoveleft(board)) return false;
	return true;
}