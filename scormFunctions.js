/// JAH modifications for MediaPRO game Office Mayhem: Security
/// remove code for mastery score/passing score (this was causing a status of "failed" in SCORM Cloud)
/// add function to explicitly set completion when the game is won

var scormPresent;
var scormVersion;
var passingScore;
var currentRawScore;
var currentScaledScore;
var newRawScore;
var newScaledScore;
var completionStatus;
var globalStartDate;
var globalStartTime;
function isScormPresent() {
    scormPresent = pipwerks.SCORM.init();
    if (scormPresent) {
        initializeScorm();
    }
    updateSessionTimePeriodically();
    checkConnectionToScormPeriodically();
    return scormPresent;
}
function initializeScorm() {
    globalStartDate = new Date();
    globalStartTime = globalStartDate.getTime();
    scormVersion = pipwerks.SCORM.version;
    switch (scormVersion) {
        case "1.2":
            pipwerks.SCORM.set("cmi.core.score.min", 0);
            pipwerks.SCORM.set("cmi.core.score.max", 100);
            //passingScore = pipwerks.SCORM.get("cmi.student_data.mastery_score");
            var entryStatus = pipwerks.SCORM.get("cmi.core.entry");
            if (entryStatus === "ab-initio" || entryStatus === null || entryStatus === undefined || entryStatus === "") {
                currentRawScore = 0;
                pipwerks.SCORM.set("cmi.core.score.raw", currentRawScore);
            }
            else {
                currentRawScore = pipwerks.SCORM.get("cmi.core.score.raw");
            }
            completionStatus = pipwerks.SCORM.get("cmi.core.lesson_status");
            console.log(completionStatus);
            if (completionStatus === "not attempted") {
                pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
            }
            break;
        case "2004":
            pipwerks.SCORM.set("cmi.score.min", 0);
            pipwerks.SCORM.set("cmi.score.max", 100);
            //passingScore = pipwerks.SCORM.get("cmi.scaled_passing_score");
            var entryStatus = pipwerks.SCORM.get("cmi.entry");
            if (entryStatus === "ab-initio" || entryStatus === null || entryStatus === undefined || entryStatus === "") {
                currentRawScore = 0;
                currentScaledScore = 0;
                pipwerks.SCORM.set("cmi.score.raw", currentRawScore);
                pipwerks.SCORM.set("cmi.score.scaled", currentScaledScore);
            }
            else {
                currentRawScore = pipwerks.SCORM.get("cmi.score.raw");
                currentScaledScore = pipwerks.SCORM.get("cmi.score.scaled");
            }
            break;
    }
}
function updateScormSessionTime() {
    var currentSessionTime;
    if (scormVersion === "1.2") {
        currentSessionTime = convertToScorm12Time(globalStartDate, new Date());
        pipwerks.SCORM.set("cmi.core.session_time", currentSessionTime);
    }
    if (scormVersion === "2004") {
        var timeElapsed = new Date().getTime() - globalStartTime;
        currentSessionTime = ConvertMilliSecondsIntoSCORM2004Time(timeElapsed);
        pipwerks.SCORM.set("cmi.session_time", currentSessionTime);
    }
}
function updateSessionTimePeriodically() {
    updateScormSessionTime();
    setTimeout(updateSessionTimePeriodically, 28000);
}
function checkConnectionToScorm() {
    var inScormContainer = pipwerks.SCORM.API.isFound;
    var stillConnectedToScorm = pipwerks.SCORM.connection.isActive;
    if (inScormContainer) {
        if (!stillConnectedToScorm) {
            alert('Scorm connection lost');
            window.close();
        }
    }
}
function checkConnectionToScormPeriodically() {
    checkConnectionToScorm();
    setTimeout(checkConnectionToScormPeriodically, 29000);
}
function convertToScorm12Time(startDate, endDate) {
    if (startDate > endDate) {
        var _ref = [endDate, startDate];
        startDate = _ref[0];
        endDate = _ref[1];
    }
    var elapsedTime = endDate.getTime() - startDate.getTime();
    var oneSecondInMil = 1000;
    var oneMinuteInMil = oneSecondInMil * 60;
    var oneHoursInMil = oneMinuteInMil * 60;
    var addZeroIfLessThan10 = function addZeroIfLessThan10(val) {
        return val < 10 ? "0" + val.toFixed() : val.toFixed();
    };
    var seconds = elapsedTime / oneSecondInMil % 60;
    elapsedTime = elapsedTime - seconds * oneSecondInMil;
    var minutes = elapsedTime / oneMinuteInMil % 60;
    elapsedTime = elapsedTime - minutes * oneMinuteInMil;
    var hours = elapsedTime / oneHoursInMil;
    return "".concat(addZeroIfLessThan10(hours), ":").concat(addZeroIfLessThan10(minutes), ":").concat(addZeroIfLessThan10(seconds));
}
function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds) {
    var ScormTime = '';
    var HundredthsOfASecond;
    var HUNDREDTHS_PER_SECOND = 100;
    var HUNDREDTHS_PER_MINUTE = HUNDREDTHS_PER_SECOND * 60;
    var HUNDREDTHS_PER_HOUR = HUNDREDTHS_PER_MINUTE * 60;
    var HUNDREDTHS_PER_DAY = HUNDREDTHS_PER_HOUR * 24;
    var HUNDREDTHS_PER_MONTH = HUNDREDTHS_PER_DAY * ((365 * 4 + 1) / 48);
    var HUNDREDTHS_PER_YEAR = HUNDREDTHS_PER_MONTH * 12;
    intTotalMilliseconds = Math.abs(intTotalMilliseconds);
    HundredthsOfASecond = Math.floor(intTotalMilliseconds / 10);
    var Years = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_YEAR);
    HundredthsOfASecond -= Years * HUNDREDTHS_PER_YEAR;
    var Months = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MONTH);
    HundredthsOfASecond -= Months * HUNDREDTHS_PER_MONTH;
    var Days = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_DAY);
    HundredthsOfASecond -= Days * HUNDREDTHS_PER_DAY;
    var Hours = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_HOUR);
    HundredthsOfASecond -= Hours * HUNDREDTHS_PER_HOUR;
    var Minutes = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MINUTE);
    HundredthsOfASecond -= Minutes * HUNDREDTHS_PER_MINUTE;
    var Seconds = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_SECOND);
    HundredthsOfASecond -= Seconds * HUNDREDTHS_PER_SECOND;
    if (Years > 0) {
        ScormTime += Years + 'Y';
    }
    if (Months > 0) {
        ScormTime += Months + 'M';
    }
    if (Days > 0) {
        ScormTime += Days + 'D';
    }
    if (HundredthsOfASecond + Seconds + Minutes + Hours > 0) {
        ScormTime += 'T';
        if (Hours > 0) {
            ScormTime += Hours + 'H';
        }
        if (Minutes > 0) {
            ScormTime += Minutes + 'M';
        }
        if (HundredthsOfASecond + Seconds > 0) {
            ScormTime += Seconds;
            if (HundredthsOfASecond > 0) {
                ScormTime += '.' + HundredthsOfASecond;
            }
            ScormTime += 'S';
        }
    }
    if (ScormTime == '') {
        ScormTime = '0S';
    }
    ScormTime = 'P' + ScormTime;
    return ScormTime;
}
function getCurrentScormScore() {
    if (scormVersion === "1.2") {
        currentRawScore = pipwerks.SCORM.get("cmi.core.score.raw");
    }
    if (scormVersion === "2004") {
        currentRawScore = pipwerks.SCORM.get("cmi.score.raw");
    }
    updateScormSessionTime();
    return currentRawScore;
}
function getPassingScormScore() {
    var passingScoreRaw;
    if (scormVersion === "1.2") {
        passingScoreRaw = pipwerks.SCORM.get("cmi.student_data.mastery_score");
    }
    if (scormVersion === "2004") {
        passingScoreRaw = pipwerks.SCORM.get("cmi.scaled_passing_score");
        passingScoreRaw = passingScoreRaw * 100;
    }
    updateScormSessionTime();
    return passingScoreRaw;
}
function setScormScoreExplicitly(explicitRawScore) {
    if (explicitRawScore === undefined || isNaN(explicitRawScore)) {
        throw "Score to be set was not a number";
    }
    switch (scormVersion) {
        case "1.2":
            // if (explicitRawScore >= passingScore) {
            //     pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
            // }
            pipwerks.SCORM.set("cmi.core.score.raw", explicitRawScore);
            break;
        case "2004":
            var explicitScaledScore = explicitRawScore / 100;
            if (explicitScaledScore > 1) {
                explicitScaledScore = 1;
            }
            // if (explicitScaledScore >= passingScore) {
            //     pipwerks.SCORM.set("cmi.completion_status", "completed");
            // }
            pipwerks.SCORM.set("cmi.score.raw", explicitRawScore);
            pipwerks.SCORM.set("cmi.score.scaled", explicitScaledScore);
            break;
    }
}
function setScormScore(setScore) {
    try {
        setScormScoreExplicitly(setScore);
        updateScormSessionTime();
    }
    catch (e) {
        console.error(e);
    }
}
function incrementScormScore(addedPoints) {
    if (addedPoints === undefined || isNaN(addedPoints)) {
        addedPoints = 0;
    }
    switch (scormVersion) {
        case "1.2":
            currentRawScore = pipwerks.SCORM.get("cmi.core.score.raw");
            currentRawScore = parseFloat(currentRawScore.toString());
            newRawScore = currentRawScore + addedPoints;
            // if (newRawScore >= passingScore) {
            //     pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
            // }
            pipwerks.SCORM.set("cmi.core.score.raw", newRawScore);
            break;
        case "2004":
            currentRawScore = pipwerks.SCORM.get("cmi.score.raw");
            currentScaledScore = pipwerks.SCORM.get("cmi.score.scaled");
            currentRawScore = parseFloat(currentRawScore.toString());
            currentScaledScore = parseFloat(currentScaledScore.toString());
            newRawScore = currentRawScore + addedPoints;
            newScaledScore = +parseFloat((currentScaledScore + (addedPoints / 100)).toString()).toFixed(2);
            if (newScaledScore > 1) {
                newScaledScore = 1;
            }
            // if (newScaledScore >= passingScore) {
            //     pipwerks.SCORM.set("cmi.completion_status", "completed");
            // }
            pipwerks.SCORM.set("cmi.score.raw", newRawScore);
            pipwerks.SCORM.set("cmi.score.scaled", newScaledScore);
            break;
    }
    updateScormSessionTime();
}
function decrementScormScore(deductedPoints) {
    if (deductedPoints === undefined || isNaN(deductedPoints)) {
        deductedPoints = 0;
    }
    switch (scormVersion) {
        case "1.2":
            currentRawScore = pipwerks.SCORM.get("cmi.core.score.raw");
            currentRawScore = parseFloat(currentRawScore.toString());
            newRawScore = currentRawScore - deductedPoints;
            pipwerks.SCORM.set("cmi.core.score.raw", newRawScore);
            break;
        case "2004":
            currentRawScore = pipwerks.SCORM.get("cmi.score.raw");
            currentScaledScore = pipwerks.SCORM.get("cmi.score.scaled");
            currentRawScore = parseFloat(currentRawScore.toString());
            currentScaledScore = parseFloat(currentScaledScore.toString());
            newRawScore = currentRawScore - deductedPoints;
            newScaledScore = +parseFloat((currentScaledScore - (deductedPoints / 100)).toString()).toFixed(2);
            pipwerks.SCORM.set("cmi.score.raw", newRawScore);
            pipwerks.SCORM.set("cmi.score.scaled", newScaledScore);
            break;
    }
    updateScormSessionTime();
}
function saveScormScore() {
    updateScormSessionTime();
    pipwerks.SCORM.save();
}

// ADDED by JAH to allow SCO to explicitly set completion 12-15-22
function setScormCompletion() {
    switch (scormVersion) {
        case "1.2":
            completionStatus = pipwerks.SCORM.get("cmi.core.lesson_status");
            console.log(completionStatus);
            if (completionStatus === "incomplete") {
                pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
            }
            break;
        case "2004":
            completionStatus = pipwerks.SCORM.get("cmi.completion_status");
            console.log(completionStatus);
            if (completionStatus === "incomplete") {
                pipwerks.SCORM.set("cmi.completion_status", "completed");
            }
            break;
    }
    updateScormSessionTime();
    pipwerks.SCORM.save();
}

////////////

function closeScorm() {
    updateScormSessionTime();
    pipwerks.SCORM.quit();
}
window.addEventListener('beforeunload', function (e) {
    if (scormPresent) {
        saveScormScore();
        closeScorm();
    }
    delete e['returnValue'];
});
