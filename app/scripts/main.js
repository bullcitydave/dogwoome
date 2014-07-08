'use strict';

//// CONSTRUCTORS

function Dog (name, options) {
   options = options || {};
   this.name = name;
   this.avatar = options.avatar;
   this.color = options.color;
   this.age = options.age;
   /* for possible future use */
  //  this.breeds = options.breeds || 'mutt';
  //  this.weight = options.weight;
  //  this.barkVol = options.barkVol || 5;
  //  this.lick = function(adopter) {
  //      return adopter.licked = true;
  //  }  // not used
  //  this.cuddle = function(adopter) {
  //      return adopter.cuddled = true;
  //  };  // not used
  //  this.bark = function(adopter) {
  //      return adopter.barkedAt = true;
  // }
}

function Adopter (name, options) {
   options = options || {};
   this.name = name;
   this.avatar = options.avatar;
   this.tolLick = options.tolLick || 5;
   this.tolCuddle = options.tolCuddle || 5;
   this.tolBark = options.tolBark || 5;
  /* for possible future use */
  // this.licked = false;  // not used
  // this.cuddled = false;  // not used
  // this.prefAge = options.prefAge;  // not used
}



//// GLOBAL VARIABLES

// DOGS

var Moksha = new Dog("Moksha",{
    color: ["brown","white"],
    age: 4,
    avatar: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xpa1/t31.0-8/1932629_10152418870378352_6293108892780372302_o.jpg'
});

var Emmitt = new Dog("Emmitt",{
    color: ["yellow"],
    age: 5,
    avatar: 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xap1/t1.0-9/60479_432375844549_1903986_n.jpg'
});

var Bella = new Dog("Bella",{
    color: ["black"],
    age: 2,
    avatar: 'https://scontent-b-lga.xx.fbcdn.net/hphotos-xfp1/t1.0-9/4541_89487809549_852660_n.jpg'
});

var Herman = new Dog("Herman",{
    color: ["black","white"],
    age: 6,
    avatar: 'http://i.imgur.com/s7mpWGj.jpg'
});

var Dogs = ([Moksha,Emmitt,Bella,Herman]);

var dogNames = Dogs.map(function (dog) {
    return dog.name;
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
    tolCuddle: 3,
    tolBark: 7,
    avatar: 'https://avatars0.githubusercontent.com/u/955558?s=460'
})

var Talal = new Adopter("Talal",{
    avatar: 'https://avatars1.githubusercontent.com/u/3066028?s=400'
})

var Adopters = ([Dave,Emily,Julia,Talal]);

var adopterNames = Adopters.map(function (adopter) {
    return adopter.name;
});


// DEFAULT POINT VALUES FOR ACTIONS

var lickPts   =  5;
var cuddlePts = 10;
var barkPts   = -4;


// INITIALIZED STATE OF WOO DATA

var wooData = [{wooScore: 0, totalLicks: 0, totalCuddles: 0, totalBarks: 0}];


// DATA STRUCTURE
// wa = Woo Array
// created for use in multi-player/dog game with multiple active potential adopters

var wa =  cartesianProductOf(dogNames, adopterNames, wooData);


// DOM

var game          = $('#main-game');
var sidebar       = $('#sidebar');
var selectplayer  = $('#select-player');
var selectadopter = $('#select-adopter');
var lick          = $('#lick');
var cuddle        = $('#cuddle');
var bark          = $('#bark');
var percent       = $(".percent")
var woobarprog    = $(".woobarprog")


// TEMPLATES

var dogSelectView     = $('#dog-select-template').html();
var adopterSelectView = $('#adopter-select-template').html();
var dogView           = $('#sidebar-template').html();

// MISCELLANEOUS

var won         = false;
var dogname     = '';
var adoptername = '';
var dogpos      = 0;   // position of the dog in the the Woo Array
var adopterpos  = 0;  // position of the adopter in the Woo Array


//// ACTIONS

// INITIALIZE GAME

$(document).ready(function() {
    $("h1").lettering();
    populateDogChoices(Dogs);
    populateAdopterChoices(Adopters);

    $('.dog-selection-entry').click(function() {
        event.preventDefault();
        dogname = $(this).children(".dog-selection-button").html();
        dogpos = $.inArray(dogname,dogNames);
        sidebar.append(_.template(dogView,({"imgURL": Dogs[dogpos].avatar, "dogname":dogname})));
        selectplayer.fadeOut(750);
        selectadopter.fadeIn(750);
      }
    );

    $('.adopter-selection-entry').click(function() {
        event.preventDefault();
        adoptername = $(this).children("button").html();
        adopterpos = $.inArray(adoptername,adopterNames);
        selectadopter.fadeOut(750);
        game.css('opacity',1);
        $('.adopter-avatar img').attr('src', eval(adoptername).avatar); // need better way to do this
    });
});


function populateAdopterChoices(adopterlist){
    for (var i = 0; i < (_.size(adopterlist)); i++)
        {
            $('.adopter-choices').append(_.template(adopterSelectView,({"imgURL": adopterlist[i].avatar, "adoptername": adopterlist[i].name})));
        }
}

function populateDogChoices(doglist){
    for (var i = 0; i < (_.size(doglist)); i++)
        {
            $('.dog-choices').append(_.template(dogSelectView,({"imgURL": doglist[i].avatar, "dogname": doglist[i].name, "dogindex":i})));
        }
}

lick.click(function() {
    event.preventDefault();
    var maxLicks = Adopters[adopterpos].tolLick;
   $.each(wa, function(index,e)  {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           if (e[2].totalLicks < maxLicks) {
               e[2].wooScore += lickPts;
               e[2].totalLicks++;
               moveProgress(lickPts);
               percent.html(e[2].wooScore);
               if (e[2].wooScore >= 100) {
                   win(e);
               }
           }
           else {
               wooAlert('That\'s enough licks for now!');
               lick.css('opacity',.15);
           }
        }
   });
});

cuddle.click(function() {
    event.preventDefault();
    var maxCuddles = Adopters[adopterpos].tolCuddle;
   $.each(wa, function(index,e)  {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           if (e[2].totalCuddles < maxCuddles) {
               e[2].totalCuddles++;
               e[2].wooScore += cuddlePts;
               moveProgress(cuddlePts);
               percent.html(e[2].wooScore);
               if (e[2].wooScore >= 100) {
                   win(e);
               }
            }
            else {
                wooAlert('That\'s enough cuddles for now!');
                cuddle.css('opacity',.15);
            }
        }
   });
});

bark.click(function() {
    event.preventDefault();
    woof();
    var maxBarks = Adopters[adopterpos].tolBark;
   $.each(wa, function(index,e)  {
       if ((e[0] === dogname) && (e[1] === adoptername)) {
           if (e[2].totalBarks < maxBarks) {
               e[2].totalBarks++;
               e[2].wooScore += barkPts;
               moveProgress(barkPts);
               percent.html(e[2].wooScore);
               if (e[2].wooScore < 0) {
                   e[2].wooScore = 0;
                   percent.html(0);
                   wooAlert('Maybe you should try something else!');
               }
               if (e[2].totalBarks === 3 && maxBarks > 3 ) {
                   wooAlert('Don\'t give up!');
               }
            }
            else {
                wooAlert('OK, OK, come back over here!');
                bark.css('opacity',.15);
                e[2].totalCuddles = 0;
                e[2].totalLicks = 0;
                cuddle.css('opacity',1);
                lick.css('opacity',1);
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
    percent.html(100);
    wooAlert(dogAndAdopter[1] + ' wants to adopt ' + dogAndAdopter[0] + '!');
    won = true;
}

function moveProgress(widthChange){
   var totalBarWidth = parseInt($(".woobar").css('width'));
   var progWidth = parseInt($(".woobarprog").css('width'));
   var newWidth = (progWidth + (totalBarWidth*(widthChange/100))) + 'px';
   woodbarprog.css('width', newWidth);
}

function resetGame(){
   resetStyles();
   resetData();
   resetDisplay();
}

function resetStyles();
   game.css('opacity',.25);
   lick.css('opacity',1);
   cuddle.css('opacity',1);
   bark.css('opacity',1);
   woobarprog.css('width',0);
   selectplayer.fadeIn(750);
}

function resetData(){
   wooData = [{wooScore: 0, totalLicks: 0, totalCuddles: 0, totalBarks: 0}];
   wa =  cartesianProductOf(dogNames,adopterNames, wooData);
   won = false;
}

function resetDisplay(){
   percent.html(0);
   sidebar.empty();
}

function wooAlert(alertMsg) {
    $('#alert').fadeIn(750);
    $('.alert-msg').html(alertMsg);
    };

function woof() {
    $('#woof').fadeIn(600);
    $('#woof').fadeOut(900);
}


/* Cartesian Product function from: http://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript  */

function cartesianProductOf(a,b) {
    return _.reduce(arguments, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }), true);
    }, [ [] ]);
};
