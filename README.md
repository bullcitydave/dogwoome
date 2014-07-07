dogwoome!
==================
Dave Seidman
==================
0.1 - 2014 July 07
==================

Homework project for The Iron Yard Front End Engineering Boot Camp in Durham, NC.  Gist of the assignment: To build a turn-based "monster mash" game. But why be so violent? Instead of attacking monsters, the players are dogs at the shelter, and their goal is to kill any doubts of would-be adopters. They'll need licks, cuddles, and even their barks to woo over the humans.

==================

I've only been working on this for a few days, so there are plenty of more functional and code enhancements I would have loved to have made.

Code
* Use more prototype information in the game
* Build more complex logic/algorithms (it is extremely simple at present, where the only variable between plays are a few human properties)
* Tighten code (JS/CSS); eliminate redunancy in functions

Functionality/UX
* Track total clicks
* Responsive design - this has been built for 800px width
* Multiplayer (dogs)
* Multiple adopters (humans) in each game
* Again, more complexity

Known Bugs:
1 - Woo bar does not fill properly if barks bring progress bar below zero; actual percentage does not go below zero but bar width calculations behave as if it has
2 - Possible to have all actions grayed if there is too much barking too soon for some human configurations. (The bark action will still fire and winning is still possible.) The goal is make sure all dogs have a path to adoption! No one should lose!
