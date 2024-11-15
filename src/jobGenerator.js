const fs = require('fs');
const path = require('path');

// Load locations data
const locationsPath = path.join(__dirname, '../data/locations/locations.json');
const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

// Load job titles data
const jobTitlesPath = path.join(__dirname, '../data/job_titles/job_titles.json');
const jobTitlesData = JSON.parse(fs.readFileSync(jobTitlesPath, 'utf8'));

function generateJobEntry(id, submitterId, companyUid) {
    const location = getRandomLocation();
    const title = getRandomJobTitle();
    return {
        allowEasyApply: "FALSE",
        application: {
            applyEmail: [],
            applyUrl: []
        },
        autoRepost: "TRUE",
        companyName: "Bartels-Langness Handelsgesellschaft mbH & Co. KG",
        companyUid: companyUid,
        contactEmail: "osman@heyjobs.de",
        description: "<h4>Wissenswertes</h4> <ul> <li>Ausbildungsstart: 1. August</li> <li>Ausbildungsart: Duale Ausbildung</li> <li>Ausbildungsdauer: 2-3 Jahre</li> <li>Schulabschluss: Mittlerer Schulabschluss</li> <li>36 Werktage Urlaub im Jahr</li> </ul> <p>Gehalt:</p> <ul> <li>1. Lehrjahr: 1.000€</li> <li>2. Lehrjahr: 1.100€</li> <li>3. Lehrjahr: 1.210€</li> </ul> <h4>Was Dich bei uns erwartet</h4> <ul> <li>Ein faires Gehalt</li> <li>Persönliche Betreuung während der gesamten Ausbildung</li> <li>Spannende Azubiprojekte</li> <li>Übernahme bei guter Leistung</li> <li>Arbeiten in einer krisensicheren Branche</li> </ul> <h4>Deine Aufgaben</h4> <p>Du führst Beratungsgespräche mit Kundinnen und Kunden, verkaufst Ware und bearbeitest Reklamationen. Außerdem planst Du den Einkauf, bestellst Ware und nimmst Lieferungen entgegen. Anschließend prüfst Du die Qualität der gelieferten Ware und sorgst für eine fachgerechte Lagerung. Du zeichnest die Ware aus und hilfst beim Auffüllen der Verkaufsregale und Verkaufstheken, sowie bei der Gestaltung der Verkaufsräume. Auch bei der Planung und Umsetzung von werbe- und verkaufsfördernden Maßnahmen wirkst Du mit. Dazu beobachtest Du den Markt und unterstützt bei der Sortimentsgestaltung.</p> <h4>Während der Ausbildung lernst Du...</h4> <ul> <li>… die verschiedenen Abteilungen (z.B. Drogerie, Molkereiprodukte, Obst&Gemüse, Nonfood, u.v.m) in unserem Warenhaus kennen</li> <li>… wie man Personaleinsätze korrekt plant</li> <li>… wie die Kalkulation von Verkaufspreisen funktioniert</li> </ul> <h4>Das bringst Du mit</h4> <ul> <li>Du hast Freude an Kundengesprächen</li> <li>Du bist verantwortungsbewusst und Dein Team kann sich auf Dich verlassen</li> <li>Du bist offen, freundlich und ein respektvoller Umgang ist Dir wichtig</li> </ul> <h4>Davon profitierst Du</h4> <ul> <li>Weihnachts- und Urlaubsgeld</li> <li>Azubi-Start Event</li> <li>Persönliche Betreuung und Unterstützung von Ausbildung bis zur Prüfung</li> <li>Innerbetriebliche Schulungen</li> <li>Prämien für gute und sehr gute Prüfungsleistungen</li> </ul>",
        employmentType: "apprenticeship",
        feedId: "client_feed",
        imageBottom: {
            description: [],
            type: [],
            url: []
        },
        imageTop: {
            description: [],
            type: [],
            url: []
        },
        jobIndustry: [],
        jobIndustryId: [],
        jobPositionId: [],
        jobReference: generateUniqueJobReference(),
        jobType: "other",
        jobTypeCategory: [],
        linkOutType: [],
        location: {
            ...location,
            latitude: [],
            longitude: []
        },
        marketingBudget: [],
        runTime: "30",
        salaryAmount: [],
        salaryCurrency: "EUR",
        salaryPeriod: "month",
        salaryRangeMax: "3000000",
        salaryRangeMin: "110000",
        shortTitle: [],
        submitterId: submitterId,
        title: title,
        workingHours: "full_time",
        screening_questions1: {
            question_dealbreaker1: ["TRUE"],
            question_mandatory1: ["TRUE"],
            question_possible_answers1: [
                "Elektroniker / Elektriker (m/w/d) (alle Fachrichtungen), Mechatroniker (m/w/d) (alle Fachrichtungen), Industriemechaniker (m/w/d) (alle Fachrichtungen), Ich habe eine andere abgeschlossene technische Ausbildung. Zum Beispiel einen Techniker- oder Meisterabschluss oder einen technischen Studienabschluss, Ich verfüge über keine technische Ausbildung"
            ],
            question_preferred_answer1: [
                "Elektroniker / Elektriker (m/w/d) (alle Fachrichtungen), Mechatroniker (m/w/d) (alle Fachrichtungen), Industriemechaniker (m/w/d) (alle Fachrichtungen), Ich habe eine andere abgeschlossene technische Ausbildung. Zum Beispiel einen Techniker- oder Meisterabschluss oder einen technischen Studienabschluss"
            ],
            question_sorting_position1: ["1"],
            question_title1: ["Über welche abgeschlossene Ausbildung verfügst Du?"],
            question_type1: ["multiple_choice"]
        },
        screening_questions2: {
            question_dealbreaker2: ["FALSE"],
            question_mandatory2: ["TRUE"],
            question_possible_answers2: [
                "Ich habe noch keine Erfahrung / ich habe gerade meine Ausbildung abgeschlossen, 0-2 Jahre, 3 bis 5 Jahre, Mehr als 5 Jahre"
            ],
            question_preferred_answer2: [
                "0-2 Jahre, 3 bis 5 Jahre, Mehr als 5 Jahre"
            ],
            question_sorting_position2: ["2"],
            question_title2: ["Wie viel Berufserfahrung konntest Du bereits in technischen Jobs sammeln? Ich habe noch keine Erfahrung / ich habe gerade meine Ausbildung abgeschlossen."],
            question_type2: ["multiple_choice"]
        },
        screening_questions3: {
            question_dealbreaker3: ["FALSE"],
            question_mandatory3: ["TRUE"],
            question_possible_answers3: [],
            question_preferred_answer3: ["yes"],
            question_sorting_position3: ["3"],
            question_title3: ["Hast du bereits Erfahrung mit automatischen Förderanlagen / Gurtförderern gesammelt? (Kein Muss)"],
            question_type3: ["yes_no"]
        },
        screening_questions4: {
            question_dealbreaker4: ["FALSE"],
            question_mandatory4: ["TRUE"],
            question_possible_answers4: [
                "Ich habe eine Schweißerprüfung, Ich haben einen Staplerschein, Ich habe beide Qualifikationen (Staplerschein & Schweißerprüfung), Ich verfüge nicht über diese Qualifikationen"
            ],
            question_preferred_answer4: [
                "Ich habe eine Schweißerprüfung, Ich haben einen Staplerschein, Ich habe beide Qualifikationen (Staplerschein & Schweißerprüfung)"
            ],
            question_sorting_position4: ["4"],
            question_title4: ["Verfügst du über eine dieser Qualifikationen (Kein Muss)?"],
            question_type4: ["multiple_choice"]
        },
        screening_questions5: {
            question_dealbreaker5: ["TRUE"],
            question_mandatory5: ["TRUE"],
            question_possible_answers5: [],
            question_preferred_answer5: ["yes"],
            question_sorting_position5: ["5"],
            question_title5: ["Darfst Du innerhalb Deutschlands arbeiten?"],
            question_type5: ["yes_no"]
        }
    };
}

function getRandomLocation() {
    const randomIndex = Math.floor(Math.random() * locationsData.locations.length);
    return locationsData.locations[randomIndex];
}

function getRandomJobTitle() {
    const randomIndex = Math.floor(Math.random() * jobTitlesData.length);
    return jobTitlesData[randomIndex];
}

function getRandomSalary() {
    const min = 30000;
    const max = 120000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomEmploymentType() {
    const types = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
    return types[Math.floor(Math.random() * types.length)];
}

function generateUniqueJobReference() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 5-digit number between 1000 and 9999
}

module.exports = { generateJobEntry }; 