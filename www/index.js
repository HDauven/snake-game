import init, { World } from "snake-game";

init().then(_ => {
    const world = World.new();
    console.log(world.width);
});