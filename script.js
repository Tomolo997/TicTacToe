'use strict';
const kvadratki = document.querySelectorAll('.kvadratek');
const polje = document.querySelector('polje');
const body = document.querySelector('body');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//when i click i want to display circle or x
//player
let player1IsPlaying = true;
let player2IsPlaying = false;
kvadratki.forEach(kvadratek => {
  kvadratek.addEventListener('click', function (e) {
    const inside = document.createElement('span');
    kvadratek.append(inside);
    let currenClass;
    //določimo current classo
    //torej, če igra prvi igralec potem je currentclassa 'krog'
    if (player1IsPlaying) {
      currenClass = 'krog';
    } else {
      //če pa je drugi igralec, je pa currenClass = križec
      currenClass = 'križec';
    }
    if (kvadratek.firstChild.classList.length < 1) {
      if (player1IsPlaying) {
        inside.classList.add(currenClass);
        //spremenimo vloge, prvi igralec preneha igrati, začne drugi igralec
        player1IsPlaying = false;
        player2IsPlaying = true;
      } else if (player2IsPlaying) {
        inside.classList.add(currenClass);
        //drugi igralec preneha igrati, začne prvi igralec
        player2IsPlaying = false;
        player1IsPlaying = true;
      }
    }

    //function check winner
    //checkamo winnera z parametrom currenClass
    if (checkWinner(currenClass)) {
      body.style.backgroundColor = 'red';
      console.log(currenClass);
    }
  });
});

function checkWinner(currenClass) {
  //returnaj (true or false) če je bar nekaj zadovoljivo podanemu pogoju
  //
  return winningCombinations.some(combinations => {
    //loopaj skozi winning combinations in poglej v vsakei kombinaciji
    return /* true ali false, če ima vsak element isto klasso*/ combinations.every(
      index => {
        return kvadratki[index].firstChild?.classList.contains(currenClass);
        //returnaj samo če je prvi resničen
        //same as if kvadkvadratki[index].firstChild && kvadratki[index].firstChild.classList.contains(currenClass)
      }
    );
  });
}
//check winner ali je true ali false
//vsakic ko kliknemo pogledamo vse winning combinacije,
//v vsaki winning kombinaciji pogledamo če imajo vsi elementi enako classo.

/*
1.klik na kvadrati[0]  => kvadrati[0] dobi klaso 'krog'
=> zaženemo chekcWinner('krog') 
=>loppamo skozi winning combinations in returnamo true, če je bar ena pravilna 
=>loopamo skozi kombinacijo ena po ena
=>v kombinaciji preverjamo, če je vsak index true, true pa je potem če kliknjeni element ima klasso currentClass, katero smo podali že prej, ko smo izbirali playera
    trenutno je false, ker so še vse kombinacije false 

2.klik kliknemo na kvadrati[3] => kvadratek dobi klaso 'križec'
=>loppamo skozi winning combinations in returnamo true, če je bar ena pravilna 
=>loopamo skozi kombinacijo ena po ena
=>v kombinaciji preverjamo, če je vsak index true, true pa je potem če kliknjeni element ima klasso currentClass, katero smo podali že prej, ko smo izbirali playera
    trenutno je false, ker so še vse kombinacije false 

Nadaljujemo vse do 5.klika
5.klik = kliknemo na kvadrati[2] = mu dodamo klaso 'krog'
=>loppamo skozi winning combinations in returnamo true, če je bar ena pravilna 
=>loopamo skozi kombinacijo ena po ena
===> pogledamo skozi kombinacije, returnamo kombinacijo [0,1,2], saj vsak element v kombinaciji vsebuje klaso 'krog'
*/
//if the current class is in all of the elements in one the winning combinations then we are a winner
