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
   this.tolLick = 5;
   this.tolCuddle = 5;
   this.tolBark = 5;
   this.prefAge = options.prefAge;
   this.avatar = options.avatar;
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
  age: 4,
  avatar: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xpa1/t31.0-8/1932629_10152418870378352_6293108892780372302_o.jpg'
});

var bella = new Dog("bella",{
  color: ["black"],
  age: 9
});

var emmitt = new Dog("emmitt",{
  color: ["yellow"],
  age: 5,
  avatar: 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xap1/t1.0-9/60479_432375844549_1903986_n.jpg'
});

var herman = new Dog("herman",{
  color: ["black","white"],
  age: 6
});

// ADOPTERS

var dave = new Adopter("dave",{
    tolLick: 10,
    avatar: 'https://dge9rmgqjs8m1.cloudfront.net/global/6e784a56292505372595b9023b9cdc970010/original.6e784a56292505372595b9023b9cdc970010.gif'
});

var emily = new Adopter("emily",{
    tolLick: 2,
    avatar: 'https://asset1.basecamp.com/1940253/people/8112581/photo/avatar.96.gif'
})

var julia = new Adopter("julia",{
    tolLick: 10,
})

var justin = new Adopter("justin",{
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

var adoptername = '';



$('.dog-selection-entry').click(function() {
    dogname = $(this).children("button").html();
    $('#select-player').hide(750);
    $('#select-adopter').show(750);
  }
);


$('.adopter-selection-entry').click(function() {
    adoptername = $(this).children("button").html();
    $('#select-adopter').hide(750);
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
