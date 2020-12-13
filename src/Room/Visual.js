// Visual start here

function alert(text, mode, delay) {
    Memory.Timer.State = true;
    Memory.Timer.EndTime = delay;
}

function VisualNotification() {
    if (Memory.Timer.State) {
        if (Memory.Timer.Now == undefined) Memory.Timer.Now = 0;
        else Memory.Timer.Now = Memory.Timer.Now + 1;

        if (Memory.Timer.Now < Memory.Timer.EndTime) {
            console.log(Memory.Timer.Now)
            new RoomVisual().rect(0.5,40.5,5.6,4,{fill:'#474b4e',opacity:40 / 100,stroke:'##3b3e40',})
        } else {
            Memory.Timer.State = false;
            delete Memory.Timer.Now;
        }
    }
}