var cards = [{ name: "A", type: "Dragon", Cost: 15, attkac: 30, Defence: 5, Speed: 15 },
{ name: "B", type: "Human", Cost: 5, Attack: 10, Defence: 15, Speed: 15 },
	{ name: "C", type: "Elf", Cost: 10, Attack: 10, Defence: 5, Speed: 20 }];

var deck = [{ name: "D", type: "Dragon", cost: 10, attack: 20, defence: 5, speed: 15 },
{ name: "E", type: "Elf", cost: 10, attack: 15, defence: 5, speed: 25 },
{ name: "F", type: "Human", cost: 5, attack: 15, defence: 10, speed: 15 }];
var limit = 30;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text/plain", ev.target.name);

}

function drop(ev) {
  ev.preventDefault();
	var data = ev.dataTransfer.getData("text/plain");
	
	for (var i = 0; i < cards.length; i++){
		
		if (cards[i]["name"] == data) {
			deck.push(cards[i]);
			cards = cards.filter(function (item) {
				return item !== cards[i];
			});
			
			break;
		}
		
	}

	console.log(deck);
	renderDeck();
	renderCards();
	
}

function renderCards()
{
	document.getElementById('cards').innerHTML = '';
	for(var i = 0; i < cards.length; i++)
	{
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		var attack = document.createElement("div");
		card.className = "card";
		card.name=cards[i].name;
		//set as draggable
		card.draggable = "true"
		card.setAttribute('ondragstart', 'drag(event)');
		name.className = "name";
		type.className = "type" + cards[i].type;
		attack.className = "attack";
		name.innerHTML = cards[i].name;
		attack.innerHTML = cards[i].attack;
		card.appendChild(name);
		card.appendChild(type);
		card.appendChild(attack);
		card.classList.add("draggable")

		document.getElementById("cards").appendChild(card);
	}
}
function shuffle()
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 30; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

	renderDeck();
}

function renderDeck() {

	document.getElementById('deck').innerHTML = '';
	for (var i = 0; i < deck.length; i++) {
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		var attack = document.createElement("div");
		card.className = "card";
		name.className = "name";
		type.className = "type" + deck[i].type;
		attack.className = "attack";
		
		attack.innerHTML = deck[i].attack;
		name.innerHTML = deck[i].name;
		card.appendChild(name);
		card.appendChild(type);
		card.appendChild(attack);

		document.getElementById("deck").appendChild(card);
	}
	//add others as empty bu drop target

	for (var i = 0; i < limit - deck.length; i++) {
		var card = document.createElement("div");
		var name = document.createElement("div");
		var type = document.createElement("div");
		var attack = document.createElement("div");
		card.className = "card";
		name.className = "name";
		type.className = "typeUnknown";
		attack.className = "attack";
		card.appendChild(attack);
		card.setAttribute('ondrop', 'drop(event)');
		card.setAttribute('ondragover', 'allowDrop(event)');
		name.innerHTML = "Unknown";
		card.appendChild(name);
		card.appendChild(type);
		card.appendChild(attack);
		card.classList.add("draggable")

		document.getElementById("deck").appendChild(card);
	}
}

function load()
{
	
	shuffle();
	renderCards();
	renderDeck();

}

window.onload = load;
