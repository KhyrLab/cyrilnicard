
function ClearMn() {
  Mn = [];
  for(var x=0; x<(Xm/10); x++){
    Mn[x] = new Array();
    for(y=0; y<(Ym/10); y++){
        Mn[x][y] = 10;
    }
  }
  
  Mn[0][2]=15;
  Mn[0][3]=16;
  Mn[0][4]=17;
  Mn[0][5]=18;
  Mn[0][7]=19;
  Mn[1][7]=20;
  Mn[2][7]=21;
  Mn[3][7]=22;


  // Compteur 1;
  Mn[2][1]=23;
  Mn[3][0]=11;
  Mn[3][1]=setupfrq;
  Mn[3][2]=12;

  // Compteur 1;
  Mn[5][1]=24;
  Mn[6][0]=11;
  Mn[6][1]=setupclr;
  Mn[6][2]=12;

    // Compteur 1;
  Mn[8][1]=25;
  Mn[9][0]=11;
  Mn[9][1]=0;
  Mn[9][2]=12;

}

function DimMn(b) {
  switch (b) {
    case true:
    Mn[0][0] = 14;
    for(var x=0 ; x<Xm/10; x++) {  for(var y=0 ; y<Ym/10; y++) {  PrntMnCs(x,y,Mn[x][y]) ;  }  }

    PrntMnFig(fig);
    
    break;
    case false:
    Mn[0][0] = 13;
    PrntMnCs(0,0,Mn[0][0]);
    break;
  }
}

function PxOnMenu (px,py) {
  var cliconmenu;
  if (px<Xm*Dm&py<Ym*Dm&menu==true){cliconmenu = true;}
  else if (px<20&py<20&menu==false){cliconmenu = true;}
  else {cliconmenu = false;}
  return (cliconmenu);
}


function ClckMn (x,y) {
	

	// Bouton menu
	if (x==0&y==0) {
		if (menu==true) {menu=false;}
		else {menu = true;}
		DimGrd();
		DimMn(menu);
	}

	// Bouton Play / Pause / Step / Reset
	else if (x==0&y==2) {
		if (play==true) {}
		else {
		play = true ;
		Step();
		}
	}
	else if (x==0&y==3) {
		play=false ;
	}
	else if (x==0&y==4) {
		play = false; 
		Step() ;
	}
	else if (x==0&y==5) {
		FctIni(10); DimGrd(); DimMn(menu);
	}

	// Bouton pour les options de figures
	else if (x==0&y==7) {
		SetUpFig(setupfig-1);
		DimMn(menu);PrntMnFig(fig);
	}
	else if (x==1&y==7) {
		SetUpFig(setupfig+1);
		DimMn(menu);PrntMnFig(fig);
	}
	else if (x==2&y==7) {
		SetUpRot(setuprot+1);
		DimMn(menu);PrntMnFig(fig);
	}
	else if (x==3&y==7) {
		SetUpRot(setuprot-1);
		DimMn(menu);PrntMnFig(fig);
	}

	// Bouton Vitesse
	else if (x==3&y==0) {
		SetUpFrq(setupfrq+1);
		Mn[3][1] = setupfrq;
		PrntMnCs (3,1,setupfrq);
	}
	else if (x==3&y==2) {
		SetUpFrq(setupfrq-1);
		Mn[3][1] = setupfrq;
		PrntMnCs (3,1,setupfrq);
	}

	// Bouton Couleurs
	else if (x==6&y==0) {
		SetUpClr(setupclr+1);
		Mn[6][1] = setupclr;
		DimGrd();DimMn(menu);
	}
	else if (x==6&y==2) {
		SetUpClr(setupclr-1);
		Mn[6][1] = setupclr;
		DimGrd();DimMn(menu);
	}

	// Click sur la figure
	else if (y>7) {
		SetUpFig(setupfig+1);
		DimMn(menu);PrntMnFig(fig);
	}
}


function PrntMnCs (xp,yp,id){
    
    var TblFig = FigList(id,0);
	var t;


	// Remet la case tout en noir
    for (var i=0; i<10; i++) { 
  		for (var j=0; j<10; j++) {
    		Prnt(  20*xp+2*i  ,  20*yp+2*j  , 2  ,  2  , TClr[0]  ) ;
  		}
    }

	// Defini les bordures

	if (id!=10) {
		for (var j=0; j<9; j++) { Prnt(  20*xp+18  ,  20*yp+2*j  ,  2  ,  2  ,  TClr[2]  ) ; }
		for (var i=0; i<9; i++) { Prnt(  20*xp+2*i  ,  20*yp+18  ,  2  ,  2  ,  TClr[2]  ) ; }
	}
	
	if (xp<9) { if (Mn[xp+1][yp]!=10  )  { for (var j=0; j<9; j++) { Prnt(  20*xp+18  ,  20*yp+2*j  ,  2  ,  2  ,  TClr[2]  ) ;  }}}
	if (yp<14) { if (Mn[xp][yp+1]!=10  )  {  for (var i=0; i<9; i++) { Prnt(  20*xp+2*i  ,  20*yp+18  ,  2  ,  2  ,  TClr[2]  ) ;  }}}

	if (xp==9) { for (var j=0; j<10; j++) { Prnt(  20*xp+18  ,  20*yp+2*j  ,  2  ,  2  ,  TClr[2]  ) ;  }}
	if (yp==14||yp==7) { for (var i=0; i<10; i++) { Prnt(  20*xp+2*i  ,  20*yp+18  ,  2  ,  2  ,  TClr[2]  ) ;  }}

    
	// Dessine le motif dans la case
	t = TblFig.length;
	for (var i=0; i<t ; i++) {
		Prnt(  20*xp+8+2*TblFig[i][0]  ,  20*yp+8+2*TblFig[i][1]  ,  2  ,  2  ,  TClr[1]  );
  	}
}

function PrntMnFig (id) {
	var TblFig = FigList(id,rot);
	var t;
	var Dfig = 4;

	t = TblFig.length;

	if (t<20) {Dfig=8;}
	if (t<10) {Dfig=16;}

	if (menu==true) {
		for (var i=0; i<t ; i++) {
			Prnt(  100+Dfig*(TblFig[i][0]-0.5)  ,  230+Dfig*(TblFig[i][1]-0.5)  ,  Dfig  ,  Dfig  ,  TClr[1]  );
	  	}
	}
}