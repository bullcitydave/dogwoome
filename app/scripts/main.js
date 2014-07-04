// CONSTRUCTORS
// Here is where you'll create your constructors for you player and monster.
// e.g. function Monster(){};
// e.g. function Player(){};


// GLOBAL VARIABLES
// You'll also want to create variables for the specific players and monsters.
// e.g. var purplePeopleEater = new Monster();
// e.g. var tinaFey = new Player();
// e.g. var attackMode = function(target){ Some code that produces an attack - pew, pew! };



// ACTIONS
// This is where jQuery will come into play and where you'll set a lot of your
// interactions for players and monsters. (e.g. player selection, attack interactions)
// e.g. $('.purple-people-eater').click(function () { Some code that attacks the monster! };


// CONSTRUCTORS

function Dog (name, options) {
   options = options || {};
   this.name = name;
   this.color = options.color;
   this.age = options.age;
   this.breeds = options.breeds || 'mutt';
   this.colors = options.colors;
   this.weight = options.weight;
   this.barkVol = options.barkVol || 'normal';
   this.lick = function(adopter) {
       return adopter.licked = true;
   }
   this.cuddle = function(adopter) {
       return adopter.cuddled = true;
   };
}

function Adopter (name, options) {
   options = options || {};
   this.name = name;
   this.licked = false;
   this.cuddled = false;
   this.tolLick = 5;
   this.tolCuddle = 5;
   this.prefAge = options.prefAge;
}

function WooScore (dogname, adoptername, score) {
   this.dogname = dogname;
   this.adoptername = adoptername;
   this.score = score;
}


// INITIALIZE GAME
// onload

$("#main-game").css('opacity',.25);



// DOGS

var moksha = new Dog("moksha",{
  color: ["brown","white"],
  age: 4
});

var bella = new Dog("bella",{
  color: ["black"],
  age: 9
});

var emmitt = new Dog("emmitt",{
  color: ["yellow"],
  age: 5
});

var herman = new Dog("herman",{
  color: ["black","white"],
  age: 6
});

// ADOPTERS

var dave = new Adopter("dave",{
    tolLick: 10
})

var emily = new Adopter("emily",{
    tolLick: 2
})

var Adopters = ([dave,emily]);

var adopterNames = Adopters.map(function (adopter) {
    return adopter.name;
});

var Dogs = ([moksha,bella,emmitt,herman]); // populate these automatically based on dogs defined

var dogNames = Dogs.map(function (dog) {
    return dog.name;
});

var Zeroes = [0];

var wa =  cartesianProductOf(dogNames,adopterNames, Zeroes);

var dogname = '';

var dogposition = jQuery.inArray(dogname,dogNames);

var adoptername = "emily";


var adopterposition = jQuery.inArray(adoptername,adopterNames);


$('.dog-selection-entry').click(function() {
    dogname = $(this).children("button").html();
    $('#select-player').hide(750);
    $('#main-game').css('opacity',1);
  }
);



$('#lick').click(function() {
    dogPos = $.inArray(dogname,dogNames);
    adopterPos = $.inArray(adoptername,adopterNames);
   $.each(wa, function(index,e)  {
        //  if ((jQuery.inArray(dogname,e)) && (jQuery.inArray(adoptername,e))) {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           console.log(wa[index][2]);
           wa[index][2] += 5;
           moveProgress(5);
           $(".percent").html(wa[index][2]);
           if (wa[index][2] >= 100) {
               win(wa[index]);
           }
        }
   });
});

$('#cuddle').click(function() {
    dogPos = $.inArray(dogname,dogNames);
    adopterPos = $.inArray(adoptername,adopterNames);
   $.each(wa, function(index,e)  {
        //  if ((jQuery.inArray(dogname,e)) && (jQuery.inArray(adoptername,e))) {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           console.log(wa[index][2]);
           wa[index][2] += 10;
           moveProgress(10);
           $(".percent").html(wa[index][2]);
           if (wa[index][2] >= 100) {
               win(wa[index]);
           }
        }
   });
});

$('#bark').click(function() {
    dogPos = $.inArray(dogname,dogNames);
    adopterPos = $.inArray(adoptername,adopterNames);
   $.each(wa, function(index,e)  {
        //  if ((jQuery.inArray(dogname,e)) && (jQuery.inArray(adoptername,e))) {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           console.log(wa[index][2]);
           wa[index][2] -= 4;
           moveProgress(-4);
           $(".percent").html(wa[index][2]);
           if (wa[index][2] >= 100) {
               console.log(wa[index][2]);
               if (wa[index][2] > 100) {
                   wa[index][2] = 100;
                   console.log(wa[index][2]);
                   $(".percent").html(wa[index][2]);
                 }
               win(wa[index]);
           }
           if (wa[index][2] < 0) {
               wa[index][2] = 0;
               $(".percent").html(wa[index][2]);
               lose(wa[index]);
           }
        }
   });
});



function win(dogAndAdopter){
  alert(dogAndAdopter[1] + ' wants to adopt ' + dogAndAdopter[0] + '!');
  resetGame();
}

function lose(dogAndAdopter){
  alert(dogAndAdopter[1] + ' doesn\'t want to adopt ' + dogAndAdopter[0] + ' today. Maybe some other time.');
  resetGame();
}
function moveProgress(widthChange){
   var totalBarWidth = parseInt($(".woobar").css('width'));
   var progWidth = parseInt($(".woobarprog").css('width'));
   var newWidth = (progWidth + (totalBarWidth*(widthChange/100))) + 'px';
   $(".woobarprog").css('width', newWidth);
}

function resetGame(){
   $(".woobarprog").css('width',0);
   $(".main-game").css('opacity',.25);
   wa =  cartesianProductOf(dogNames,adopterNames, Zeroes);

}

// var finddog = $.grep(Dogs, function(e){ return e.name == dogname; });
//
// var dogposition = jQuery.inArray(finddog,Dogs);
// var dogposition2 = jQuery.inArray(Dogs[0],Dogs);
//
// (Dogs[0] === finddog);



// INITIALIZE GAME
// onload

$("#main-game").css('opacity',.25);




// Initialize

// Cartesian Produt function from ** http://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript **

function cartesianProductOf(a,b) {
    return _.reduce(arguments, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }), true);
    }, [ [] ]);
};
