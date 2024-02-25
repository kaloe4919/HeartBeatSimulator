var seChannel = 0;
var heartStatus = {
    bpm: 65,
    bpmMin: 60,
    bpmMax: 70,
    condition: 100
};

function sleep(milliseconds) {
    if (milliseconds < 200) {
        milliseconds = 200;
    }
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Distribute the play SE channels as the heartbeats may overlap if the heart rate is too fast
function bufCounter() {
    if (seChannel >= 9) {
        seChannel = 0;
    } else {
        seChannel = seChannel + 1;
    }
}

function playBeatSound(bpm) {
    // If BPM is assigned, force playback at this BPM
    var playBpm = bpm ? bpm : heartStatus.bpm;  
    var soundFileType = ".wav";
    var soundConfig = {
        volume: heartStatus.beatVol,
        buf: seChannel.toString(),
        storage: "heartbeat/AC08_HB01" + soundFileType,
        isAsync: true,
    };

    if (playBpm < 50) {
        soundConfig.storage = "heartbeat/AC08_HB-22" + soundFileType;
    } else if (playBpm >= 50) {
        soundConfig.storage = "heartbeat/AC08_HB01" + soundFileType;
    } else if (playBpm >= 90) {
        soundConfig.storage =  "heartbeat/AC08_HB11" + soundFileType;
    } else if (playBpm >= 150) {
        soundConfig.storage = "heartbeat/AC08_HB21" + soundFileType;
    } else {
        soundConfig.storage = "heartbeat/AC08_HB31" + soundFileType;
    }

    TYRANO.kag.ftag.startTag("playse", soundConfig);

    bufCounter();
}

function playActorBeatMotion(bpm) {
    // If BPM is assigned, force playback at this BPM
    var playBpm = bpm ? bpm : heartStatus.bpm;  
    var motionConfig = {
        name: "Kyoka",
        mtn: "HeartBeat",
        no: "0",
        isAsync: true,
    };
    
    if (playBpm < 50) {
        motionConfig.no = "0";
    } else if (playBpm >= 50) {
        motionConfig.no = "0";
    } else if (playBpm >= 90) {
        motionConfig.no = "2";
    } else if (playBpm >= 120) {
        motionConfig.no = "3";
    } else if (playBpm >= 150) {
        motionConfig.no = "4";
    }
    TYRANO.kag.ftag.master_tag.live2d_motion.start(motionConfig);
}

function playHeartBeatMotion(bpm, cond) {
    // If BPM is assigned, force playback at this BPM
    var playBpm = bpm ? bpm : heartStatus.bpm;  
    var motionConfig = {
        name: "heart3",
        mtn: cond ? cond : "Normal",
        no: "0",
        isAsync: true,
    };
    
    if (playBpm < 50) {
        motionConfig.no = "0";
    } else if (playBpm >= 50) {
        motionConfig.no = "0";
    } else if (playBpm >= 70) {
        motionConfig.no = "1";
    } else if (playBpm >= 90) {
        motionConfig.no = "2";
    } else if (playBpm >= 120) {
        motionConfig.no = "3";
    }
    TYRANO.kag.ftag.master_tag.live2d_motion.start(motionConfig);
}

// Normal beat
async function beatRhythmNormal() {
    var random = randomRange(-3, 3);
    playActorBeatMotion();
    playHeartBeatMotion();
    playBeatSound();
    await sleep(Math.floor(60000 / heartStatus.bpm));
    // Slight variation in BPM (Between bpmMin and bpmMax)
    if (heartStatus.bpm + random <= heartStatus.bpmMax && heartStatus.bpm + random >= heartStatus.bpmMin) {
        heartStatus.bpm = heartStatus.bpm + random;
    }
}

// PVC beat
async function beatRhythmPVC() {
    console.log("PVC");
    var random = randomRange(-3, 3);
    playActorBeatMotion(heartStatus.bpm);
    playHeartBeatMotion(heartStatus.bpm, "PVC");
    playBeatSound(heartStatus.bpm - 60);
    await sleep(Math.floor(60000 / heartStatus.bpm / 2));
    playActorBeatMotion(heartStatus.bpm - 60);
    playBeatSound(heartStatus.bpm - 60);
    await sleep(Math.floor((60000 / heartStatus.bpm / 2) + (60000 / heartStatus.bpm) * 1.5));
    // Slight variation in BPM (Between bpmMin and bpmMax)
    if (heartStatus.bpm + random <= heartStatus.bpmMax && heartStatus.bpm + random >= heartStatus.bpmMin) {
        heartStatus.bpm = heartStatus.bpm + random;
    }
}

async function heartbeat() {
    var isDefinedBpm = true;
    while (isDefinedBpm) {
        var random = randomRange(0, heartStatus.condition);
        if (random > 10) {
            await beatRhythmNormal();
        } else {
            await beatRhythmPVC();
        }
    }
};

TYRANO.kag.ftag.master_tag.heartbeat_start = {
    kag: TYRANO.kag,
    vital : [],
    pm : {},
    start : function() {
        heartbeat();

        this.kag.ftag.nextOrder();    
    }
};

TYRANO.kag.ftag.master_tag.heartbeat_set_bpm = {
    kag: TYRANO.kag,
    vital : ["bpm"],
    pm : {
        bpm: "65"
    },
    start : function(pm) {
        heartStatus.bpm = parseInt(pm.bpm);
        heartStatus.bpmMin = parseInt(pm.bpm) - 10;
        heartStatus.bpmMax = parseInt(pm.bpm) + 10;

        this.kag.ftag.nextOrder();    
    }
};

