//TO-DO seperate classes into individual files. 6/5/23
const _log = (line) => console.log(`Logged at line ${line}`);
const __log = (input) => console.log(input);

var error = false;
var next = 0;
var scroll = 0;
var myName = "Annaphoric";
var myClass = "warrior";

$("body").css({"background": "#420"});  $("body").css({"position": "fixed"});
$("#enterWindow").css("display", "none");

const slide_welcome = () => $("#welcomeWindow").slideToggle(2000);

function slide_enter() {$("#caption").empty(); $("#enterWindow").slideToggle(2000);}

const slide_d1 = () => $("#d1Window").slideToggle(2000);

const slide_main = () => $("#mainWindow").slideToggle(2000);

//Welcome

function begin() {
  slide_welcome();
  $("#welcomeWindow").children().animate({"opacity": "toggle","font-size": "0%", "height": 0}, 2000);
  $("#welcomeWindow").children().children().animate({"opacity": "toggle", "font-size": "0%"}, 2000);
  $("#checkGame").css("display", "none");
 
 setTimeout(slide_enter, 2000);  setTimeout(scroll_intro, 4000);
 //setTimeout(slide_d1, 2000);  setTimeout(scroll_d1, 4000);  $("#frame").remove();
 //setTimeout(slide_main, 2000);  setTimeout(scroll_camp, 4000); $("#d1Window").remove(); $("#frame").remove();
}

function toggle_check() {$("#checkGame").slideToggle(250);}
function load_chapter(event) {
  event.preventDefault();
  switch($("#chapter").val()) {
    case 1: begin(); break;
    case 2: slide_welcome(); setTimeout(scroll_d1, 2000);  $("#frame").remove(); 
            slide_d1(); break;
    case 3: slide_welcome(); setTimeout(scroll_camp, 2000); $("#frame").remove(); 
            slide_main();$("#d1Window").remove(); break;
  }
}

$("#newGame").on("click", begin);
$("#loadGame").on("click", toggle_check);
$("#cancel").on("click", toggle_check);
$("#chapter").on("submit", load_chapter);
$("#load").on("click", load_chapter);

//Introduction

var intro = $("#caption");
const introList = [
  "In a land far, far away",                               //0
  "There lived an adventurer who fought many battles",     //1
  "From trolls to goblins to dragons to large spiders",    //2
  "The adventurer was fierce and brave",                   //3
  "But wasn't always fierce and brave"                     //4
];

function scroll_intro() {
  if(next < introList.length) {
    $("#frame").text(next + 1).append(" / " + introList.length);
    if(next == 0) {
      $("#frame").css({"display": "initial"});
      intro.css({opacity: 0});
    }
    intro.text(introList[next]);
    next++;
    intro.css({"font-size": "2.4rem"});
    intro .animate({"opacity": 1, "font-size": ["2.5rem", "linear"]}, 3000)
          .animate({"opacity": 0, "font-size": ["2.6rem", "linear"]}, 3000, scroll_intro);
  }
  else {
    $("#frame").remove(); intro.empty()
    next = 0; slide_enter(); setTimeout(slide_d1, 2000); setTimeout(scroll_d1, 4000);
  }
}


//Dialogue 1

var d1 = $("#dialogue1");
var d1Text = $("#dialogue1 span");
var _Mercon = ("<span class='allyDialogue'>Mercon:</span><br />");
var _Henry = ("<span class='allyDialogue'>Henry:</span><br />")

var nextButton = $("#nextButton")
nextButton.on("click", cont_d1);

var nameChoice = $("#nameChoice");
var nameLabel = $("<label for='name'>What's your name? (12 characters max)</label><br />");
var typeName = $("<input type='text' id='name' class='text' placeholder='Enter name here' maxlength='12' autofocus required/>");
var submitName = $("<input type='submit' class='submitButton' value='Choose name' />");
typeName.on("submit", submit_name)
submitName.on("click", submit_name);

var classChoice = $("#classChoice");
var classLabel = $("<label>What do you like to do in your spare time?</label><br />");
var warrior = $("<input type='radio' id='warrior' value='warrior' /><label for='warrior'>Hit objects with a stick (warrior)</label><br />");
var mage = $("<input type='radio' id='mage' value='mage' /><label for='mage'>Play with torches (mage)</label><br />");
var ranger = $("<input type='radio' id='ranger' value='ranger' /><label for='ranger'>Throw rocks into a lake (ranger)</label><br />");
var resetClass = $("<input type='reset' class='submitButton button' value='Reset'/>")
var submitClass = $("<input type='submit' class='submitButton button' value='Choose' />");
warrior.on("click submit", set_class);
mage.on("click submit", set_class);
ranger.on("click submit", set_class);
submitClass.on("click", submit_class);

const toggle_nextButton = () => nextButton.fadeToggle();

function cont_d1() {
  if(error == true) {
    switch(next) {
      case 3: scroll_d1(); break;
      case 4:
        nextButton.off("click"); nextButton.css({"cursor": "not-allowed"});
        nextButton.fadeToggle(2000); d1.fadeToggle(2000); classChoice.toggle(); error = false; break;
    }
  }
  else {
    switch(next) {
    case 1:
      nextButton.off("click"); nextButton.css({"cursor": "not-allowed"});
      nextButton.fadeToggle(2000, add_name); break;
    case 4:
      nextButton.off("click"); nextButton.css({"cursor": "not-allowed"});
      nextButton.fadeToggle(2000); d1.fadeToggle(2000, add_classes); break;
    case 7: 
      d1List[next] = d1List[next].replace("", `We have to stop them! ${myName}, take this and help me fight them off!`);
      scroll_d1(); break;
    default:
      scroll_d1();
    }
  }
}

const add_name = () => nameChoice.append(nameLabel).append(typeName).append(submitName);

function submit_name(event) {
  event.preventDefault();
  myName = typeName.val();
  You.change_name(myName);
  d1List[next] = d1List[next].replace("", `Ah of course, ${myName}! How could I forget?`);
  scroll_d1();
}


const add_classes = () => classChoice.append(classLabel).append(warrior).append(mage).append(ranger)
.append(resetClass).append(submitClass);

function set_class() {
  myClass = $(this).val();
}

function submit_class(event) {
  event.preventDefault();
  switch(myClass) {
    case "warrior":
      d1List[4] = d1List[4].replace("", "Hit objects with a stick? That's an interesting to do!");
      classChoice.remove(); break;
    case "mage":
      d1List[4] = d1List[4].replace("", "Play with torches? That's an interesting thing to do!");
      classChoice.remove(); break;
    case "ranger":
      d1List[4] = d1List[4].replace("", "Throw rocks into a lake? That's an interesting thing to do!");
      classChoice.remove(); break;
    default:
      d1List[4] = d1List[4].replace("", "I didn't quite catch that..");
      error = true; classChoice.toggle();
  }
  nextButton.on("click", cont_d1); nextButton.css({"cursor": "pointer"});
  d1.fadeToggle(2000); nextButton.fadeToggle(2000); scroll_d1();
}

const d1List = [
  "I've been expecting you! Errm.. forgive me, I can't seem to remember.. what was your name again?",  //0
  "",                                                                                                  //1
  "Now that you're here, why don't you tell me a bit about yourself..?",                               //2
  "What do you do like to do in your spare time?",                                                     //3
  "",                                                                                                  //4
  "I would've never thought someone would fancy that but I might give it a try one day!",              //5
  "Mercon! Our camp is being ambushed by a group of thieves!",                                         //6
  ""                                                                                                   //7
];

function scroll_d1() {
  if(next < d1List.length && d1List[next] != "" && next != 6) {
    d1Text.text(d1List[next]).prepend(_Mercon);
  }
  else if(next < d1List.length && d1List[next] != "") {
    d1Text.text(d1List[next]).prepend(_Henry);
  }
  else {
    d1.fadeToggle(2000); nextButton.remove(); d1.remove(); next = 0;
    slide_d1(); setTimeout(slide_main, 2000); setTimeout(scroll_camp, 4000);
  }
  if(error == true) {
    switch(next) {
      case 4: d1List[4] = ""; next = 2; break;
    }
  }
  if(next == 4 && d1List[next] == "") {
    d1.fadeToggle(2000);
    nextButton.fadeToggle(2000);
  }
  if(next == 0) {
    d1Text.css({"display": "initial"});
    d1.fadeToggle(2000);
    setTimeout(toggle_nextButton, 3000)
  }
  if(next == 1) {
    nameChoice.remove();
    nextButton.on("click", cont_d1);
    nextButton.css({"cursor": "pointer"});
    nextButton.fadeToggle(2000);
  }
  next++;
}


//Set Main Interface

var grid = $("#grid");
var cells = $("#grid tr td");
var view = $("#view");
var bars = $("#bars");
var chatbox = $("#chatbox");
var menu = $("#menu");
var area = $("#area tr td");

function slide_bars() {bars.slideToggle(1000);}
function slide_chatbox() {chatbox.slideToggle(1000);}
function slide_menu() {menu.slideToggle(1000);}


//Grid

function save_area(area) {
  for(let n = 0; n <= 59; n++) {
    area[n] = cells.eq(n).text();
  }
}    //Saves current grid into given array

function load_area(area) {
  for(let n = 0; n <= 59; n++) {
    cells.eq(n).text(area[n]);
    if(cells.eq(n).text() == "Tree" || cells.eq(n).text() == "Oak tree"
    || cells.eq(n).text() == "Rock" || cells.eq(n).text() == "Old statue"
    || cells.eq(n).text() == "Mossy rock" || cells.eq(n).text() == "Chair"
    || cells.eq(n).text() == "Table" || cells.eq(n).text() == "Crate") cells.eq(n).addClass("object");
    else if(cells.eq(n).text() == "Mercon" || cells.eq(n).text() == "Henry") cells.eq(n).addClass("ally");
    else if(cells.eq(n).text() == "Thief 1" || cells.eq(n).text() == "Thief 2"
    || cells.eq(n).text() == "Goblin 1" || cells.eq(n).text() == "Goblin 2"
    || cells.eq(n).text() == "Goblin 3" || cells.eq(n).text() == "Wolf 1") cells.eq(n).addClass("enemy");
    else if(cells.eq(n).text() == "Pond" || cells.eq(n).text() == "Lake") cells.eq(n).addClass("water");
    else if(cells.eq(n).text() == "Campfire") cells.eq(n).addClass("fire");
    else if(cells.eq(n).text() == "Wall" || cells.eq(n).text() == "Tent wall") cells.eq(n).addClass("wall");
    else if(cells.eq(n).text() == "Tent" || cells.eq(n).text() == "Exit Tent"
    || cells.eq(n).text() == "Travel north" || cells.eq(n).text() == "Travel east"
    || cells.eq(n).text() == "Travel south" || cells.eq(n).text() == "Travel west") cells.eq(n).addClass("travel");
    else if(cells.eq(n).text() == "Small chest"
    || cells.eq(n).text() == "Small fighter chest") cells.eq(n).addClass("loot");
  }
}    //Retrieves area grid given an array

function reset_area() {
  for(let n = 0; n <= 59; n++) {
    cells.eq(n).text("").removeClass();
  }
}

var A1 = cells.eq(0); var A2 = cells.eq(1); var A3 = cells.eq(2); var A4 = cells.eq(3); var A5 = cells.eq(4);
var A6 = cells.eq(5); var A7 = cells.eq(6); var A8 = cells.eq(7); var A9 = cells.eq(8); var A10 = cells.eq(9);

var B1 = cells.eq(10); var B2 = cells.eq(11); var B3 = cells.eq(12); var B4 = cells.eq(13); var B5 = cells.eq(14);
var B6 = cells.eq(15); var B7 = cells.eq(16); var B8 = cells.eq(17); var B9 = cells.eq(18); var B10 = cells.eq(19);

var C1 = cells.eq(20); var C2 = cells.eq(21); var C3 = cells.eq(22); var C4 = cells.eq(23); var C5 = cells.eq(24);
var C6 = cells.eq(25); var C7 = cells.eq(26); var C8 = cells.eq(27); var C9 = cells.eq(28); var C10 = cells.eq(29);

var D1 = cells.eq(30); var D2 = cells.eq(31); var D3 = cells.eq(32); var D4 = cells.eq(33); var D5 = cells.eq(34);
var D6 = cells.eq(35); var D7 = cells.eq(36); var D8 = cells.eq(37); var D9 = cells.eq(38); var D10 = cells.eq(39);

var E1 = cells.eq(40); var E2 = cells.eq(41); var E3 = cells.eq(42); var E4 = cells.eq(43); var E5 = cells.eq(44);
var E6 = cells.eq(45); var E7 = cells.eq(46); var E8 = cells.eq(47); var E9 = cells.eq(48); var E10 = cells.eq(49);

var F1 = cells.eq(50); var F2 = cells.eq(51); var F3 = cells.eq(52); var F4 = cells.eq(53); var F5 = cells.eq(54);
var F6 = cells.eq(55); var F7 = cells.eq(56); var F8 = cells.eq(57); var F9 = cells.eq(58); var F10 = cells.eq(59);
// asdasdasdasdas

var A11 = area.eq(0); var A12 = area.eq(1); var A13 = area.eq(2); var A14 = area.eq(3); var A15 = area.eq(4);
var B11 = area.eq(5); var B12 = area.eq(6); var B13 = area.eq(7); var B14 = area.eq(8); var B15 = area.eq(9);
var C11 = area.eq(10); var C12 = area.eq(11); var C13 = area.eq(12); var C14 = area.eq(13); var C15 = area.eq(14);
var D11 = area.eq(15); var D12 = area.eq(16); var D13 = area.eq(17); var D14 = area.eq(18); var D15 = area.eq(19);
var E11 = area.eq(20); var E12 = area.eq(21); var E13 = area.eq(22); var E14 = area.eq(23); var E15 = area.eq(24);

for(let n = 0; n < 25; n++) {
  area.eq(n).text("?");
}

function select_region() {$("#selected").text($(this).val());}

function travel() {
  //switch($("#selected").text()) {}
}

$("#selectedRegion option").on("click", select_region)
$("#travel").on("click", travel)

//Fighter

var damage = 0;
var spellCost = 0;
var currentArea = []; 
var camp = [];
var currentLocation = "";
var currentRegion = "";
var campClear = false;

D9.text("Thief 1");
E9.text("Thief 2");
D8.text("Mercon");
E8.text("Henry"); 
C5.text("Campfire");
D5.text("Tent");
place_random(4, "Tree")
place_random(2, "Oak tree");
place_random(1, "Rock");
place_random(1, "Pond");
B5.text("");
E5.text("");

save_area(currentArea);

for(let n = 0; n <= 59; n++) {
  if(cells.eq(n).text() == "Tree" || cells.eq(n).text() == "Oak tree" || 
  cells.eq(n).text() == "Rock" || cells.eq(n).text() == "Tent") cells.eq(n).addClass("object");
  else if(cells.eq(n).text() == "Mercon" || cells.eq(n).text() == "Henry") cells.eq(n).addClass("ally");
  else if(cells.eq(n).text() == "Thief 1" || cells.eq(n).text() == "Thief 2") cells.eq(n).addClass("enemy");
  else if(cells.eq(n).text() == "Pond") cells.eq(n).addClass("water");
  else if(cells.eq(n).text() == "Campfire") cells.eq(n).addClass("fire");
}


class Fighter {
  constructor(word, hitpoints, strength, defence, melee, range, magic) {
    this._word = word;
    this._hitpoints = hitpoints;
    this._health = hitpoints;
    this._strength = strength;
    this._defence = defence;
    this._melee = melee;
    this._range = range;
    this._magic = magic;
    this._mana = Math.round(3.6 * magic);
  }
  get word() {return(this._word);}
  get hitpoints() {return(this._hitpoints);}
  get health() {return(this._health);}
  get strength() {return(this._strength);}
  get defence() {return(this._defence);}
  get melee() {return(this._melee);}
  get range() {return(this._range);}
  get magic() {return(this._magic);}
  get mana() {return(this._mana);}
  get level() {
    return(Math.round(((0.2 * this._hitpoints) + this._strength + this._defence
     + (0.4 * (this._melee + this._range + this._magic))) / 3));
  }
  get position() {save_area(currentArea); return(currentArea.indexOf(this._word));}
  
  get minMaxMelee() {return(Math.round((0.3 * this._strength) + (0.6 * this._melee)));}
  get minMaxRange() {return(Math.round((0.3 * this._strength) + (0.6 * this._range)));}
  get minMaxMagic() {return(Math.round((0.3 * this._strength) + (0.6 * this._magic)));}
  
  heal_health(amount) {
    this._health += amount; if(this._health > this._hitpoints) this._health = this._hitpoints;
  }
  heal_mana(amount) {
    this._mana += amount; if(this._mana > Math.round(3.6 * this._magic)) {
      this._mana = Math.round(3.6 * this._magic);
    }
  }
  lose_health(damage) {this._health -= damage; if(this._health < 0) this._health = 0;}
  lose_mana(spellCost) {this._mana -= spellCost; if(this._mana < 0) this._mana = 0;}
  
  raise_hitpoints() {this._hitpoints++;}
  raise_strength() {this._strength++;}
  raise_defence() {this._defence++;}
  raise_melee() {this._melee++;}
  raise_range() {this._range++;}
  raise_magic() {this._magic++;}
  
  change_name(word) {this._word = word;}
}

class Ally extends Fighter {}
class Enemy extends Fighter {}



//Stats

var combatLevel = 1;
var hitpoints = 10;
var strength = 3;
var defence = 1;
var melee = 1;
var range = 1;
var magic = 1;
var xp = 0;

xpToLevel = [];
for(let n = 0; n <= 100; n++) {
  if(n == 0) xpToLevel[n] = 0;
  else if(n == 1) xpToLevel[n] = 5;
  else if(n == 2) xpToLevel[n] = 8;
  else xpToLevel[n] = Math.ceil(xpToLevel[n - 1] + (1.137 * (xpToLevel[n - 1] - xpToLevel[n - 2])));
}
/*
for(let n = 0; n < xpToLevel.length; n++) {
  __log(`${n}: ${xpToLevel[n]}`);
}
*/


//Dictionary

var You = new Fighter(myName, hitpoints, strength, defence, melee, range, magic);
var Mercon = new Ally("Mercon", 14, 4, 5, 5, 2, 1);    
var Henry = new Ally("Henry", 12, 3, 5, 4, 1, 1);
var Thief_1 = new Enemy("Thief 1", 8, 2, 3, 3, 1, 1);
var Thief_2 = new Enemy("Thief 2", 8, 2, 3, 3, 1, 1);
var Goblin1 = new Enemy("Goblin 1", 6, 2, 2, 2, 1, 1);
var Goblin2 = new Enemy("Goblin 2", 6, 2, 2, 2, 1, 1);
var Goblin3 = new Enemy("Goblin 3", 6, 2, 2, 2, 1, 1);
var Wolf1 = new Enemy("Wolf 1", 10, 4, 3, 4, 1, 1);
var Wolf2 = new Enemy("Wolf 2", 10, 4, 3, 4, 1, 1);
var Bear1 = new Enemy("Bear 1", 15, 6, 5, 6, 1, 1);

var xpOf = {
  "Thief": 3,
  "Goblin": 2,
  "Wolf": 3,
  "Bear": 5
};

var dropsOf = {
  "Bear": ["Bear fur", "Raw meat"],
  "Goblin": ["Cabage", "Bread", "Bronze hatchet", "Copper ore", "Tin"],
  "Small chest": ["Bronze mace", "Bronze platelegs", "Bronze pickaxe", "Bronze boots"],
  "Thief": ["Cabbage", "Bread", "Bronze sword", "Bronze helmet"],
  "Wolf": ["Wolf fur", "Raw meat"]
}

var classOf = {
  "": "Melee",
  "Bronze sword": "Melee",
  "Bronze mace": "Melee",
  "Regular shortbow": "Range"
}

var bonusOf =  {  
  "": [0, 0, 0, 0],
  "Bronze sword": [3, 4, -2, -3, 1],
  "Bronze mace": [5, 3, -3, -4, 1],
  "Bronze shield": [3, -2, -3],
  "Bronze platebody": [5, -3, -5],
  "Bronze platelegs": [4, -3, -4],
  "Bronze helmet": [3, -1, -3],
  "Bronze boots": [2, -1, -2],
  "Regular shortbow": [5, 0, 5, 0, 2],
  "Spellbook of fire": [3, 0, 5]
}  //[Strength, Melee, Range, Magic, Attack Range] for weapons; [Melee, Range, Magic] for armour

var typeOf = {
  "Apple pie": "Food",
  "Bear fur": "Other",
  "Bread": "Food",
  "Bronze boots": "Boots",
  "Bronze hatchet": "Hatchet",
  "Bronze helmet": "Helmet",
  "Bronze pickaxe": "Pickaxe",
  "Bronze platebody": "Platebody",
  "Bronze platelegs": "Platelegs",
  "Bronze shield": "Shield",
  "Bronze sword": "Sword",
  "Cabbage": "Food",
  "Copper ore": "Ore",
  "Half of an apple pie": "Food",
  "Raw meat": "Uncooked",
  "Regular logs": "Logs",
  "Regular shortbow": "Bow",
  "Spellbook of fire": "Spellbook",
  "Tin": "Ore",
  "Wolf fur": "Other"
}

var heals = {
  "Apple pie": 3,
  "Bread": 4,
  "Cabbage": 1,
  "Half of an apple pie": 3
}

var tier = 0;
var tierMessage = $("<span></span>");

function find_tier(item) {
  if(item.includes("Bronze") || item.includes("Regular")) tier = 1;
  else if(item.includes("Iron") || item.includes("Oak")) tier = 2;
  else if(item.includes("Steel") || item.includes("Willow")) tier = 3;
  else if(item.includes("Mithril") || item.includes("Maple")) tier = 4;
  else if(item.includes("Adamant") || item.includes("Yew")) tier = 5;
  else if(item.includes("Evermore") || item.includes("Magic")) tier = 6;
  else tier = 0;
  return(tierMessage.append(`This is a tier ${tier} ${typeOf[item]}`));
}

var consumables = [];
var weapons = [];
var armour = [];
var tools = [];
var resources = [];

//Calculations

var equippedWeapon = "";
var equippedArrows = "";
var equippedArmour = ["", "", "", "", "", "", ""];
var totalDefence = 0
var totalMeleeDefence = 0;
var totalRangeDefence = 0;
var totalMagicDefence = 0;

function range(weapon) {return(bonusOf[weapon][4]);}

function hit_melee(weapon) {return(Math.round(You.melee * (4 / 3) + (bonusOf[weapon][1] / 3)));}
function hit_range(weapon) {return(Math.round(You.range * (4 / 3) + (bonusOf[weapon][2] / 3)));}
function hit_magic(weapon) {return(Math.round(You.magic * (4 / 3) + (bonusOf[weapon][3] / 3)));}

function max_melee(weapon) {return(Math.round(bonusOf[weapon][0] * 0.2) + You.minMaxMelee);}
function max_range(weapon) {return(Math.round(bonusOf[weapon][0] * 0.2) + You.minMaxRange);}
function max_magic(weapon) {return(Math.round(bonusOf[weapon][0] * 0.2) + You.minMaxMagic);}

function sum_melee(equipment) {
  totalMeleeDefence = 0;
  for(let n = 0; n < equipment.length; n++) {
    if(equipment[n] == "") continue;
    else totalMeleeDefence += bonusOf[equipment[n]][0];
  }
  return(totalMeleeDefence);
}

function sum_range(equipment) {
  totalRangeDefence = 0;
  for(let n = 0; n < equipment.length; n++) {
    if(equipment[n] == "") continue;
    else totalRangeDefence += bonusOf[equipment[n]][1];
  }
  return(totalRangeDefence);
}

function sum_magic(equipment) {
  totalMagicDefence = 0;
  for(let n = 0; n < equipment.length; n++) {
    if(equipment[n] == "") continue;
    else totalMagicDefence += bonusOf[equipment[n]][2];
  }
  return(totalMagicDefence);
}

function block_melee(equipment) {return(Math.round(sum_melee(equipment) * 0.1) + You.defence);}
function block_range(equipment) {return(Math.round(sum_range(equipment) * 0.1) + You.defence);}
function block_magic(equipment) {return(Math.round(sum_magic(equipment) * 0.1) + You.defence);}

$("#head").text("None");  $("#weapon").text("None");  $("#shield").text("None");  $("#cape").text("None");
$("#body").text("None");  $("#legs").text("None");  $("#feet").text("None"); $("#ring").text("None");
$("#hitpoints").text(You.hitpoints);  $("#strength").text(You.strength);  $("#defence").text(You.defence);
$("#melee").text(You.melee);  $("#range").text(You.range);  $("#magic").text(You.magic);

$("#health").width((You.hitpoints / You.health) * 100 + "%");
$("#mana").width((Math.round(3.6 * You.magic) / You.mana) * 100 + "%");
$("xp").width((xp / xpToLevel[combatLevel + 1]) * 100 + "%");

$("#currentHealth").text(You.health);  $("#maxHealth").text(You.hitpoints);
$("#currentMana").text(You.mana);  $("#maxMana").text(Math.round(3.6 * You.magic));
$("#currentXp").text(xp);  $("#maxXp").text(xpToLevel[combatLevel + 1]);


//Range

function within_range(range, from, to) {
  switch(range) {
    case 0:
      switch(from) {
        case 0: case 10: case 20: case 30: case 40: case 50:
          if(to == from - 10 || to == from + 1 || to == from + 10) return(true);
          else return(false); break;
        case 9: case 19: case 29: case 39: case 49: case 59:
          if(to == from - 10 || to == from - 1 || to == from + 10) return(true);
          else return(false); break;
        default:
          if(to == from - 10 || to == from - 1
           || to == from + 1 || to == from + 10) return(true);
          else return(false);
      }
      break;
    case 1:
      switch(from) {
        case 0: case 10: case 20: case 30: case 40: case 50:
          if(to == from - 10 || to == from - 9
          || to == from + 1
          || to == from + 10 || to == from + 11) return(true);
          else return(false); break;
        case 9: case 19: case 29: case 39: case 49: case 59:
          if(to == from - 11 || to == from - 10
          || to == from - 1
          || to == from + 9 || to == from + 10) return(true)
          else return(false); break;
        default:
          if(to == from - 11 || to == from - 10 || to == from - 9
          || to == from - 1 || to == from + 1
          || to == from + 9 || to == from + 10 || to == from + 11) return(true);
          else return(false);
      }
      break;
    case 2:
      switch(from) {
        case 0: case 10: case 20: case 30: case 40: case 50:
          if(to == from - 20 || to == from - 19 || to == from - 18
          || to == from - 10 || to == from - 9 || to == from - 8
          || to == from + 1 || to == from + 2
          || to == from + 10 || to == from + 11 || to == from + 12
          || to == from + 20 || to == from + 21 || to == from + 22) return(true);
          else return(false); break;
        case 1: case 11: case 21: case 31: case 41: case 51:
          if(to == from - 21 || to == from - 20 || to == from - 19 || to == from - 18
          || to == from - 11 || to == from - 10 || to == from - 9 || to == from - 8
          || to == from - 1 || to == from + 1 || to == from + 2
          || to == from + 9 || to == from + 10 || to == from + 11 || to == from + 12
          || to == from + 19 || to == from + 20 || to == from + 21 || to == from + 22) return(true);
          return(false); break;
        case 8: case 18: case 28: case 38: case 48: case 58:
          if(to == from - 22 || to == from - 21 || to == from - 20 || to == from - 19
          || to == from - 12 || to == from - 11 || to == from - 10 || to == from - 9
          || to == from - 2 || to == from - 1 || to == from + 1
          || to == from + 8 || to == from + 9 || to == from + 10 || to == from + 11
          || to == from + 18 || to == from + 19 || to == from + 20 || to == from + 21) return(true);
          else return(false); break;
        case 9: case 19: case 29: case 39: case 49: case 59:
          if(to == from - 22 || to == from - 21 || to == from - 20
          || to == from - 12 || to == from - 11 || to == from - 10
          || to == from - 2 || to == from - 1
          || to == from + 8 || to == from + 9 || to == from + 10
          || to == from + 18 || to == from + 19 || to == from + 20) return(true);
          else return(false); break;
        default:
          if(to == from - 22 || to == from - 21 || to == from - 20 || to == from - 19 || to == from - 18
          || to == from - 12 || to == from - 11 || to == from - 10 || to == from - 9 || to == from - 8
          || to == from - 2 || to == from - 1 || to == from + 1 || to == from + 2
          || to == from + 8 || to == from + 9 || to == from + 10 || to == from + 11 || to == from + 12
          || to == from + 18 || to == from + 19 || to == from + 20 || to == from + 21 || to == from + 22)
          return(true);
          else return(false);
      }
      break;
  }
}


//Animations

var splat = $("<div id='splat'></div>");

var animation;
function clear_animation() {clearInterval(animation);}

function clear_tiles() {
  for(let n = 0; n <= 59; n++) {
    cells.eq(n).css("background","initial");
  }
}
function clear_tile(position) {
  splat.remove(); splat = $("<div id='splat'></div>");
  cells.eq(position).css("background", "initial");
  cells.eq(position).on("mouseenter", function() {
  cells.eq(position).css({"background": "#AA8", "filter": "brightness(200%)", "opacity": "0.7"});
    });
  cells.eq(position).on("mouseleave", function() {
  cells.eq(position).css({"background": "initial", "filter": "brightness(100%)", "opacity": "1"});
    });
}

function heal_health() {
  $("#health").animate({"width": (You.health / You.hitpoints) * 100 + "%"}, 500, "linear");
  $("#currentHealth").text(You.health);
}

function flash_damage(position, damage) {
  if(position == You.position) {
    $("#health").animate({"width": (You.health / You.hitpoints) * 100 + "%"}, 500, "linear");
    $("#currentHealth").text(You.health);
  }
  splat.append(damage);
  cells.eq(position).css("background","#C00");
  cells.eq(position).append(splat);
  setTimeout(clear_tile, 500, position);
  
}
function flash_block(position) {
  splat.append(0);
  cells.eq(position).css("background","#00C");
  cells.eq(position).append(splat);
  setTimeout(clear_tile, 500, position);
}
function flash_clear(position) {
  cells.eq(position).animate({"opacity": 0}, 125, "linear").animate({"opacity": 1}, 125, "linear")
                    .animate({"opacity": 0}, 125, "linear").animate({"opacity": 1}, 125, "linear")
}


//Find

var count = 0;

function fighter_count() {
  count = 0;
  for(let n = 0; n <= 59; n++) {
    if(cells.eq(n).hasClass("ally") || cells.eq(n).hasClass("enemy")) count++;
  }
  return(count);
}

function find(entity) {
  for(let n = 0; n <= 59; n++) {
    if(cells.eq(n).text() == entity) return(n);
  }
  return(-1);  
}

function has_allies() {
  for(let n = 0; n <= 59; n++) {
    if(cells.eq(n).hasClass("ally")) {
      return(true);
    }
  }
  return(false);
}

function has_enemies() {
  for(let n = 0; n <= 59; n++) {
    if(cells.eq(n).hasClass("enemy")) {
      return(true);
    }
  }
  return(false);
}

function has(entity) {
  for(let n = 0; n <= 59; n++) {
    if(cells.eq(n).text() == entity) {
      return(true);
    }
  }
  return(false);
}


//Select

var attacked = false;
var previousTurn = 0;
var turn = 0;

function wait() {cells.css({"cursor": "wait"});}

function select() {
  off_all(); wait(); save_area(currentArea);
  if(mode == "Attack") {
    switch($(this).text()) {
      case You.word: message("You can't attack yourself."); break;
      case Thief_1.word:
        if(within_range(1, You.position, Thief_1.position)) {
          if(higher_chance(hit_melee(equippedWeapon))) {
            damage = randint(1, max_melee(equippedWeapon));
            setTimeout(deal_damage, 500, damage, You.word, $(this).text());
            Thief_1.lose_health(damage); flash_clear(You.position);
            setTimeout(flash_damage, 500, Thief_1.position, damage);
            if(Thief_1.health == 0) {
              setTimeout(enemy_death, 1000, You.word, Thief_1.word, Thief_1.position, xpOf["Thief"]);
              setTimeout(receive_drop, 1100, "Thief");
            }
          }
          else {
            setTimeout(block_attack, 500, $(this).text(), You.word); flash_clear(You.position);
            setTimeout(flash_block, 500, Thief_1.position);
          }
          turn++; attacked = true;
        }
        else message("You're out of range.");
        break; 
      case Thief_2.word:
        if(within_range(1, You.position, Thief_2.position)) {
          if(higher_chance(hit_melee(equippedWeapon))) {
            damage = randint(1, max_melee(equippedWeapon));
            setTimeout(deal_damage, 500, damage, You.word, $(this).text());
            Thief_2.lose_health(damage); flash_clear(You.position);
            setTimeout(flash_damage, 500, Thief_2.position, damage);
            if(Thief_2.health == 0) {
              setTimeout(enemy_death, 1000, You.word, Thief_2.word, Thief_2.position, xpOf["Thief"]);
              setTimeout(receive_drop, 1100, "Thief");
            }
          }
          else {
            setTimeout(block_attack, 500, $(this).text(), You.word); flash_clear(You.position);
            setTimeout(flash_block, 500, Thief_2.position);
          }
          turn++; attacked = true;
        }
        else message("You're out of range.");
        break; 
      case Mercon.word: case Henry.word: message("You can't attack your own ally!"); break;
      case "Tent": case "Campfire": message("You probably don't want to do that."); break;
      case "": message("There's nothing to attack here."); break;
      default: message("You can't attack this.");
    }
  }
  else if(mode == "Move") {
    switch($(this).text()) {
      case You.word: message("You wait a turn."); turn++; break;
      case Mercon.word:
        cells.eq(You.position).text(Mercon.word).addClass("ally");
        $(this).text(You.word).removeClass();
        turn++;
        break;
      case Henry.word:
        cells.eq(You.position).text(Henry.word).addClass("ally");
        $(this).text(You.word).removeClass();
        turn++;
        break;
      case "":
        $(this).text("x"); save_area(currentArea);
        tile = currentArea.indexOf("x");
        if(within_range(1, You.position, tile)) {
          cells.eq(currentArea.indexOf(You.word)).text(""); $(this).text(You.word);
          turn++;
        }
        else {
          $(this).text(""); message("That's too far away.");
        }
        break;
      case "Tent": message("You can't go in there yet.");  break;
      default: message("You can't move here.");
    }
  }
  else if(mode == "Interact") {
    switch($(this).text()) {
      case You.word: message("You check the ground below you but find nothing."); break;
      case "Tree": message("An average tree. Regular logs can be cut here with a hatchet."); break;
      case "Oak tree": message("A beautiful tree. Oak logs can be cut here with a hatchet."); break;
      case "Rock": message("A large rock. Nothing too much of importance here."); break;
      case "Pond": message("A small body of water."); break;
      case Mercon.word: talk("Mercon: We have to protect the camp. Help me fight these thieves!"); break;
      case Henry.word: talk("Henry: Unlawful thieves! Why would they want to raid THIS camp?"); break;
      case Thief_1.word: case Thief_2.word: message("They're trying to raid the camp!"); break;
      case "Tent": message("A nice and sturdy tent. You can enter inside it when it's safe to do so."); break;
      case "Campfire": message("A steady fire on some firewood. Keeps me warm!"); break;
      case "": default: message("There's nothing here.");
    }
  }
  else message("Select \"Attack\", \"Move\" or \"Interact\" from the menu on the right side of the screen.");
  $("#turns").text(turn);
  if(turn == previousTurn) {on_all(); on_select();}
  if(turn != previousTurn) {
    if(turn % 5 == 0) {You.heal_health(1); heal_health();}
    if(turn % 5 == 0 && has(Mercon.word)) Mercon.heal_health(1);
    if(turn % 5 == 0 && has(Henry.word)) Henry.heal_health(1);
  }
  if(!attacked && turn != previousTurn) {previousTurn++;  others_turn();}
  else if(attacked) {setTimeout(others_turn, 1000); previousTurn++; attacked = false}
}

function others_turn() {
  $("#turns").text(turn);
  if(turn % 5 == 0 && has(Thief_1.word)) Thief_1.heal_health(1);
  if(turn % 5 == 0 && has(Thief_2.word)) Thief_2.heal_health(1); 
  setTimeout(Mercon_attack, 500);
}

function Mercon_attack() {
  save_area(currentArea);
  if(within_range(1, Mercon.position, Thief_1.position)) {
    if(higher_chance(Mercon.melee)) {
      damage = randint(1, Mercon.strength); setTimeout(deal_damage, 500, damage, Mercon.word, Thief_1.word);
      Thief_1.lose_health(damage); flash_clear(Mercon.position);
      setTimeout(flash_damage, 500, Thief_1.position, damage);
      if(Thief_1.health == 0) {
        setTimeout(enemy_death, 1000, Mercon.word, Thief_1.word, Thief_1.position, xpOf["Thief"]);
        setTimeout(receive_drop, 1100, "Thief");
      }
    }
    else {
      setTimeout(block_attack, 500, Thief_1.word, Mercon.word); flash_clear(Mercon.position);
      setTimeout(flash_block, 500, Thief_1.position);
    }
  }
  else if(within_range(1, Mercon.position, Thief_2.position)) {
    if(higher_chance(Mercon.melee)) {
      damage = randint(1, Mercon.strength); setTimeout(deal_damage, 500, damage, Mercon.word, Thief_2.word);
      Thief_2.lose_health(damage); flash_clear(Mercon.position);
      setTimeout(flash_damage, 500, Thief_2.position, damage);
      if(Thief_2.health == 0) {
        setTimeout(enemy_death, 1000, Mercon.word, Thief_2.word, Thief_2.position, xpOf["Thief"]);
        setTimeout(receive_drop, 1100, "Thief");
      }
    }
    else {
      setTimeout(block_attack, 500, Thief_2.word, Mercon.word); flash_clear(Mercon.position);
      setTimeout(flash_block, 500, Thief_2.position);
    }
  }
  if(has(Henry.word)) setTimeout(Henry_attack, 1500);
  else if(has(Thief_1.word)) setTimeout(Thief_1_attack, 1500);
  else if(has(Thief_2.word)) setTimeout(Thief_2_attack, 1500);
}

function Henry_attack() {
  save_area(currentArea);
  if(within_range(1, Henry.position, Thief_1.position)) {
    if(higher_chance(Henry.melee)) {
      damage = randint(1, Henry.strength); setTimeout(deal_damage, 500, damage, Henry.word, Thief_1.word);
      Thief_1.lose_health(damage); flash_clear(Henry.position);
      setTimeout(flash_damage, 500, Thief_1.position, damage);
      if(Thief_1.health == 0) {
        setTimeout(enemy_death, 1000, Henry.word, Thief_1.word, Thief_1.position, xpOf["Thief"]);
        setTimeout(receive_drop, 1100, "Thief");
      }
    }
    else {
      setTimeout(block_attack, 500, Thief_1.word, Henry.word); flash_clear(Henry.position);
      setTimeout(flash_block, 500, Thief_1.position);
    }
  }
  else if(within_range(1, Henry.position, Thief_2.position)) {
    if(higher_chance(Henry.melee)) {
      damage = randint(1, Henry.strength); setTimeout(deal_damage, 500, damage, Henry.word, Thief_2.word);
      Thief_2.lose_health(damage); flash_clear(Henry.position);
      setTimeout(flash_damage, 500, Thief_2.position, damage);
      if(Thief_2.health == 0) {
        setTimeout(enemy_death, 1000, Henry.word, Thief_2.word, Thief_2.position, xpOf["Thief"]);
        setTimeout(receive_drop, 1100, "Thief");
      }
    }
    else {
      setTimeout(block_attack, 500, Thief_2.word, Henry.word); flash_clear(Henry.position);
      setTimeout(flash_block, 500, Thief_2.position);
    }
  }
  if(has(Thief_1.word)) setTimeout(Thief_1_attack, 1500);
  else if(has(Thief_2.word)) setTimeout(Thief_2_attack, 1500);
}

function Thief_1_attack() {
  save_area(currentArea);
  if(within_range(1, Thief_1.position, You.position)) {
    if(higher_chance(Thief_1.melee - block_melee(equippedArmour))) {
      damage = randint(1, Thief_1.strength); setTimeout(deal_damage, 500, damage, Thief_1.word, You.word);
      You.lose_health(damage); flash_clear(Thief_1.position);
      setTimeout(flash_damage, 500, You.position, damage);
      if(You.health == 0) self_death();
    }
    else {
      setTimeout(block_attack, 500, You.word, Thief_1.word); flash_clear(Thief_1.position);
      setTimeout(flash_block, 500, You.position);
    }
  }
  else if(within_range(1, Thief_1.position, Mercon.position)) {
    if(higher_chance(Thief_1.melee)) {
      damage = randint(1, Thief_1.strength); setTimeout(deal_damage, 500, damage, Thief_1.word, Mercon.word);
      Mercon.lose_health(damage); ally_health(Mercon.word, Mercon.health);
      flash_clear(Thief_1.position); setTimeout(flash_damage, 500, Mercon.position, damage);
      if(Mercon.health == 0) {
        setTimeout(ally_death, 1000, Thief_1.word, Mercon.word, Mercon.position);
      }
    }
    else {
      setTimeout(block_attack, 500, Mercon.word, Thief_1.word); flash_clear(Thief_1.position);
      setTimeout(flash_block, 500, Mercon.position);
    }
  }
  else if(within_range(1, Thief_1.position, Henry.position)) {
    if(higher_chance(Thief_1.melee)) {
      damage = randint(1, Thief_1.strength); setTimeout(deal_damage, 500, damage, Thief_1.word, Henry.word);
      Henry.lose_health(damage); ally_health(Henry.word, Henry.health);
      flash_clear(Thief_1.position); setTimeout(flash_damage, 500, Henry.position, damage);
      if(Henry.health == 0) {
        setTimeout(ally_death, 1000, Thief_1.word, Henry.word, Henry.position);
      }
    }
    else {
      setTimeout(block_attack, 500, Henry.word, Thief_1.word); flash_clear(Thief_1.position);
      setTimeout(flash_block, 500, Henry.position);
    }
  }
  if(!has(Thief_1.word)) Thief_2_attack();
  else if(has(Thief_2.word)) setTimeout(Thief_2_attack, 1500);
  else {on_all(); on_select();}
}

function Thief_2_attack() {
  save_area(currentArea);
  if(within_range(1, Thief_2.position, You.position)) {
    if(higher_chance(Thief_2.melee - block_melee(equippedArmour))) {
      damage = randint(1, Thief_2.strength); setTimeout(deal_damage, 500, damage, Thief_2.word, You.word);
      You.lose_health(damage); flash_clear(Thief_2.position);
      setTimeout(flash_damage, 500, You.position, damage);
      if(You.health == 0) self_death();
    }
    else {
      setTimeout(block_attack, 500, You.word, Thief_2.word); flash_clear(Thief_2.position);
      setTimeout(flash_block, 500, You.position);
    }
  }
  else if(within_range(1, Thief_2.position, Mercon.position)) {
    if(higher_chance(Thief_2.melee)) {
      damage = randint(1, Thief_2.strength); setTimeout(deal_damage, 500, damage, Thief_2.word, Mercon.word);
      Mercon.lose_health(damage); ally_health(Mercon.word, Mercon.health);
      flash_clear(Thief_2.position); setTimeout(flash_damage, 500, Mercon.position, damage);
      if(Mercon.health == 0) {
        setTimeout(ally_death, 1000, Thief_2.word, Mercon.word, Mercon.position);
      }
    }
    else {
      setTimeout(block_attack, 500, Mercon.word, Thief_2.word); flash_clear(Thief_2.position);
      setTimeout(flash_block, 500, Mercon.position);
    }
  }
  else if(within_range(1, Thief_2.position, Henry.position)) {
    if(higher_chance(Thief_2.melee)) {
      damage = randint(1, Thief_2.strength); setTimeout(deal_damage, 500, damage, Thief_2.word, Henry.word);
      Henry.lose_health(damage); ally_health(Henry.word, Henry.health);
      flash_clear(Thief_2.position); setTimeout(flash_damage, 500, Henry.position, damage);
      if(Henry.health == 0) {
        setTimeout(ally_death, 1000, Thief_2.word, Henry.word, Henry.position);
      }
    }
    else {
      setTimeout(block_attack, 500, Henry.word, Thief_2.word); flash_clear(Thief_2.position);
      setTimeout(flash_block, 500, Henry.position);
    }
  }
  on_all();  on_select();
}

//Random

var randNum = 0;

function randint(from, to) {
  randNum = Math.floor(Math.random() * to) + from;
  while(randNum >= (to + 1)) {
    randNum = Math.floor(Math.random() * to) + from;
  }
  return(randNum);
}    //Returns a random number in a given range

function place_random(amount, of) {        
  for(let n = 0; n < amount; n++) {
    randNum = randint(0, 59);
    if(cells.eq(randNum).text() == "") {
      cells.eq(randNum).text(of);
    }
    else n--;    
  }
}  //Takes an amount and an object to place randomly on grid

function lower_chance(denominator) {
  if(denominator <= 0) return(false);
  randNum = randint(1, denominator);
  if(randNum == 1) return(true);
  else return(false);
}  //The higher the input #, the lower the chance  (1/5 if input = 5)

function higher_chance(denominator) {
  if(denominator <= 0) return(false);
  randNum = randint(1, denominator);
  if(randNum == 1) return(false);
  else return(true);
}  //The higher the input #, the better the chance  (4/5 if input = 5)


//Modes and Events

var tile = 0;
var mode = "Choose";

function set_attack_mode() {
  mode = "Attack";
  $("#mode").html("Attack".fontcolor("#F00"));
}
function set_move_mode() {
  mode = "Move";
  $("#mode").html("Move".fontcolor("#08F"));
}
function set_interact_mode() {
  mode = "Interact";
  $("#mode").html("Interact".fontcolor("#4A2"));
}

$("#attack").on("click", set_attack_mode);
$("#move").on("click", set_move_mode);
$("#interact").on("click", set_interact_mode);
$("#inventory").one("click", view_inventory);
$("#character").one("click", view_character);
$("#map").one("click", view_map);
$("#options").one("click", view_options);
cells.one("click", select);

function on_select() {cells.one("click", select);}

function on_all() {
  cells.css({"cursor": "pointer"});  $(".menuButton").css("cursor", "pointer");
  $("#attack").on("click", set_attack_mode);  $("#move").on("click", set_move_mode);
  $("#interact").on("click", set_interact_mode); $("#inventory").one("click", view_inventory);
  $("#character").one("click", view_character);  $("#map").one("click", view_map);
  $("#options").one("click", view_options);
}
function off_all() {
 $(".menuButton").off("click");  cells.off("click");
 $(".menuButton").css("cursor", "not-allowed");  cells.css("cursor", "not-allowed");
}


//Interfaces

function on_close() {
  $(".menuButton").one("click", close_view); $(".menuButton").css({"cursor": "pointer"});
}
function set_close() {$(".menuButton").val("Close");}
function set_menu() {
  $("#attack").val("Attack"); $("#move").val("Move");
  $("#interact").val("Interact"); $("#inventory").val("Inventory");
  $("#character").val("Character"); $("#map").val("Map");
  $("#options").val("Options"); $(".menuButton").fadeToggle(500);
}

function hide_menu() {$(".menuButton").fadeOut(500, set_close);}
function toggle_menu() {$(".menuButton").fadeToggle(500);}

function toggle_inventory() {$("#inventory").fadeToggle(500);}
function toggle_character() {$("#character").fadeToggle(500);}
function toggle_map() {$("#map").fadeToggle(500);}
function toggle_options() {$("#options").fadeToggle(500);}

function view_inventory() {
  items = $("#inventory li");  items.css("background", "#BBB");
  selection = ""; $("#select").val("Select"); items.on("click", select_item);
  view.css({"background": "#B84"});  off_all();  hide_menu();  $("#itemInfo").css("display", "initial");
  view.slideToggle(1000, on_close);  setTimeout(toggle_inventory, 600);
  $(".interface").css({"display": "none"}); $("#inventoryView").css({"display": "initial"});
}
function view_character() {
  view.css({"background": "#AAA"});  off_all();  hide_menu();
  view.slideToggle(1000, on_close);  setTimeout(toggle_character, 600);
  $(".interface").css({"display": "none"}); $("#characterView").css({"display": "initial"});
}
function view_map() {
  view.css({"background": "#8CA"});  off_all();  hide_menu();
  view.slideToggle(1000, on_close);  setTimeout(toggle_map, 600);
  $(".interface").css({"display": "none"}); $("#mapView").css({"display": "initial"});
}
function view_options() {
  view.css({"background": "#ACE"});  off_all();  hide_menu();
  view.slideToggle(1000, on_close);  setTimeout(toggle_options, 600);
  $(".interface").css({"display": "none"}); $("#optionsView").css({"display": "initial"});
}

function close_view() {
  off_all();
  $(this).fadeToggle(500, set_menu);  view.slideToggle(1000);
  if(turn == previousTurn) {
    setTimeout(on_all, 1100);
    if(!campClear) setTimeout(on_select, 1200); else if(campClear) setTimeout(on_forest1, 1200);
  }
}


//Inventory

var items;
var selection = "";
var action = "";

function select_item() {
  $("#other").empty();
  items.css("background", "#BBB");  $(this).css("background", "#AE8");
  selection = $(this).text();  $("#selectedItem").text(selection);
  switch(typeOf[selection]) {
    case "Sword": case "Bow": case "Staff":
      $("#select").val("Equip"); $("#aboutItem").html(find_tier(selection)); 
      tierMessage = $("<span></span>");
      $("#other").append(`Strength bonus: ${bonusOf[selection][0]}`); $("#other").append("<br />");
      $("#other").append(`Melee attack bonus: ${bonusOf[selection][1]}`); $("#other").append("<br />");
      $("#other").append(`Range attack bonus: ${bonusOf[selection][2]}`); $("#other").append("<br />");
      $("#other").append(`Magic attack bonus: ${bonusOf[selection][3]}`); $("#other").append("<br />");
      break;
    case "Shield": case "Helmet": case "Platebody": case "Spellbook":
    case "Platelegs": case "Boots": case "Cape": case "Ring":
      $("#select").val("Equip"); $("#aboutItem").html(find_tier(selection)); 
      tierMessage = $("<span></span>");
      $("#other").append(`Melee defence bonus: ${bonusOf[selection][0]}`); $("#other").append("<br />");
      $("#other").append(`Range defence bonus: ${bonusOf[selection][1]}`); $("#other").append("<br />");
      $("#other").append(`Magic defence bonus: ${bonusOf[selection][2]}`); $("#other").append("<br />");
      break;
    case "Hatchet": 
      $("#select").val("Chop"); $("#aboutItem").html(find_tier(selection)); 
      tierMessage = $("<span></span>"); break;
    case "Pickaxe":
      $("#select").val("Mine"); $("#aboutItem").html(find_tier(selection)); 
      tierMessage = $("<span></span>"); break;
    case "Food":
      $("#select").val("Eat");
      $("#aboutItem").html(`This ${typeOf[selection]} heals ${heals[selection]} hitpoints`); break;
    case "Drink":
      $("#select").val("Drink");
      $("#aboutItem").html(`This ${typeOf[selection]} heals ${heals[selection]} hitpoints`); break;
    case "Potion": $("#select").val("Drink"); break;
    case "Logs": $("#select").val("Fletch"); break;
    case "Ore": $("#select").val("Smelt"); break;
    case "Other": $("#select").val("Use"); break;
  }
  action = $("#select").val();
}

function perform() {
  items.css("background", "#BBB");
  switch(action) {
    case "Eat":
      $("#drop").trigger("click"); turn++; $("#inventory").trigger("click"); off_all(); wait();
      setTimeout(eat, 500, selection); setTimeout(others_turn, 1500); break;
    case "Equip": equip(selection); $("#select").one("click", perform); break;
    case "Use":
      message("You can't do anything with that right now."); $("#select").one("click", perform);  break;
    case "": default: message("Select an item from the above list."); $("#select").one("click", perform);
  }
}

function drop() {
  items.css("background", "#BBB");
  for(let n = 0; n < items.length; n++) {
    if(items.eq(n).text() == selection) {
      items.eq(n).remove(); break;
    }
  }
  $("#drop").one("click", drop);
}

$("#select").one("click", perform);
$("#drop").one("click", drop);


//Messages

var new_message = $("<li></li>");
var chat = $("<li class='chat'></li>")
var reportDamage = $("<li class='damage'></li>");
var reward = $("<li class='reward'></li>");
var allyDeath = $("<li class='allyDeath'></li>");
var death =$("<li class='death'></li>");
var bossDeath = $("<li class='bossDeath'></li>");

function message(sentence) {
  chatbox.prepend(new_message.append(sentence));
  new_message = $("<li></li>");
}
function talk(dialogue) {
  chatbox.prepend(chat.append(dialogue));
  chat = $("<li class='chat'></li>");
}
function eat(food) {
  You.heal_health(heals[food]);  heal_health();  message(`You eat the ${food}`);
}

function equip(piece) {
  switch(typeOf[piece]) {
    case "Sword": case "Staff":
      $("#weapon").text(piece);  equippedWeapon = piece;
      $("#totalStrength").text(bonusOf[piece][0]); $("#totalMeleeAttack").text(bonusOf[piece][1]);
      $("#totalRangeAttack").text(bonusOf[piece][2]); $("#totalMagicAttack").text(bonusOf[piece][3]);
      break; 
    case "Bow":
      $("#weapon").text(piece);  equippedWeapon = piece;
      $("#totalStrength").text(bonusOf[piece][0]); $("#totalMeleeAttack").text(bonusOf[piece][1]);
      $("#totalRangeAttack").text(bonusOf[piece][2]); $("#totalMagicAttack").text(bonusOf[piece][3]);
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Shield" || typeOf[equippedArmour[n]] == "Spellbook") {
          equippedArmour[n] = "";
        }
      }
      break; 
    case "Shield": case "Spellbook":
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Shield" || typeOf[equippedArmour[n]] == "Spellbook") {
          equippedArmour[n] = "";
        }
      }
      if(typeOf[equippedWeapon] == "Bow") equippedWeapon = "";
      $("#shield").text(piece);  equippedArmour.unshift(piece);  break;
    case "Helmet": case "Hat":
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Helmet" || typeOf[equippedArmour[n]] == "Hat") {
          equippedArmour[n] = "";
        }
      }
      $("#head").text(piece);  equippedArmour.unshift(piece);  break;
    case "Platebody": case "Robe top": case "Leather body":
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Platebody" || typeOf[equippedArmour[n]] == "Robe top"
        || typeOf[equippedArmour[n]] == "Leather body") {
          equippedArmour[n] = "";
        }
      }
      $("#body").text(piece);  equippedArmour.unshift(piece);  break;
    case "Platelegs": case "Robe bottom": case "Leather chaps":
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Platelegs" || typeOf[equippedArmour[n]] == "Robe bottom"
        || typeOf[equippedArmour[n]] == "Leather chaps") {
          equippedArmour[n] = "";
        }
      }
      $("#legs").text(piece);  equippedArmour.unshift(piece);  break;
    case "Boots":
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Boots") {
          equippedArmour[n] = "";
        }
      }
      $("#feet").text(piece);  equippedArmour.unshift(piece);  break;
    case "Cape":
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Cape") {
          equippedArmour[n] = "";
        }
      }
      $("#cape").text(piece);  equippedArmour.unshift(piece);  break;
    case "Ring":
      for(let n = 0; n < equippedArmour.length; n++) {
        if(typeOf[equippedArmour[n]] == "Ring") {
          equippedArmour[n] = "";
        }
      }
      $("#ring").text(piece);  equippedArmour.unshift(piece);  break;
  }
  $("#totalMeleeDefence").text(sum_melee(equippedArmour));
  $("#totalRangeDefence").text(sum_range(equippedArmour));
  $("#totalMagicDefence").text(sum_magic(equippedArmour));
  chatbox.prepend(new_message.append(`You equip the ${piece}.`));
  new_message = $("<li></li>");
}

function receive(item) {
  switch(typeOf[item]) {
    case "Food": case "Drink": case "Potion":
      consumables.unshift(item);  $("#consumables").prepend("<li>" + item + "</li>"); break;
    case "Sword": case "Staff": case "Bow":
      weapons.unshift(item);  $("#weapons").prepend("<li>" + item + "</li>"); break;
    case "Helmet": case "Shield": case "Platebody": case "Platelegs": case "Boots":
    case "Cape": case "Ring": case "Hat": case "Spellbook":
      armour.unshift(item);  $("#armour").prepend("<li>" + item + "</li>"); break;
    case "Hatchet": case "Pickaxe":
      tools.unshift(item);  $("#tools").prepend("<li>" + item + "</li>"); break;
    case "Logs": case "Ore":
      resources.unshift(item);  $("#resources").prepend("<li>" + item + "</li>"); break;
  }
  chatbox.prepend(reward.append(`You receive 1 ${item}.`));
  reward = $("<li class='reward'></li>");
}
function receive_arrows(amount, type) {
  chatbox.prepend(reward.append(`You receive ${amount} ${type} arrows!`));
  reward = $("<li class='reward'></li>");
  if(type == "Bronze")  $("#bronzeArrows").text(Number($("#bronzeArrows").text()) + amount);
}
function receive_coins(amount) {
  chatbox.prepend(reward.append(`You receive ${amount} coins!`));
  reward = $("<li class='reward'></li>"); $("#coins").text(Number($("#coins").text()) + amount);
}
function receive_drop(spoils) {
  randNum = randint(0, dropsOf[spoils].length);
  receive(dropsOf[spoils][randNum]);
}
function deal_damage(damage, attacker, attacked) {
  chatbox.prepend(reportDamage.append(`${attacker} deals ${damage} damage to ${attacked}.`));
  reportDamage = $("<li class='damage'></li>");
}
function block_attack(blocker, attacker) {
  chatbox.prepend(new_message.append(`${blocker} blocked ${attacker}'s attack!`));
  new_message = $("<li></li>");
}
function ally_health(ally, health) {
  chatbox.prepend(new_message.append(`${ally} now has ${health} health left.`));
  new_message = $("<li></li>");
}
function ally_death(enemy, ally, allyPosition) {
  cells.eq(allyPosition).text("").removeClass();
  chatbox.prepend(allyDeath.append(`Oh dear, ${enemy} killed ${ally}!`));
}
function gain_xp(experience) {
    chatbox.prepend(death.append(`You gained ${experience} xp.`));
    death = $("<li class='death'></li>");
    xp += experience;
    if(xp >= xpToLevel[combatLevel + 1]) gain_level();
    else {
      $("#xp").animate({"width": (xp / xpToLevel[combatLevel + 1]) * 100 + "%"}, 500, "linear");
      $("#currentXp").text(xp); 
    }
}
function gain_level() {
  off_all();  combatLevel++;
  chatbox.prepend(reward.append(`Congratulations, you reached level ${combatLevel}!`));
  reward = $("<li class='reward'></li>");
  xp -= xpToLevel[combatLevel];
  $("#xp").width((xp / xpToLevel[combatLevel + 1]) * 100 + "%");
  $("#currentXp").text(xp);  $("#maxXp").text(xpToLevel[combatLevel + 1]);
  setTimeout(gain_stats, 500);
}
$("#addHitpoints").on("click", set_hitpoints);  $("#addStrength").on("click", set_strength);
$("#addDefence").on("click", set_defence);  $("#addMelee").on("click", set_melee);
$("#addRange").on("click", set_range);  $("#addMagic").on("click", set_magic);

var statCounter = 4;
var stat = "";
function gain_stats() {
  off_all();  toggle_menu();  view.css({"background": "#6C8"});  view.slideToggle(1000); 
  $(".interface").css({"display": "none"});  $("#levelUp").css({"display": "initial"});
  $("#chooseStat").on("click", choose_stat);
}
function set_hitpoints() {stat = "Hitpoints";}
function set_strength() {stat = "Strength";}
function set_defence() {stat = "Defence";}
function set_melee() {stat = "Melee";}
function set_range() {stat = "Range";}
function set_magic() {stat = "Magic";}
function choose_stat() {
  if(stat == "Hitpoints") You.raise_hitpoints();
  else if(stat == "Strength") You.raise_strength();
  else if(stat == "Defence") You.raise_defence();
  else if(stat == "Melee") You.raise_melee();
  else if(stat == "Range") You.raise_range();
  else if(stat == "Magic") You.raise_magic();
  if(stat != "") {statCounter--;  $("#gainsLeft").text(statCounter);}
  else if(stat == "") message("Choose a level to increase.");
  stat = "";  $("#resetStat").trigger("click");
  if(statCounter == 0) {
    $("#hitpoints").text(You.hitpoints);  $("#strength").text(You.strength);  $("#defence").text(You.defence);
    $("#melee").text(You.melee);  $("#range").text(You.range);  $("#magic").text(You.magic);
    $("#maxHealth").text(You.hitpoints);  $("#maxMana").text(Math.round(3.6 * You.magic));
    $("#health").width((You.health / You.hitpoints) * 100 + "%");
    $("#mana").width(You.mana / (3.6 * You.magic) * 100 + "%");
    $("chooseStat").off("click");  view.slideToggle(1000);  toggle_menu();  setTimeout(on_all, 1100);
    if(!campClear) setTimeout(on_select, 1100);
    else if(campClear) setTimeout(on_forest1, 1100);
  }
}

function enemy_death(winner, loser, loserPosition, xp) {
  cells.eq(loserPosition).text("").removeClass();
  chatbox.prepend(death.append(`${winner} killed ${loser}.`));
  death = $("<li class='death'></li>");  gain_xp(xp);
  if(!has_enemies() && !campClear) {off_all(); setTimeout(scroll_d2, 500)}
}
function boss_death(boss) {
  chatbox.prepend(bossDeath.append(`You killed the ${boss}!`));
  bossDeath = $("<li class='bossDeath'></li>");
}
function self_death() {
  chatbox.prepend(allyDeath.append("Oh dear, you are dead!"));
  allyDeath = $("<li class='allyDeath'></li>");  reset_area();
  turn = 0; previousTurn = 0;
}

//Camp

function scroll_camp() {
  if(myClass == "warrior") {You.raise_melee(); You.raise_melee();   $("#melee").text(You.melee); }
  else if(myClass == "ranger") {You.raise_range(); You.raise_range(); $("#range").text(You.range);}
  else if(myClass == "mage") {You.raise_magic(); You.raise_magic();  $("#magic").text(You.magic);}
  
  $("#name").text(myName); C8.text(myName).removeClass();
  grid.fadeToggle(); setTimeout(slide_bars, 750);
  setTimeout(slide_chatbox, 1500); setTimeout(slide_menu, 2250);
  
  receive("Bronze sword"); receive("Bronze shield"); receive("Bread");
  message("Go to your inventory to equip the items!");
  
  save_area(camp); currentArea = camp;
  C13.text("Camp");
  currentRegion = "Heartwood Forest"; currentLocation = "Camp"; 
  $("#region").text(currentRegion); $("#location").text(currentLocation);
}

//Forest1

$("#contd2").on("click", cont_d2);

var d2List = ["Thank you for protecting the camp. We surely would not have made it if it weren't for your help!",
              "I wonder why they would want to raid this camp. We haven't anything of value here.",
              "Their leader and crew might be around here somewhere. Do you think you can track them down?",
              "They should be somewhere in the forest. Feel free to take some supplies in the tent to help you out.",
              "",
              "As you wish Lord Mercon."
]

function scroll_d2() {
  switch(scroll) {
    case 0: $("#dialogue2").slideToggle(500);
    case 1: case 2: case 3:  $("#dialogue2 span").text(d2List[scroll]).prepend(_Mercon); break;
    case 4:
      d2List[scroll] = d2List[scroll].replace("", `Henry, accompany ${You.word} in this journey. I shall stay here and guard the camp.`);
      $("#dialogue2 span").text(d2List[scroll]).prepend(_Mercon); break;
    case 5: $("#dialogue2 span").text(d2List[scroll]).prepend(_Henry); break;
    case 6:
      $("#contd2").off("click"); $("#contd2").css("cursor", "not-allowed");
      A6.removeClass().text("Travel north").addClass("travel");
      D10.removeClass().text("Travel east").addClass("travel");
      F5.removeClass().text("Travel south").addClass("travel");
      C1.removeClass().text("Travel west").addClass("travel");
      $("#dialogue2").slideToggle(500); cells.eq(find("Tent")).addClass("travel"); scroll = 0;
      message("Camp cleared! You can now venture through Heartwood Forest.")
      save_area(currentArea); on_all(); on_forest1(); campClear = true; break;
  }
}
function cont_d2() {scroll++; scroll_d2()}

var hitChance = 0;
var max = 0;
var text = "";
var following = true;

function on_forest1() {cells.one("click", select_forest1);}

function select_forest1() {
  off_all(); wait(); save_area(currentArea); text = $(this).text();
  if(mode == "Attack") {
    switch(classOf[equippedWeapon]) {
      case "Melee": hitChance = hit_melee(equippedWeapon);  max = max_melee(equippedWeapon);  break;
      case "Range": hitChance = hit_range(equippedWeapon);  max = max_range(equippedWeapon);  break;
      case "Magic": hitChance = hit_magic(equippedWeapon);  max = max_magic(equippedWeapon);  break;
    }
    switch(text) {
      case You.word: message("You can't attack yourself."); break;
      case "Goblin 1":
        if(within_range(range(equippedWeapon), You.position, Goblin1.position)) {
          if(higher_chance(hitChance - Goblin1.defence)) {
            damage = randint(1, max);  setTimeout(deal_damage, 500, damage, You.word, text);
            Goblin1.lose_health(damage); flash_clear(You.position);
            setTimeout(flash_damage, 500, Goblin1.position, damage);
            if(Goblin1.health == 0) {
              setTimeout(enemy_death, 1000, You.word, text, Goblin1.position, xpOf["Goblin"]);
              setTimeout(receive_drop, 1100, "Goblin");
            }
          }
          else {
            setTimeout(block_attack, 500, text, You.word); flash_clear(You.position);
            setTimeout(flash_block, 500, Goblin1.position);
          }
          turn++; attacked = true;
        }
        else message("You're out of range.");  break; 
      case "Goblin 2":
        if(within_range(range(equippedWeapon), You.position, Goblin2.position)) {
          if(higher_chance(hitChance - Goblin2.defence)) {
            damage = randint(1, max);  setTimeout(deal_damage, 500, damage, You.word, text);
            Goblin2.lose_health(damage); flash_clear(You.position);
            setTimeout(flash_damage, 500, Goblin2.position, damage);
            if(Goblin2.health == 0) {
              setTimeout(enemy_death, 1000, You.word, text, Goblin2.position, xpOf["Goblin"]);
              setTimeout(receive_drop, 1100, "Goblin");
            }
          }
          else {
            setTimeout(block_attack, 500, text, You.word); flash_clear(You.position);
            setTimeout(flash_block, 500, Goblin2.position);
          }
          turn++; attacked = true;
        }
        else message("You're out of range.");  break;
      case "Mercon": case "Henry": message("You can't attack your own ally!");  break;
      case "Campfire": message("You probably don't want to do that.");  break;
      case "Tent":
        message("You can now enter here using \"Move\" mode.");  break;
      case "Travel north": case "Travel east": case "Travel south": case "Travel west":
        message("Travel towards this direction using \"Move\" mode.");  break;
      case "": message("There's nothing to attack here.");  break;
      default: message("You can't attack this.");
    }
  }
  else if(mode == "Move") {
    $(this).text("x");  save_area(currentArea);  tile = currentArea.indexOf("x");  $(this).text(text);
    if(text == You.word) {message("You wait a turn."); turn++;}
    else if(within_range(1, You.position, tile)) {
      switch(text) {
        case "Henry":
          cells.eq(You.position).text("Henry").addClass("ally");
          $(this).text(You.word).removeClass();
          turn++;  break;
        case "":
          if(following && !within_range(1, Henry.position, tile)) {
            cells.eq(Henry.position).text("").removeClass();
            cells.eq(You.position).text("Henry").addClass("ally");
          }
          else cells.eq(You.position).text("");
          $(this).text(You.word);
          turn++;  break;
        case "Tent": off_all();  enter("Tent", camp, tent, "#A88");  break;
        case "Exit Tent": off_all();  enter("Camp", tent, camp, "#9A4");  break;
        case "Travel north": off_all();  enter("Camp North", camp, tent, "#A88");  break;
        case "Travel east": off_all();  enter("Camp East", camp, tent, "#A88");  break;
        case "Travel south": off_all();  enter("Camp South", camp, tent, "#A88");  break;
        case "Travel west": off_all();  enter("Camp West", camp, tent, "#A88");  break;
        default: message("You can't move here.");
      }
    }
    else message("You're too far away.");
  }
  else if(mode == "Interact") {
    $(this).text("x");  save_area(currentArea);  tile = currentArea.indexOf("x");  $(this).text(text);
    if(within_range(1, You.position, tile)) {
      switch(text) {
        case You.word: message("You check the ground below you but find nothing."); break;
        case "Tree": message("An average tree. Regular logs can be cut here with a hatchet."); break;
        case "Oak tree": message("A beautiful tree. Oak logs can be cut here with a hatchet."); break;
        case "Willow tree":
          message("A dark tree attracted to bodies of water. Willow logs can be cut here with a hatchet."); break;
        case "Rock": message("A large rock. Nothing too much of importance here."); break;
        case "Mossy rock": message("A rock covered in moss."); break;
        case "Pond": message("A small body of water."); break;
        case "Tent": message("A nice and sturdy tent. You can now enter inside it using \"Move\" mode."); break;
        case "Campfire": message("A steady fire on some firewood. Keeps me warm!"); break;
        case "Travel north": case "Travel east": case "Travel south": case "Travel west":
          message("Travel towards this direction using \"Move\" mode.");  break;
        case "Strange altar":
          message("You feel a powerful presence coming from this altar."); break;
        case "Small chest":
          receive_drop(text);  receive_drop(text);  receive_coins(randint(15, 85)); 
          cells.eq(find(text)).text("").removeClass(); break;
        case "Small fighter chest":
          receive("Regular shortbow");  receive_arrows(25, "Bronze");  receive("Spellbook of fire");
          cells.eq(find(text)).text("").removeClass(); break;
        case "Mercon": talk("Mercon: The camp has been calm lately. Any luck tracking down those thieves?"); break;
        case "Henry":
          talk("Henry: Onward we go!"); 
          if(has_enemies()) message("You can only ask him to return to camp when there are no enemies around.");
          else setTimeout(Henry_follow, 500); break;
        case Thief_1.word: case Thief_2.word: message("They're trying to raid the camp!"); break;
        
        case "": default: message("There's nothing here.");
      }
    }
    else message("You need to get closer to interact with that.");
  }
  else message("Select \"Attack\", \"Move\" or \"Interact\" from the menu on the right side of the screen.");
  $("#turns").text(turn);
  if(turn != previousTurn) {
    if(turn % 5 == 0) {You.heal_health(1); heal_health(); Henry.heal_health(1)}
    if(turn % 5 == 1 && has("Henry")) Henry.heal_health(1);
    if(turn % 5 == 2 && has("Goblin 1")) Goblin1.heal_health(1);
    if(turn % 5 == 3 && has("Goblin 2")) Goblin2.heal_health(1);
    if(turn % 5 == 4 && has("Goblin 3")) Goblin3.heal_health(1);
    if(turn % 5 == 0 && has("Wolf 1")) Wolf1.heal_health(1);
    if(turn % 5 == 1 && has("Wolf 2")) Wolf2.heal_health(1);
  }
  if(turn == previousTurn) {on_all(); on_forest1();}
  else if(!has_enemies() && turn != previousTurn) {previousTurn++; on_all(); on_forest1();}
  else if(!attacked && turn != previousTurn) {previousTurn++;  others_forest1();}
  else if(attacked) {setTimeout(others_forest1, 1000); previousTurn++; attacked = false}
}

function others_forest1() {}

function Henry_follow() {
  off_all();  $("#HenryFollow").slideToggle(500);
  $("#noHenry").one("click", no_Henry);  $("#yesHenry").one("click", yes_Henry);
}

function no_Henry() {$("#HenryFollow").slideToggle(500); on_all(); on_forest1();}
function yes_Henry() {
  cells.eq(Henry.position).text("").removeClass();  message("Henry returns to camp.");  following = false;
  $("#HenryFollow").slideToggle(500); on_all(); on_forest1();
}

var caption = $("#caption");
function add_caption(phrase) {
  caption.append(phrase);
  caption.css({"opacity": 0, "font-size": "2.4rem"});
  caption .animate({"opacity": 1, "font-size": ["2.6rem", "linear"]}, 3500)
          .animate({"opacity": 0}, 500, slide_enter);
}

function enter(place, from, to, colour) {
  slide_main(); setTimeout(slide_enter, 2000); setTimeout(add_caption, 4000, place);
  setTimeout(change_area, 6000, from, to, colour);  setTimeout(slide_main, 10000);  currentArea = to;
  currentLocation = place;  $("#location").text(currentLocation);
  setTimeout(on_all, 10000);  if(campClear) setTimeout(on_forest1, 10000);
}

function change_area(from, to, colour) {
  save_area(from);  reset_area(from);  to[to.indexOf("You")] = You.word;  load_area(to);
  $("#mainWindow").css("background", colour);
}

var tent = [
  "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall",
  "Tent wall", "Crate", "", "", "", "", "Crate", "", "Small chest", "Tent wall",
  "Tent wall", "", "", "", "", "", "", "", "", "Tent wall",
  "Exit Tent", "You", "", "", "", "Table", "Chair", "", "", "Tent wall",
  "Tent wall", "", "", "Crate", "", "", "", "", "Small fighter chest", "Tent wall",
  "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall", "Tent wall",
]