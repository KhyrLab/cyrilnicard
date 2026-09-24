// Fonction pour définir les setup de couleur.
    function SetUpClr(n) {
      if (n<0) {n=0;}
      if (n>9) {n=9;}
      TClr = [];
      setupclr = Math.round(n);
      switch(setupclr) {
        case 0:
        TClr = ['#000000','#FFFFFF','#808080'];
        break;
        case 1:
        TClr = ['#FFFFFF','#000000','#808080'];
        break;
        case 2:
        TClr = ['#FFFFFF','#000080','#000000'];
        break;
        case 3:
        TClr = ['#FFFFFF','#800000','#000000'];
        break;
        case 4:
        TClr = ['#FFFFFF','#008000','#000000'];
        break;

        case 5:
        TClr = ['#000000','#00FFFF','#000080'];;
        break;
        case 6:
        TClr = ['#FFFFFF','#000000','#808080'];
        break;
        case 7:
        TClr = ['#FFFFFF','#000000','#808080'];
        break;
        case 8:
        TClr = ['#FFFFFF','#000000','#808080'];
        break;
        case 9:
        TClr = ['#FFFFFF','#000000','#808080'];
        break;

        default:
        alert("ProblemColor");
        break;

      }
    }

    // Fonction pour définir les setup de fréquence.
    function SetUpFrq(n) {
        if (n<0) {n=0;}
        if (n>9) {n=9;}
        frq = Math.pow(2,n);
        setupfrq = Math.round(n);
      } 

    function SetUpFig(n){
      var nbfig = 15;
      if (n<1) {n=nbfig;}
      if (n>nbfig) {n=1;}
      fig = Math.round(n+49);
      setupfig = Math.round(n);
    }

    function SetUpRot(n){
      if (n<0) {n=3;}
      if (n>3) {n=0;}
      rot = Math.round(n);
      setuprot = Math.round(n);
    }