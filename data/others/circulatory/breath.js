
function sleep(milliseconds) {
    if (milliseconds < 200) {
        milliseconds = 200;
    }
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function playActorBreathMotion() {
    var motionConfig = {
        name: "Kyoka",
        mtn: "Breath",
        no: "0",
        isAsync: true,
    };
    
    TYRANO.kag.ftag.master_tag.live2d_breath_motion.start(motionConfig);
}

async function breathNormal() {
    playActorBreathMotion();
    await sleep(Math.floor(3000 + 200));
}

async function breath() {
    var isDefinedRr = true;
    while (isDefinedRr) {
        await breathNormal();
        console.log("breath");
    }
};

TYRANO.kag.ftag.master_tag.breath_start = {
    kag: TYRANO.kag,
    vital : [],
    pm : {},
    start : function() {
        breath();

        this.kag.ftag.nextOrder();
    }
};
