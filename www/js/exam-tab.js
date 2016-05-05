/**
 * Created by hxiao on 15/9/13.
 */

function generateRandomQuestion(type) {
    var question = {};
    var selId, corrId, randId;
    switch (type) {
        case 0:
            question.type = 0;
            question.text = window.lang.translate('Was bedeutet das Verkehrsschild?');
            selId = randInt(allData.traffic_sign.length);
            corrId = randInt(4);
            question.correct = corrId;
            question.answers = [];
            for (i = 0; i < 4; i++) {
                do {
                    randId = randInt(allData.traffic_sign.length);
                } while (randId == selId);

                question.answers.push({
                    isCorrect: false,
                    text:allData.traffic_sign[randId].short_meaning
                });
            }
            question.answers[corrId] = {
                isCorrect: true,
                text:allData.traffic_sign[selId].short_meaning
            };
            question.id = allData.traffic_sign[selId].id;
            break;
        case 1:
            question.type = 1;
            question.text = window.lang.translate('Was ist der beschriebene Schild?');
            selId = randInt(allData.traffic_sign.length);
            corrId = randInt(4);
            question.correct = corrId;
            question.answers = [];
            for (i = 0; i < 4; i++) {
                do {
                    randId = randInt(allData.traffic_sign.length);
                } while (randId == selId);

                question.answers.push({
                    isCorrect: false,
                    id:allData.traffic_sign[randId].id
                });
            }
            question.answers[corrId] = {
                isCorrect: true,
                id:allData.traffic_sign[selId].id
            };
            question.id = allData.traffic_sign[selId].id;
            question.description = allData.traffic_sign[selId].short_meaning;
            break;
    }

    question.title = window.lang.translate('Leistungstest');
    question.nextText = window.lang.translate('Weiter');
    return question;
}

function showCorrect(param) {
    var modalTitle;
    var iconDiv;
    if (param.dataset.iscorrect == "true") {
        $('*[data-iscorrect=true]').css('background-color','#4cd964');
        modalTitle = window.lang.translate("Ihre Antwort ist richtig!");
        iconDiv = '<div class="quiz-notification answer-correct">';
        window.localStorage.setItem('numCorr', ++numCorr);
    } else {
        $('*[data-iscorrect=true]').addClass("animated shake").css('background-color','#4cd964');
        modalTitle = window.lang.translate("Ihre Antwort ist falsch!");
        iconDiv = '<div class="quiz-notification answer-wrong">';
        window.localStorage.setItem('numWrong', ++numWrong);
    }
    $('*[data-iscorrect=false]').prop('onclick',null).off('click');
    $('*[data-iscorrect=true]').prop('onclick',null).off('click');
    $('.forward.link').addClass("animated pulse infinite");

    myApp.modal({
        title:  modalTitle,
        afterText: iconDiv
    });

    setTimeout(function () {
        myApp.closeModal();
    }, 1000);

}

function showNextQuiz() {
    switch (randInt(2)) {
        case 0:
            examView.router.loadContent(compiledQuizTemplate1(generateRandomQuestion(0)));
            break;
        case 1:
            examView.router.loadContent(compiledQuizTemplate2(generateRandomQuestion(1)));
            break;
    }
    window.localStorage.setItem('numTest', ++numTest);
}

function updateSummaryCard() {
    var summary = {
        title: window.lang.translate('Statistik'),
        props: [
            {
                icon: '<i class="fa fa-book"></i>',
                name: window.lang.translate('Gelernt'),
                value: numLearn
            },
            {
                icon: '<i class="fa fa-star"></i>',
                name: window.lang.translate('Markiert'),
                value: numStar
            },
            {
                icon: '<i class="fa fa-pencil-square-o"></i>',
                name: window.lang.translate('Geprüft'),
                value: numTest
            },
            {
                icon: '<i class="fa fa-pie-chart"></i>',
                name: window.lang.translate('Genauigkeit'),
                value: numTest == 0? window.lang.translate("Nicht verfügbar") : ((numCorr / numTest)*100).toFixed(0) + "% (" + numCorr + "/" + numTest + ")"
            }
        ]
    };

    $('#summary-card').remove();
    $('#exam-page .page-content').append(compiledCardTemplate(summary));

}

function updateExamTab() {
    updateSummaryCard();
}
