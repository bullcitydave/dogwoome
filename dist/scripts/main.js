"use strict";function Dog(a,e){e=e||{},this.name=a,this.color=e.color,this.age=e.age,this.breeds=e.breeds||"mutt",this.colors=e.colors,this.weight=e.weight,this.barkVol=e.barkVol||5,this.avatar=e.avatar,this.lick=function(a){return a.licked=!0},this.cuddle=function(a){return a.cuddled=!0},this.bark=function(a){return a.barkedAt=!0}}function Adopter(a,e){e=e||{},this.name=a,this.licked=!1,this.cuddled=!1,this.tolLick=5,this.tolCuddle=5,this.tolBark=5,this.prefAge=e.prefAge,this.avatar=e.avatar}function WooScore(a,e,o){this.dogname=a,this.adoptername=e,this.score=o}function win(a){alert(a[1]+" wants to adopt "+a[0]+"!"),resetGame()}function lose(a){alert(a[1]+" doesn't want to adopt "+a[0]+" today. Maybe some other time."),resetGame()}function moveProgress(a){var e=parseInt($(".woobar").css("width")),o=parseInt($(".woobarprog").css("width")),t=o+e*(a/100)+"px";$(".woobarprog").css("width",t)}function resetGame(){$(".woobarprog").css("width",0),$(".percent").html(0),$(".main-game").css("opacity",.25),wooScores=[0],wa=cartesianProductOf(dogNames,adopterNames,wooScores),$("#select-player").show(750)}function cartesianProductOf(){return _.reduce(arguments,function(a,e){return _.flatten(_.map(a,function(a){return _.map(e,function(e){return a.concat([e])})}),!0)},[[]])}$("#main-game").css("opacity",.25);var moksha=new Dog("moksha",{color:["brown","white"],age:4,avatar:"https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xpa1/t31.0-8/1932629_10152418870378352_6293108892780372302_o.jpg"}),bella=new Dog("bella",{color:["black"],age:9}),emmitt=new Dog("emmitt",{color:["yellow"],age:5,avatar:"https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xap1/t1.0-9/60479_432375844549_1903986_n.jpg"}),herman=new Dog("herman",{color:["black","white"],age:6}),dave=new Adopter("dave",{tolLick:7,avatar:"https://dge9rmgqjs8m1.cloudfront.net/global/6e784a56292505372595b9023b9cdc970010/original.6e784a56292505372595b9023b9cdc970010.gif"}),emily=new Adopter("emily",{tolLick:4,avatar:"https://asset1.basecamp.com/1940253/people/8112581/photo/avatar.96.gif"}),julia=new Adopter("julia",{tolLick:10}),justin=new Adopter("justin",{tolLick:2}),Adopters=[dave,emily],adopterNames=Adopters.map(function(a){return a.name}),Dogs=[moksha,emmitt,bella,herman],dogNames=Dogs.map(function(a){return a.name}),wooScores=[0],wa=cartesianProductOf(dogNames,adopterNames,wooScores),dogname="",dogPos=0,adoptername="",adopterPos=0;$(".dog-selection-entry").click(function(){dogname=$(this).children("button").html(),dogPos=$(this).children("span").html();var a=$("#sidebar-template").html();$("#sidebar").append(_.template(a,{imgURL:Dogs[dogPos].avatar,dogname:dogname})),$("#select-player").hide(750),$("#select-adopter").show(750)}),$(".adopter-selection-entry").click(function(){adoptername=$(this).children("button").html(),$("#select-adopter").hide(750),$(""),$("#main-game").css("opacity",1),$(".adopter-avatar img").attr("src",eval(adoptername).avatar)}),$("#lick").click(function(){dogPos=$.inArray(dogname,dogNames),adopterPos=$.inArray(adoptername,adopterNames),$.each(wa,function(a,e){e[0]===dogname&&e[1]===adoptername&&(console.log(wa[a][2]),wa[a][2]+=5,moveProgress(5),$(".percent").html(wa[a][2]),wa[a][2]>=100&&win(wa[a]))})}),$("#cuddle").click(function(){dogPos=$.inArray(dogname,dogNames),adopterPos=$.inArray(adoptername,adopterNames),$.each(wa,function(a,e){e[0]===dogname&&e[1]===adoptername&&(console.log(wa[a][2]),wa[a][2]+=10,moveProgress(10),$(".percent").html(wa[a][2]),wa[a][2]>=100&&win(wa[a]))})}),$("#bark").click(function(){dogPos=$.inArray(dogname,dogNames),adopterPos=$.inArray(adoptername,adopterNames),$.each(wa,function(a,e){e[0]===dogname&&e[1]===adoptername&&(console.log(wa[a][2]),wa[a][2]-=4,moveProgress(-4),$(".percent").html(wa[a][2]),wa[a][2]>=100&&(console.log(wa[a][2]),wa[a][2]>100&&(wa[a][2]=100,console.log(wa[a][2]),$(".percent").html(wa[a][2])),Window.setTimeout(win(wa[a]),1500)),wa[a][2]<0&&(wa[a][2]=0,$(".percent").html(wa[a][2]),lose(wa[a])))})}),$("#main-game").css("opacity",.25);