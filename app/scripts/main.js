// CONSTRUCTORS
// Here is where you'll create your constructors for you player and monster.
// e.g. function Monster(){};
// e.g. function Player(){};


// GLOBAL VARIABLES
// You'll also want to create variables for the specific players and monsters.
// e.g. var purplePeopleEater = new Monster();
// e.g. var tinaFey = new Player();
// e.g. var attackMode = function(target){ Some code that produces an attack - pew, pew! };

var lickPts   =  5;
var cuddlePts = 10;
var barkPts   = -4;



// ACTIONS
// This is where jQuery will come into play and where you'll set a lot of your
// interactions for players and monsters. (e.g. player selection, attack interactions)
// e.g. $('.purple-people-eater').click(function () { Some code that attacks the monster! };


// CONSTRUCTORS

"use strict";

function Dog (name, options) {
   options = options || {};
   this.name = name;
   this.color = options.color;
   this.age = options.age;
   this.breeds = options.breeds || 'mutt';
   this.colors = options.colors;
   this.weight = options.weight;
   this.barkVol = options.barkVol || 5;
   this.avatar = options.avatar;
   this.lick = function(adopter) {
       return adopter.licked = true;
   }
   this.cuddle = function(adopter) {
       return adopter.cuddled = true;
   };
   this.bark = function(adopter) {
       return adopter.barkedAt = true;
   }
}

function Adopter (name, options) {
   options = options || {};
   this.name = name;
   this.licked = false;
   this.cuddled = false;
   this.tolLick = options.tolLick || 5;
   this.tolCuddle = options.tolCuddle || 5;
   this.tolBark = options.tolBark || 5;
   this.prefAge = options.prefAge;
   this.avatar = options.avatar;
}

// not sure if I will use this
function WooScore (dogname, adoptername) {
   this.dogname = dogname;
   this.adoptername = adoptername;
   this.score = 0;
   this.licks = 0;
}






// DOGS

var Moksha = new Dog("Moksha",{
  color: ["brown","white"],
  age: 4,
  avatar: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xpa1/t31.0-8/1932629_10152418870378352_6293108892780372302_o.jpg'
});

var Bella = new Dog("Bella",{
  color: ["black"],
  age: 9
});

var Emmitt = new Dog("Emmitt",{
  color: ["yellow"],
  age: 5,
  avatar: 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xap1/t1.0-9/60479_432375844549_1903986_n.jpg'
});

var Herman = new Dog("Herman",{
  color: ["black","white"],
  age: 6
});

// ADOPTERS

var Dave = new Adopter("Dave",{
    tolLick: 7,
    tolCuddle: 4,
    tolBark: 5,
    avatar: 'https://dge9rmgqjs8m1.cloudfront.net/global/6e784a56292505372595b9023b9cdc970010/original.6e784a56292505372595b9023b9cdc970010.gif'
});

var Emily = new Adopter("Emily",{
    tolLick: 4,
    tolCuddle: 6,
    tolBark: 3,
    avatar: 'https://asset1.basecamp.com/1940253/people/8112581/photo/avatar.96.gif'
})

var Julia = new Adopter("Julia",{
    tolLick: 10,
})

var Justin = new Adopter("Justin",{
    tolLick: 2
})

var Adopters = ([Dave,Emily]);

var adopterNames = Adopters.map(function (adopter) {
    return adopter.name;
});

var Dogs = ([Moksha,Emmitt,Bella,Herman]); // populate these automatically based on dogs defined

var dogNames = Dogs.map(function (dog) {
    return dog.name;
});

var wooScores = [0];

var wooData = [{wooScore: 0, totalLicks: 0, totalCuddles: 0, totalBarks: 0}];


// var wa =  cartesianProductOf(dogNames,adopterNames, wooScores);
var wa =  cartesianProductOf(dogNames,adopterNames, wooData);

var won = false;

var dogname = '';
var dogPos = 0;
var adoptername = '';
var adopterPos = 0;



$('.dog-selection-entry').click(function() {
    event.preventDefault();
    dogname = $(this).children(".dog-selection-button").html(); // need a better way but returning value isn't working
    dogPos = $(this).children(".index-ignore").html();
    var dogView = $('#sidebar-template').html();
    $('#sidebar').append(_.template(dogView,({"imgURL": Dogs[dogPos].avatar, "dogname":dogname})));
    // var dogid = eval(($(this).attr('id')));
    $('#select-player').fadeOut(750);
    $('#select-adopter').fadeIn(750);
    // var dogid = eval($(event.target).html());
    // var dogid = eval(dogname);
  }
);


$('.adopter-selection-entry').click(function() {
    event.preventDefault();
    adoptername = $(this).children("button").html();
    $('#select-adopter').fadeOut(750);
    $('')
    // eval('$(\'#' + dogselectionid + '\')'  ).show();
    $('#main-game').css('opacity',1);
    $('.adopter-avatar img').attr('src', eval(adoptername).avatar); // need better way to do this
});

// for (var i = 0, len = Adopters.length; i < len; i++) {
//     if (Adopters[i].name === "emily") {
//         // match is in array[i]
//         console.log(i);
//     }
// }



$('#lick').click(function() {
    event.preventDefault();
    dogPos = $.inArray(dogname,dogNames);
    adopterPos = $.inArray(adoptername,adopterNames);
    var maxLicks = Adopters[adopterPos].tolLick;
   $.each(wa, function(index,e)  {
        //  if ((jQuery.inArray(dogname,e)) && (jQuery.inArray(adoptername,e))) {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           console.log(wa[index][2].wooScore);
           if (wa[index][2].totalLicks < maxLicks) {
               wa[index][2].wooScore += lickPts;
               wa[index][2].totalLicks++;
               moveProgress(lickPts);
               $(".percent").html(wa[index][2].wooScore);
               if (wa[index][2].wooScore >= 100) {
                   win(wa[index]);
               }
           }
           else {
               wooAlert('That\'s enough licks for now!');
               $("#lick").css('opacity',.15);
           }
        }
   });
});

$('#cuddle').click(function() {
    event.preventDefault();
    dogPos = $.inArray(dogname,dogNames);
    adopterPos = $.inArray(adoptername,adopterNames);
    var maxCuddles = Adopters[adopterPos].tolCuddle;
   $.each(wa, function(index,e)  {
        //  if ((jQuery.inArray(dogname,e)) && (jQuery.inArray(adoptername,e))) {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           if (wa[index][2].totalCuddles < maxCuddles) {
               wa[index][2].totalCuddles++;
               console.log(wa[index][2].wooScore);
               wa[index][2].wooScore += cuddlePts;
               moveProgress(cuddlePts);
               $(".percent").html(wa[index][2].wooScore);
               if (wa[index][2].wooScore >= 100) {
                   win(wa[index]);
               }
            }
            else {
                wooAlert('That\'s enough cuddles for now!');
                $("#cuddle").css('opacity',.15);
            }
        }
   });
});

$('#bark').click(function() {
    event.preventDefault();
    dogPos = $.inArray(dogname,dogNames);
    adopterPos = $.inArray(adoptername,adopterNames);
    var maxBarks = Adopters[adopterPos].tolBark;
   $.each(wa, function(index,e)  {
        //  if ((jQuery.inArray(dogname,e)) && (jQuery.inArray(adoptername,e))) {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           if (wa[index][2].totalBarks < maxBarks) {
               wa[index][2].totalBarks++;
               console.log(wa[index][2].wooScore);
               wa[index][2].wooScore += barkPts;
               moveProgress(barkPts);
               $(".percent").html(wa[index][2].wooScore);
               if (wa[index][2].wooScore < 0) {
                   wa[index][2].wooScore = 0;
                   $(".percent").html(0);
                   wooAlert('Maybe you should try something else!');
               }
               if (wa[index][2].totalBarks === 2 ) {
                   wooAlert('Don\'t give up!');
               }
            }
            else {
                wooAlert('OK, enough with the barking! Come over here!');
                $("#bark").css('opacity',.15);
                wa[index][2].totalCuddles = 0;
                wa[index][2].totalLicks = 0;
                $("#cuddle").css('opacity',1);
                $("#lick").css('opacity',1);
            }
        }
   });
});

$('.close').click(function(event) {
    event.preventDefault();
    $("#alert").fadeOut(700);
    if (won) {
        resetGame();
    }
  });

function win(dogAndAdopter){
    $(".percent").html(100);
    wooAlert(dogAndAdopter[1] + ' wants to adopt ' + dogAndAdopter[0] + '!');
    won = true;
}

function moveProgress(widthChange){
   var totalBarWidth = parseInt($(".woobar").css('width'));
   var progWidth = parseInt($(".woobarprog").css('width'));
   var newWidth = (progWidth + (totalBarWidth*(widthChange/100))) + 'px';
   $(".woobarprog").css('width', newWidth);
}

function resetGame(){
   $(".woobarprog").css('width',0);
   $(".percent").html(0);
   $("#sidebar").empty();
   $("#main-game").css('opacity',.25);
   $("#lick").css('opacity',1);
   $("#cuddle").css('opacity',1);
   $("#bark").css('opacity',1);
   wooData = [{wooScore: 0, totalLicks: 0, totalCuddles: 0, totalBarks: 0}];
   wa =  cartesianProductOf(dogNames,adopterNames, wooData);
   $('#select-player').fadeIn(750);
   won = false;
}

function wooAlert(alertMsg) {
    $('#alert').fadeIn(750);
    $('.alert-msg').html(alertMsg);
    };

// var finddog = $.grep(Dogs, function(e){ return e.name == dogname; });
//
// var dogposition = jQuery.inArray(finddog,Dogs);
// var dogposition2 = jQuery.inArray(Dogs[0],Dogs);
//
// (Dogs[0] === finddog);



// INITIALIZE GAME
// onload

$(document).ready(function() {
  $("h1").lettering();
  $("#main-game").css('opacity',.25);
});



// Cartesian Product function from ** http://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript **

function cartesianProductOf(a,b) {
    return _.reduce(arguments, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }), true);
    }, [ [] ]);
};
