// Initialise une grille de taille XY vide.
function ClearGrd() {
      Grd = [];
      for(var x=0; x<X; x++){
        Grd[x] = new Array();
        for(y=0; y<Y; y++){
            Grd[x][y] = 0;
        }
      }
    }

// Imprime la grille dans la taille de canevas choisie.
function DimGrd() {
  cnv.width=X*D; cnv.height=Y*D;

  for(var x=0; x<X; x++){
    for(var y=0; y<Y; y++){
      if (x==0||y==0||x==X-1||y==Y-1) {PrntGrd(x,y,TClr[2]);}
      else {PrntGrd(x,y,TClr[Grd[x][y]]);}
    }
  }
}

// Imprime la case x y de la grille si elle n'est pas dans l'espace du menu.
function PrntGrd(xp,yp,clr){
  if (menu==true){ // On imprime pas sur le menu;
    if (xp>49||yp>74){
      PrntCnv(xp,yp,D,clr);
    }
  }
  else {
    if (xp>4||yp>4){
      PrntCnv(xp,yp,D,clr);
    }
  }
}

// Renvoie true si x et y sont des coordonnée valide dans la grille (exception des bords).
function InGrd (x,y){
  var ingrd;
  if (x>0&x<X-1&y>0&y<Y-1){ingrd = true;}
  else {ingrd = false;}
  return (ingrd);
}

// Modifie un pixel ou crée une figure sur la grille.
function ClckGrd(clcx,clcy){
  var TblFig = []; // Tableau qui contiendra des tableaux de 3 valeurs (x,y,stt) correspondant aux coordonnés et status des points de figures connues.
  
  if (fig==1) {
    if (Grd[clcx][clcy]==1) {Grd[clcx][clcy]=0 ; PrntGrd(clcx,clcy,TClr[0]);}
    else {Grd[clcx][clcy]=1 ; PrntGrd(clcx,clcy,TClr[1]);}
  }
  else {
    TblFig = FigList(fig,rot);
    PrntFigGrd(clcx,clcy,TblFig);
  }
}

// Imprime une figure (sous forme de tableau) dans la grille.
function PrntFigGrd (x,y,TblFig) {
  var t;
  t = TblFig.length;
  for (var i=0; i<t ; i++) {
        if (InGrd( x+TblFig[i][0] , y+TblFig[i][1] ) == true) {
          Grd[  x+TblFig[i][0]  ]  [  y+TblFig[i][1]  ]  = Math.abs(Grd[  x+TblFig[i][0]  ]  [  y+TblFig[i][1]  ]-1); 
          PrntGrd(  x+TblFig[i][0]  ,  y+TblFig[i][1]  , TClr[Grd[  x+TblFig[i][0]  ]  [  y+TblFig[i][1]  ]]);
        }
      }
}

