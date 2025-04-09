# SwordBoyDEMO
A game made in javascript using canvas over a period of two weeks as a school project. My first ever coding project. 
The code is kept in the original state, but a cleaner, bug-free version will be uploaded at some point.


### RUN:

Install live server extension in visual studio code.
Right click the index.html and select Open With Live Server.


### VERCEL HOSTED VERSION:

https://sword-boy-demo-2.vercel.app/


## BASIC FEATURES:

### CONTROLS:

WASD to move.

E to interact/use the workstations.

Click on the fire to start the enemy waves.

R to refresh the page to restart.

Recommended to play at 67% or 75% (Ctrl-).

### GETTING STARTED:

Hover over uncollected resources to attract them to the player.

Attracted resources can be bounced off the sword.

Click on collected resources to attract them to the player.

Basic goblins will detect and then snag uncollected/attracted resources.

Press E at the grindstone (left) to use flint (pink) to sharpen your sword (increase damage, increase speed, decrease knockback, decrease size).

Press E at the anvil (right) to use iron (red) to fortify your sword (increase damage, decrease speed, increase knockback, increase size).

Press E inbetween them to use one flint and one iron in order to increase your campfire health.

### LOSING:

Get hit by an enemy and lose the game.

Every enemy that enters your campfire makes it lose 1 health. When it reaches 0 health, you lose the game.

Be careful, your sword will also make the campfire lose health.

### HIGHLIGHTS:

Enemy spawners.

Dynamic canvas and object dilation based on window size.

Snappy movement.

Simulated "sword" physics with other objects.

Goblin economy (merchant goblin appears whenever 3 iron or flint are successfully captured by basic goblins).

### BUGS:

Dilation sometimes breaks the enemy spawner locations and movements.

Shadow flickering at enemy spawning.

Y sorting shenanigans.

Resources can no longer be brought into "cursor collected" mode after enough of them have been collected and/or "cursor collected".

Sometimes these resources can't even be used by the workstation.
