function FctIni(n) {
      switch (n) { // Initialisation de plusieurs configurations fixées
      case 0: // 720p
        TIT="GoL"; N =0;
        X=320; Y=180; D=4;
        Xm = 100; Ym=150; Dm=2; XYmmin =9;
        menu = true ; play = false;

        SetUpFig(1) ; SetUpRot(0); SetUpFrq(5) ; SetUpClr(0);

        ClearGrd(); ClearMn(); // toutes les cellules sont mortes
        break; 

      case 1: // 1080p
        TIT="GoL"; N =0;
        X=480; Y=270; D=4;
        Xm = 100; Ym=150; Dm=2; XYmmin =9;
        menu = true; play = false;

        SetUpFig(1) ; SetUpRot(0); SetUpFrq(5) ; SetUpClr(0);

        ClearGrd(); ClearMn(); // toutes les cellules sont mortes
        break;

        case 10: // 1080p
        TIT="GoL"; N =0;
        play = false;
        ClearGrd(); ClearMn(); // toutes les cellules sont mortes
        break;

      default:
        break;
      }
    }