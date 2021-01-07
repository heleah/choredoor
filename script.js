let doorRobotSrc = "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let doorBeachSrc = "https://content.codecademy.com/projects/chore-door/images/beach.svg";
let doorSpaceSrc = "https://content.codecademy.com/projects/chore-door/images/space.svg";
let closedDoorSrc = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";

let doorImg1 = document.getElementById('door1');
let doorImg2 = document.getElementById('door2');
let doorImg3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentStreak = document.getElementById('current-streak');
let bestStreak = document.getElementById('best-streak');

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

let currentlyPlaying = true;

const isBot = door => {
    if (door.src === doorRobotSrc) {
        return true;
    } else {
        return false;
    };
};

const isClicked = door => {
    if (door.src === closedDoorSrc) {
        return false;
    } else {
        return true;
    };
};

const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }
};

const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = doorRobotSrc;
        openDoor2 = doorBeachSrc;
        openDoor3 = doorSpaceSrc;
    } else if (choreDoor === 1) {
        openDoor1 = doorSpaceSrc;
        openDoor2 = doorRobotSrc;
        openDoor3 = doorBeachSrc;
    } else {
        openDoor1 = doorBeachSrc;
        openDoor2 = doorSpaceSrc;
        openDoor3 = doorRobotSrc;
    };
};

doorImg1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImg1)) {
        doorImg1.src = openDoor1;
        playDoor(doorImg1);
    }
};

doorImg2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImg2)) {
        doorImg2.src = openDoor2;
        playDoor(doorImg2);
    }
};

doorImg3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImg3)) {
        doorImg3.src = openDoor3;
        playDoor(doorImg3);
    }
};

startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
    }
};

const startRound = () => {
    doorImg1.src = closedDoorSrc;
    doorImg2.src = closedDoorSrc;
    doorImg3.src = closedDoorSrc;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good Luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
};

const gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        currentStreak.innerHTML++;
    } else {
        startButton.innerHTML = 'Game Over! Play again?';
        currentStreak.innerHTML = 0;
    };
    if (currentStreak.innerHTML > bestStreak.innerHTML) {
        bestStreak.innerHTML = currentStreak.innerHTML;
    };
    currentlyPlaying = false;
};

startRound();