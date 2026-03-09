import { useState, useMemo } from "react";
// Pure SVG charts - no external dependencies needed

const C={blue:"#00549F",bd:"#003B6F",bl:"#407FB7",bp:"#8EBAE5",bg:"#E8F1F8",grn:"#57AB27",tl:"#0098A1",mag:"#E30066",ora:"#F6A800",g9:"#2D2D2D",g7:"#646464",g5:"#9C9C9C",g3:"#CFD1D2",g1:"#ECEDED",g0:"#F6F6F6",w:"#FFF"};
const TC={1:C.grn,2:C.blue,3:C.tl};const TB={1:"#EBF5E0",2:C.bg,3:"#E0F4F5"};
const CC={1:"#0098A1",2:"#882255",3:"#E30066",4:"#CC6677",5:"#F6A800",6:"#88CCEE",7:"#00549F",8:"#DDCC77",9:"#AA4499",10:"#57AB27"};
const CN={1:{en:"Applied Geography",de:"Angewandte Geographie"},2:{en:"Natural & Computational Sciences",de:"Natur- & Computerwissenschaften"},3:{en:"Architecture",de:"Architektur"},4:{en:"Civil & Business Engineering",de:"Bau- & Wirtschaftsingenieurwesen"},5:{en:"Business & Management",de:"BWL & Management"},6:{en:"Chemistry & Mgmt. Mathematics",de:"Chemie & Wirtschaftsmathematik"},7:{en:"Technical STEM",de:"Technische MINT-Fächer"},8:{en:"Resource & Materials Eng.",de:"Rohstoff- & Werkstofftechnik"},9:{en:"Social Sciences & Humanities",de:"Sozial- & Geisteswissenschaften"},10:{en:"Education & Health Sciences",de:"Bildungs- & Gesundheitswissenschaften"}};

const PROGS=[
{en:"Applied Geography",de:"Angewandte Geographie",deg:"B.Sc.",cl:1,code:"ICS",R:2.24,I:3.80,A:1.47,S:2.64,E:2.06,C:2.69},
{en:"Applied Geosciences",de:"Angewandte Geowissenschaften",deg:"B.Sc.",cl:2,code:"ICR",R:2.64,I:3.79,A:1.39,S:2.39,E:1.68,C:2.93},
{en:"Architecture",de:"Architektur",deg:"B.Sc.",cl:3,code:"RCS",R:4.18,I:2.70,A:2.96,S:3.39,E:2.31,C:3.45},
{en:"Biology",de:"Biologie",deg:"B.Sc.",cl:2,code:"ICR",R:2.89,I:4.27,A:1.36,S:2.47,E:1.50,C:3.58},
{en:"Business Administration",de:"Betriebswirtschaftslehre",deg:"B.Sc.",cl:5,code:"ECI",R:2.46,I:3.17,A:1.76,S:2.59,E:3.70,C:3.67},
{en:"Business Admin. and Eng.: Civil Eng.",de:"Wirtschaftsingenieurwesen Bau",deg:"B.Sc.",cl:4,code:"CRE",R:3.56,I:3.13,A:1.35,S:2.45,E:3.14,C:3.96},
{en:"Business Admin. and Eng.: Electrical Power Eng.",de:"Wirtschaftsingenieurwesen Elektro",deg:"B.Sc.",cl:5,code:"CEI",R:2.99,I:3.02,A:1.52,S:2.09,E:3.16,C:3.41},
{en:"Business Admin. and Eng.: Materials and Process Eng.",de:"Wirtschaftsingenieurwesen Werkstofftechnik",deg:"B.Sc.",cl:4,code:"IEC",R:3.53,I:3.75,A:1.78,S:2.30,E:3.67,C:3.59},
{en:"Business Admin. and Eng.: Mechanical Eng.",de:"Wirtschaftsingenieurwesen Maschinenbau",deg:"B.Sc.",cl:4,code:"RCE",R:3.68,I:3.12,A:1.40,S:2.10,E:3.29,C:3.58},
{en:"Chemistry (Plus)",de:"Chemie (Plus)",deg:"B.Sc.",cl:6,code:"ICR",R:3.09,I:4.48,A:1.08,S:2.24,E:1.33,C:3.84},
{en:"Civil Engineering",de:"Bauingenieurwesen",deg:"B.Sc.",cl:4,code:"CRI",R:3.55,I:3.12,A:1.38,S:2.62,E:2.08,C:4.07},
{en:"Computational Engineering Science",de:"Computational Engineering Science",deg:"B.Sc.",cl:2,code:"IRC",R:3.43,I:3.59,A:1.45,S:2.47,E:1.85,C:3.08},
{en:"Computer Engineering",de:"Computer Engineering",deg:"B.Sc.",cl:7,code:"CIR",R:3.11,I:3.29,A:1.60,S:2.83,E:2.03,C:3.48},
{en:"Computer Science",de:"Informatik",deg:"B.Sc.",cl:7,code:"ICR",R:2.51,I:3.38,A:1.23,S:2.04,E:1.63,C:3.34},
{en:"Electrical Engineering and Information Technology",de:"Elektrotechnik und Informationstechnik",deg:"B.Sc.",cl:7,code:"ICR",R:3.24,I:3.49,A:1.55,S:2.50,E:1.98,C:3.28},
{en:"Environmental Engineering",de:"Umweltingenieurwissenschaften",deg:"B.Sc.",cl:7,code:"ICR",R:3.43,I:3.64,A:1.38,S:2.83,E:1.93,C:3.64},
{en:"Georesource Management",de:"Georessourcenmanagement",deg:"B.Sc.",cl:8,code:"IRC",R:3.75,I:4.10,A:1.45,S:2.73,E:1.80,C:3.20},
{en:"Linguistics and Communication Science",de:"Sprach- und Kommunikationswissenschaft",deg:"B.A.",cl:9,code:"SIC",R:2.00,I:3.67,A:2.31,S:3.74,E:1.94,C:2.81},
{en:"Logopedics",de:"Logopädie",deg:"B.Sc.",cl:10,code:"SIC",R:1.85,I:3.37,A:2.08,S:4.79,E:1.26,C:3.03},
{en:"Management Science and Mathematics",de:"Wirtschaftsmathematik",deg:"B.Sc.",cl:6,code:"CIE",R:2.78,I:3.50,A:1.58,S:2.37,E:3.47,C:3.59},
{en:"Materials Science",de:"Materialwissenschaften",deg:"B.Sc.",cl:2,code:"IRC",R:3.33,I:3.72,A:1.09,S:1.96,E:1.44,C:3.21},
{en:"Mathematics",de:"Mathematik",deg:"B.Sc.",cl:7,code:"ICS",R:2.08,I:3.19,A:1.22,S:2.56,E:1.73,C:3.10},
{en:"Mechanical Engineering",de:"Maschinenbau",deg:"B.Sc.",cl:7,code:"RCI",R:3.63,I:3.41,A:1.33,S:2.24,E:2.15,C:3.43},
{en:"Molecular and Applied Biotechnology",de:"Molekulare und Angewandte Biotechnologie",deg:"B.Sc.",cl:7,code:"ICR",R:3.10,I:4.30,A:1.24,S:2.61,E:2.05,C:3.68},
{en:"Philosophy, Literary Studies and Linguistics",de:"Philosophie, Literatur- und Sprachwissenschaft",deg:"B.A.",cl:9,code:"AIC",R:1.62,I:3.50,A:3.72,S:2.58,E:1.30,C:2.75},
{en:"Physics (Plus)",de:"Physik (Plus)",deg:"B.Sc.",cl:2,code:"ICR",R:2.60,I:4.10,A:1.02,S:1.93,E:1.20,C:2.66},
{en:"Primary School Teacher",de:"Grundschullehramt",deg:"B.Ed.",cl:10,code:"SIC",R:2.75,I:3.39,A:2.47,S:4.81,E:1.89,C:3.15},
{en:"Psychology",de:"Psychologie",deg:"B.Sc.",cl:10,code:"ISC",R:1.73,I:4.23,A:1.39,S:4.05,E:1.39,C:2.96},
{en:"Social Sciences",de:"Gesellschaftswissenschaften",deg:"B.A.",cl:9,code:"ISC",R:1.88,I:3.71,A:2.63,S:3.28,E:2.02,C:2.94},
{en:"Sociology (Technology Studies)",de:"Soziologie mit Schwerpunkt Technikforschung",deg:"B.A.",cl:9,code:"ISC",R:2.00,I:4.28,A:1.58,S:2.75,E:1.91,C:2.52},
{en:"Sustainable Energy Supply",de:"Nachhaltige Rohstoff- und Energieversorgung",deg:"B.Sc.",cl:7,code:"RIC",R:3.45,I:3.39,A:1.25,S:2.65,E:2.27,C:3.33},
{en:"Sustainable Materials Engineering",de:"Nachhaltige Werkstofftechnik",deg:"B.Sc.",cl:8,code:"IRC",R:3.79,I:4.08,A:1.75,S:2.50,E:2.62,C:3.17},
{en:"Teaching",de:"Lehramt",deg:"B.A./B.Sc.",cl:10,code:"SIC",R:2.39,I:3.26,A:2.51,S:4.39,E:1.49,C:3.20},
{en:"Transport Engineering and Mobility",de:"Verkehrsingenieurwesen und Mobilität",deg:"B.Sc.",cl:7,code:"CIR",R:3.04,I:3.27,A:1.23,S:2.41,E:2.44,C:3.69},
];

// BIS Operations
const BIS_OPS=[
  {id:"pc",en:"Processing Capacity",de:"Verarbeitungskapazität",icon:"K",core:true,desc_en:"Corresponds to reasoning (fluid intelligence): processing complex information that requires drawing upon diverse information, establishing relationships, formally logical thinking, and evaluating information (Jäger et al., 1997).",desc_de:"Entspricht dem schlussfolgernden Denken (fluide Intelligenz): Verarbeitung komplexer Informationen, die vielfältiges Beziehungsstiften, formallogisch exaktes Denken und sachgerechtes Beurteilen erfordern (Jäger et al., 1997)."},
  {id:"cr",en:"Creativity",de:"Einfallsreichtum",icon:"E",core:true,desc_en:"Close to fluency and flexibility (divergent thinking): flexible idea production presupposing diverse information and richness of imagination. Focus on problem-oriented solutions, not uncontrolled fantasy (Jäger et al., 1997).",desc_de:"Nahe verwandt mit Flüssigkeit und Flexibilität (divergentes Denken): flexible Ideenproduktion, die vielfältige Informationen und Vorstellungsreichtum voraussetzt. Fokus auf problemorientierte Lösungen (Jäger et al., 1997)."},
  {id:"me",en:"Memory",de:"Merkfähigkeit",icon:"G",desc_en:"Active encoding and short-term recognition or reproduction of diverse material. Encompasses retaining information in working memory and retrieving it later (Jäger et al., 1997).",desc_de:"Aktives Einprägen und kurzfristiges Wiedererkennen oder Reproduzieren verschiedenartigen Materials. Informationen im Arbeitsgedächtnis behalten und später abrufen (Jäger et al., 1997)."},
  {id:"ps",en:"Processing Speed",de:"Bearbeitungsgeschwindigkeit",icon:"B",desc_en:"Speed of work, ease of comprehension, and concentration when solving simply structured tasks. Captures quick and accurate performance on simple cognitive tasks (mental speed) (Jäger et al., 1997).",desc_de:"Arbeitstempo, Auffassungsleichtigkeit und Konzentration beim Lösen einfach strukturierter Aufgaben. Erfasst schnelle und genaue Leistung bei einfachen kognitiven Aufgaben (Jäger et al., 1997)."},
];
// BIS Contents
const BIS_CONT=[
  {id:"ve",en:"Verbal",de:"Verbal",icon:"Tt",desc_en:"Language-bound thinking: degree of acquisition and availability of the relational system of language (Jäger et al., 1997)",desc_de:"Sprachgebundenes Denken: Grad der Aneignung und Verfügbarkeit des Beziehungssystems Sprache (Jäger et al., 1997)"},
  {id:"nu",en:"Numerical",de:"Numerisch",icon:"#",desc_en:"Number-bound thinking: degree of acquisition and availability of the relational system of numbers (Jäger et al., 1997)",desc_de:"Zahlengebundenes Denken: Grad der Aneignung und Verfügbarkeit des Beziehungssystems Zahlen (Jäger et al., 1997)"},
  {id:"fi",en:"Figural",de:"Figural",icon:"◇",desc_en:"Figural-pictorial thinking: processing requiring figural-pictorial and/or spatial imagination (Jäger et al., 1997)",desc_de:"Anschauungsgebundenes Denken: Bearbeitung, die figural-bildhaftes und/oder räumliches Vorstellen erfordert (Jäger et al., 1997)"},
];

// Additional cognitive (non-BIS)
const EXTRA_COG=[
  {id:"sk",en:"Scientific Literacy",de:"Scientific Literacy",def_en:"Ability to engage with science-related issues as a reflective citizen. Encompasses using scientific knowledge to identify questions, explain phenomena, and draw evidence-based conclusions across all disciplines — from natural and engineering sciences to social sciences and humanities (OECD, 2016).",def_de:"Fähigkeit, sich als reflektierte Person mit wissenschaftlichen Themen auseinanderzusetzen. Umfasst die Anwendung wissenschaftlichen Wissens, um Fragestellungen zu erkennen, Phänomene zu erklären und evidenzbasierte Schlussfolgerungen zu ziehen — über alle Disziplinen hinweg (OECD, 2016)."},
  {id:"ss",en:"Scientific Skills",de:"Wissenschaftliche Arbeitstechniken",def_en:"Fundamental competencies of scientific inquiry and methodology, including explaining phenomena scientifically, evaluating and designing investigations, and interpreting data and evidence. Methodology varies across disciplines but shares a commitment to systematic, evidence-based, and methodologically rigorous inquiry.",def_de:"Grundlegende Kompetenzen der wissenschaftlichen Erkenntnisgewinnung, einschließlich Phänomene wissenschaftlich zu erklären, Untersuchungen zu bewerten und zu planen sowie Daten und Evidenz zu interpretieren. Methodik variiert je nach Disziplin, verbunden durch systematisches, evidenzbasiertes und methodisch rigoroses Arbeiten."},
  {id:"tm",en:"Technical-Mechanical Abilities",de:"Technisch-mechanische Fähigkeiten",def_en:"Complex set of capacities including the ability to perceive spatial relations, understand the relationship of physical forces and mechanical elements in practical situations, and recognize relevant mechanical principles. Underlying concepts include force, motion, gravity, velocity, levers, and gears (Bennett, 1994).",def_de:"Komplexes Bündel von Fähigkeiten, darunter räumliche Beziehungen wahrzunehmen, den Zusammenhang physikalischer Kräfte und mechanischer Elemente in praktischen Situationen zu verstehen und relevante mechanische Prinzipien zu erkennen. Zugrunde liegende Konzepte umfassen Kraft, Bewegung, Hebel und Zahnräder (Bennett, 1994)."},
  {id:"ep",en:"English Proficiency",de:"Englischkenntnisse",def_en:"Ability to use English across the four core skills: listening, reading, writing, and speaking. Essential for understanding English-language literature, participating in international academic discourse, and producing scientific texts. Proficiency levels defined by the CEFR from A1 to C2 (Council of Europe, 2020).",def_de:"Fähigkeit, Englisch in den vier Kernfertigkeiten Hören, Lesen, Schreiben und Sprechen einzusetzen. Unerlässlich für englischsprachige Fachliteratur, internationale akademische Kommunikation und wissenschaftliche Texte. Kompetenzstufen nach GER von A1 bis C2 (Europarat, 2020)."},
  {id:"dl",en:"Digital Literacy",de:"Digitale Kompetenz",def_en:"Ability to access, manage, understand, evaluate, and create information through digital technologies. Involves confident, critical, and responsible use of digital technologies for learning, work, and societal participation. Includes information literacy, digital content creation, and problem-solving (UNESCO, 2018; DigComp 2.2).",def_de:"Fähigkeit, Informationen über digitale Technologien zu finden, zu verwalten, zu verstehen, zu bewerten und zu erstellen. Umfasst selbstbewussten, kritischen und verantwortungsvollen Umgang mit digitalen Technologien zum Lernen, Arbeiten und zur gesellschaftlichen Teilhabe (UNESCO, 2018; DigComp 2.2)."},
  {id:"mu",en:"Musicality",de:"Musikalität",def_en:"General, innate human disposition for communication through shaped tones, rhythms, and sounds. Ranges from basic abilities such as pitch discrimination to highly expertised performances. Results from a complex interaction of nature and nurture underlying musical behavior and perception (Gembris, 2018).",def_de:"Allgemeine, angeborene menschliche Disposition zur Kommunikation mit gestalteten Tönen, Rhythmen und Klängen. Reicht von basalen Fähigkeiten wie Tonhöhenunterscheidung bis zu hochexpertisierten Leistungen. Ergebnis einer komplexen Interaktion von Anlage und Umwelt (Gembris, 2018)."},
  {id:"pg",en:"Programming",de:"Programmierkenntnisse",def_en:"Ability to design algorithms and implement them in programming languages to solve problems systematically. Encompasses understanding fundamental concepts (variables, control structures, data structures), translating logical processes into executable code, debugging, and testing. Increasingly relevant across disciplines for data analysis, simulation, and automation.",def_de:"Fähigkeit, Algorithmen zu entwerfen und in Programmiersprachen umzusetzen, um Probleme systematisch zu lösen. Umfasst grundlegende Konzepte (Variablen, Kontrollstrukturen, Datenstrukturen), Übersetzen logischer Prozesse in ausführbaren Code, Debugging und Testen. Zunehmend relevant in vielen Disziplinen für Datenanalyse, Simulation und Automatisierung."},
  {id:"pr",en:"Presentation Skills",de:"Präsentationsfähigkeiten",def_en:"Ability to present content in a structured, comprehensible, and persuasive manner to an audience. Encompasses planning and organization of content, clear verbal communication, effective use of visual aids, confident body language, responding to questions, and managing stage fright.",def_de:"Fähigkeit, Inhalte strukturiert, verständlich und überzeugend vor einem Publikum darzustellen. Umfasst Planung und Gliederung von Inhalten, klare verbale Kommunikation, effektiven Einsatz visueller Hilfsmittel, selbstsicheres Auftreten, das Eingehen auf Fragen und den Umgang mit Lampenfieber."},
];

// Non-cognitive competencies
const NONCOG=[
  {id:"se",en:"Self-Efficacy",de:"Selbstwirksamkeit",def_en:"Confidence in one's ability to master academic challenges. Encompasses judgments about task-specific capabilities and the belief that educational goals can be achieved. Enhances performance through higher goal-setting, greater effort, and persistence in the face of adversity (Bandura, 1997).",def_de:"Überzeugung, akademische Herausforderungen bewältigen zu können. Umfasst Einschätzungen der eigenen aufgabenspezifischen Fähigkeiten und den Glauben, Bildungsziele erreichen zu können. Fördert Leistung durch höhere Zielsetzung, größere Anstrengung und Ausdauer bei Rückschlägen (Bandura, 1997).",tier:1},
  {id:"sm",en:"Self-Management",de:"Selbstmanagement",sub_en:"(incl. Low Procrastination)",sub_de:"(inkl. Geringe Prokrastination)",def_en:"Ability to organize, plan, and regulate one's own behavior, time, and resources to achieve goals effectively. Includes low procrastination: resisting the tendency to voluntarily delay intended actions despite expecting negative consequences from the delay (Steel, 2007).",def_de:"Fähigkeit, das eigene Verhalten, Zeit und Ressourcen zu organisieren, zu planen und zu regulieren, um Ziele effektiv zu erreichen. Beinhaltet geringe Prokrastination: der Tendenz widerstehen, beabsichtigte Handlungen freiwillig aufzuschieben, obwohl negative Konsequenzen erwartet werden (Steel, 2007).",tier:1},
  {id:"co",en:"Conscientiousness",de:"Gewissenhaftigkeit",def_en:"Big Five personality dimension describing the tendency to be self-disciplined, organized, achievement-oriented, and dependable. Associated with greater motivation to perform well and higher persistence when faced with difficult tasks (Richardson et al., 2012).",def_de:"Big-Five-Persönlichkeitsdimension, die die Tendenz zu Selbstdisziplin, Organisation, Leistungsorientierung und Verlässlichkeit beschreibt. Verbunden mit höherer Leistungsmotivation und größerer Ausdauer bei schwierigen Aufgaben (Richardson et al., 2012).",tier:1},
  {id:"er",en:"Effort Regulation",de:"Anstrengungsregulation",def_en:"Ability to control effort and attention in the face of distractions and uninteresting tasks. Reflects persistence in challenging academic situations and commitment to completing study goals. Regulates the continued use of learning strategies (Pintrich et al., 1991).",def_de:"Fähigkeit, Anstrengung und Aufmerksamkeit auch bei Ablenkungen und uninteressanten Aufgaben aufrechtzuerhalten. Spiegelt Ausdauer in herausfordernden akademischen Situationen und die Bereitschaft wider, Studienziele weiterzuverfolgen (Pintrich et al., 1991).",tier:1},
  {id:"mo",en:"Motivation",de:"Motivation",def_en:"Process whereby goal-directed activities are initiated and sustained. Encompasses expectancy beliefs, value beliefs, and goal orientations. Influences behavior through its impact on direction of effort, intensity of engagement, and persistence (Cook & Artino, 2016).",def_de:"Prozess, durch den zielgerichtete Aktivitäten initiiert und aufrechterhalten werden. Umfasst Erwartungsüberzeugungen, Wertüberzeugungen und Zielorientierungen. Beeinflusst Verhalten durch Wirkung auf Richtung, Intensität und Ausdauer der Anstrengung (Cook & Artino, 2016).",tier:2},
  {id:"re",en:"Resilience",de:"Resilienz",def_en:"Process and outcome of successfully adapting to difficult or challenging experiences through mental, emotional, and behavioral flexibility. Encompasses the capacity to maintain health and adaptive outcomes even in the presence of adversity (APA, 2022).",def_de:"Prozess und Ergebnis der erfolgreichen Anpassung an schwierige Erfahrungen durch mentale, emotionale und verhaltensbezogene Flexibilität. Umfasst die Fähigkeit, auch unter Widrigkeiten gesund und anpassungsfähig zu bleiben (APA, 2022).",tier:2},
  {id:"cn",en:"Concentration",de:"Konzentration",def_en:"Capacity to remain attentive and task-focused during academic tasks. Encompasses sustaining attention over extended periods, resisting distractions, and maintaining cognitive engagement with the material at hand (Richardson et al., 2012).",def_de:"Fähigkeit, bei akademischen Aufgaben aufmerksam und fokussiert zu bleiben. Umfasst das Aufrechterhalten der Aufmerksamkeit über längere Zeiträume, das Widerstehen von Ablenkungen und die kognitive Beschäftigung mit dem vorliegenden Material (Richardson et al., 2012).",tier:2},
  {id:"es",en:"Emotional Stability",de:"Emotionale Stabilität",def_en:"Positive pole of the Big Five dimension Neuroticism. Characterized by low anxiety, emotional balance, ability to delay gratification, and reduced vulnerability to stressors. Associated with remaining calm under pressure and lower test anxiety (Richardson et al., 2012).",def_de:"Positiver Pol der Big-Five-Dimension Neurotizismus. Gekennzeichnet durch geringe Ängstlichkeit, emotionale Ausgeglichenheit, Fähigkeit zur Bedürfnisaufschiebung und geringere Anfälligkeit gegenüber Stressoren. Verbunden mit Ruhe unter Druck und geringerer Prüfungsangst (Richardson et al., 2012).",tier:2},
  {id:"idd",en:"Interdisciplinary Thinking",de:"Interdisziplinäres Denken",def_en:"Capacity to integrate knowledge and modes of thinking from two or more disciplines to produce cognitive advancement — explaining phenomena, solving problems, or creating products in ways impossible through single-disciplinary means (Boix Mansilla et al., 2000).",def_de:"Fähigkeit, Wissen und Denkweisen aus zwei oder mehr Disziplinen zu integrieren, um kognitive Fortschritte zu erzielen — Phänomene zu erklären, Probleme zu lösen oder Produkte zu schaffen auf eine durch rein disziplinäre Mittel unmögliche Weise (Boix Mansilla et al., 2000).",tier:2},
  {id:"nc",en:"Need for Cognition",de:"Kognitionsbedürfnis",def_en:"Tendency to engage in and enjoy effortful thinking. Individuals high in need for cognition are intrinsically motivated to engage in complex cognitive processing. Positively associated with fluid intelligence, openness, and goal orientation (Cacioppo & Petty, 1982).",def_de:"Tendenz, sich gerne mit anspruchsvollem Denken zu beschäftigen. Personen mit hohem Kognitionsbedürfnis sind intrinsisch motiviert für komplexe kognitive Verarbeitung. Positiv assoziiert mit fluider Intelligenz, Offenheit und Zielorientierung (Cacioppo & Petty, 1982).",tier:2},
  {id:"sc",en:"Social Skills",de:"Sozialkompetenz",def_en:"Range of skills promoting effective functioning in interpersonal situations. Encompasses three dimensions: Agency Skill (assertive, self-confident behavior), Communion Skill (warm, compassionate behavior), and Interpersonal Resilience (calm, emotionally balanced behavior) (Breil et al., 2022).",def_de:"Spektrum an Fertigkeiten für effektives Handeln in zwischenmenschlichen Situationen. Umfasst drei Dimensionen: Agency Skill (durchsetzungsstarkes Verhalten), Communion Skill (warmherziges Verhalten) und Interpersonelle Resilienz (gelassenes, emotional ausgeglichenes Verhalten) (Breil et al., 2022).",tier:2},
  {id:"lt",en:"Low Test Anxiety",de:"Geringe Prüfungsangst",def_en:"Absence of debilitating fear or worry about negative evaluation in testing situations. Test anxiety comprises a cognitive component (negative thoughts disrupting performance) and an emotionality component (physiological arousal). Low test anxiety means minimal interference from these components (Von der Embse et al., 2018).",def_de:"Fehlen beeinträchtigender Furcht oder Sorge vor negativer Bewertung in Prüfungssituationen. Prüfungsangst umfasst eine kognitive Komponente (leistungsstörende negative Gedanken) und eine Emotionalitätskomponente (physiologische Erregung). Geringe Prüfungsangst bedeutet minimale Beeinträchtigung (Von der Embse et al., 2018).",tier:2},
  {id:"sf",en:"Self-Care",de:"Selbstfürsorge",def_en:"Active behavior aimed at ensuring one's own psychological and physical well-being. Involves consciously attending to health through nutrition, sleep, physical activity, social interactions, relaxation, and stress management (Dahl & Dlugosch, 2020).",def_de:"Aktives Handeln zur Sicherstellung des eigenen psychischen und physischen Wohlbefindens. Umfasst bewusstes Kümmern um die Gesundheit durch Ernährung, Schlaf, Bewegung, soziale Kontakte, Entspannung und Stressmanagement (Dahl & Dlugosch, 2020).",tier:2},
  {id:"lc",en:"Learning Skills",de:"Lernkompetenz",def_en:"Ability to regulate learning processes autonomously, make use of external learning opportunities, and independently close knowledge gaps. Integrates cognitive strategies, metacognitive regulation (planning, monitoring, adjusting), and resource management (Weinert, 2001; Pintrich et al., 1991).",def_de:"Fähigkeit, Lernprozesse eigenständig zu regulieren, externe Lernangebote zu nutzen und selbständig Wissenslücken zu schließen. Integriert kognitive Strategien, metakognitive Regulation (Planen, Überwachen, Anpassen) und Ressourcenmanagement (Weinert, 2001; Pintrich et al., 1991).",tier:2},
  {id:"op",en:"Openness",de:"Offenheit",def_en:"Big Five personality dimension characterized by intellectual curiosity, imagination, and openness to new experiences. Students high in openness are more willing to consider new ideas and better able to manage new learning essential to academic achievement (Mammadov, 2022).",def_de:"Big-Five-Persönlichkeitsdimension, gekennzeichnet durch intellektuelle Neugier, Phantasiereichtum und Aufgeschlossenheit gegenüber neuen Erfahrungen. Studierende mit hoher Offenheit sind eher bereit, neue Ideen zu erwägen und neues Lernmaterial besser zu verarbeiten (Mammadov, 2022).",tier:2},
  {id:"ag",en:"Agreeableness",de:"Verträglichkeit",def_en:"Big Five personality dimension characterized by being trusting, empathetic, and cooperative. Agreeable individuals show greater cooperation with instructors and peers, facilitating the learning process, and attend classes more consistently (Richardson et al., 2012).",def_de:"Big-Five-Persönlichkeitsdimension, gekennzeichnet durch Vertrauenswürdigkeit, Empathie und Kooperationsbereitschaft. Verträgliche Personen zeigen mehr Kooperation mit Lehrenden und Mitstudierenden, was den Lernprozess fördert (Richardson et al., 2012).",tier:2},
  {id:"tw",en:"Teamwork",de:"Teamarbeit",def_en:"Combined efforts of attitudes, behaviors, and cognitions necessary to accomplish tasks in a team context. Effective teamwork requires shared knowledge, mutual trust, open communication, and coordinated behaviors among team members (Salas et al., 2018).",def_de:"Kombination aus Einstellungen, Verhaltensweisen und Kognitionen, die notwendig sind, um Aufgaben im Teamkontext zu erreichen. Effektive Teamarbeit erfordert geteiltes Wissen, gegenseitiges Vertrauen, offene Kommunikation und koordiniertes Verhalten (Salas et al., 2018).",tier:2},
  {id:"ra",en:"Reflective Ability",de:"Reflexionsfähigkeit",def_en:"Capacity to think about one's own thinking, feeling, and acting — to analyze and question them for deeper self-knowledge. Encompasses reflection-in-action (during action) and reflection-on-action (subsequent analysis to derive alternatives) (Schön, 1983).",def_de:"Fähigkeit, über das eigene Denken, Fühlen und Handeln nachzudenken — es zu analysieren und zu hinterfragen. Umfasst Reflection-in-Action (während des Handelns) und Reflection-on-Action (nachträgliche Analyse zur Ableitung von Alternativen) (Schön, 1983).",tier:2},
  {id:"rc",en:"Receptiveness to Criticism",de:"Kritikfähigkeit",def_en:"Ability to accept, process, and constructively respond to negative feedback without becoming defensive. A component of interpersonal resilience — showing calm, emotionally balanced behavior when confronted with criticism or questioning of one's abilities (Breil et al., 2022).",def_de:"Fähigkeit, negatives Feedback anzunehmen, zu verarbeiten und konstruktiv darauf zu reagieren, ohne defensiv zu werden. Komponente der interpersonellen Resilienz — gelassenes Verhalten bei Konfrontation mit Kritik oder Infragestellung der eigenen Fähigkeiten (Breil et al., 2022).",tier:3},
  {id:"em",en:"Empathy",de:"Empathie",def_en:"Ability to perceive, understand, and share the emotional states of others — to take their perspective and respond with appropriate emotional reactions. A core component of Communion Skill: warm, compassionate behavior when the situation requires it (Davis, 1983; Breil et al., 2022).",def_de:"Fähigkeit, die emotionalen Zustände anderer wahrzunehmen, zu verstehen und nachzuempfinden — ihre Perspektive einzunehmen und mit angemessenen Reaktionen zu antworten. Kernkomponente der Communion Skill: warmherziges Verhalten, wenn die Situation es erfordert (Davis, 1983; Breil et al., 2022).",tier:3},
  {id:"ex",en:"Extraversion",de:"Extraversion",def_en:"Big Five personality dimension characterized by assertiveness, sociability, and positive engagement in social interactions. In academic contexts, extraversion may be beneficial for collaborative work but can limit effort regulation through distraction by social activities (Richardson et al., 2012).",def_de:"Big-Five-Persönlichkeitsdimension, gekennzeichnet durch Durchsetzungsfähigkeit, Geselligkeit und positives Engagement in sozialen Interaktionen. Im akademischen Kontext kann Extraversion für kooperatives Arbeiten förderlich sein, aber durch Ablenkung durch soziale Aktivitäten die Anstrengungsregulation einschränken (Richardson et al., 2012).",tier:3},
];

// Per program: which BIS ops, BIS contents, extra cog, and noncog IDs are included
// BIS: pc=always(T1), cr=always(T1). me, ps vary. ve, nu, fi vary.
const PP={
0:{ops:["pc","cr","me"],con:["ve","nu","fi"],xc:["sk","ss","pr"],nc:["idd","sc","es","nc","lt","sf","op","ag"]},
1:{ops:["pc","cr","me"],con:["ve","nu","fi"],xc:["sk","ss","pr"],nc:["idd","sc","es","nc","nu","lt","op","ag"]},
2:{ops:["pc","cr","me"],con:["ve","fi"],xc:["tm","ss","pr"],nc:["mo","re","sc","ra","tw","es","idd","nc","lt","op","ag","rc","ex"]},
3:{ops:["pc","cr","me"],con:["ve","nu"],xc:["sk","ss","ep"],nc:["mo","re","idd","sc","es","nc","lt","sf","op","ag","tw"]},
4:{ops:["pc","cr","me"],con:["ve","nu"],xc:[],nc:["cn","idd","es","nc","lt","op","ag"]},
5:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["cn","es","nc","lt","ag","tw"]},
6:{ops:["pc","cr","me"],con:["nu"],xc:[],nc:["es","nc","lt","op","ag"]},
7:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["es","nc","lt","op","ag"]},
8:{ops:["pc","cr","me","ps"],con:["nu","fi"],xc:["sk","tm","pg"],nc:["mo","re","cn","idd","es","nc","lt","ag"]},
9:{ops:["pc","cr","me"],con:["ve","nu"],xc:["sk","ss","pg"],nc:["re","ra","es","nc","lt","op","ag"]},
10:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["es","nc","lt","ag"]},
11:{ops:["pc","cr","me"],con:["nu","fi"],xc:["ep","pg"],nc:["re","cn","lc","es","nc","lt","op","ag"]},
12:{ops:["pc","cr","me"],con:["ve","nu","fi"],xc:["tm"],nc:["cn","sf","lc","ra","tw","es","nc","lt","op","ag"]},
13:{ops:["pc","cr","me"],con:["ve","nu"],xc:["dl"],nc:["mo","re","cn","lc","ra","tw","es","nc","lt","op","ag"]},
14:{ops:["pc","cr","me","ps"],con:["nu","fi"],xc:["sk","ep"],nc:["mo","re","cn","sc","sf","es","nc","lt","op","ag"]},
15:{ops:["pc","cr","me"],con:["nu","fi"],xc:["sk","tm"],nc:["re","sf","es","nc","lt","op","ag"]},
16:{ops:["pc","cr","me"],con:["ve","nu","fi"],xc:[],nc:["es","nc","lt","ag"]},
17:{ops:["pc","cr"],con:["ve"],xc:[],nc:["es","nc","lt","op","ag","ex"]},
18:{ops:["pc","cr","me"],con:["ve"],xc:["ep","ss","mu"],nc:["re","sc","sf","es","nc","lt","op","ag","rc","em"]},
19:{ops:["pc","cr","me"],con:["ve","nu"],xc:[],nc:["es","nc","lt","op","ag"]},
20:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["mo","re","idd","tw","es","nc","lt","op","ag"]},
21:{ops:["pc","cr","me"],con:["ve","nu"],xc:[],nc:["mo","re","sf","tw","es","nc","lt","op","ag"]},
22:{ops:["pc","cr","me","ps"],con:["nu","fi"],xc:["sk","tm"],nc:["mo","re","cn","lc","es","nc","lt","op","ag"]},
23:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["es","nc","lt","op","ag"]},
24:{ops:["pc","cr"],con:["ve"],xc:[],nc:["es","nc","lt","op","ag"]},
25:{ops:["pc","cr"],con:["nu","fi"],xc:[],nc:["mo","cn","sf","es","nc","lt","op","ag"]},
26:{ops:["pc","cr","me"],con:["ve","nu","fi"],xc:["ss"],nc:["mo","re","sc","sf","lc","ra","tw","es","nc","lt","op","ag","em"]},
27:{ops:["pc","cr"],con:["ve","nu"],xc:[],nc:["es","nc","lt","op","ag"]},
28:{ops:["pc","cr"],con:["ve"],xc:[],nc:["mo","sc","sf","es","nc","lt","op","ag","ex"]},
29:{ops:["pc","cr"],con:["ve"],xc:[],nc:["mo","sc","sf","es","nc","lt","op","ag","ex"]},
30:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["es","nc","lt","ag"]},
31:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["es","nc","lt","ag"]},
32:{ops:["pc","cr","me"],con:["ve"],xc:["ss"],nc:["mo","re","cn","sc","sf","lc","ra","tw","es","nc","lt","op","ag","em"]},
33:{ops:["pc","cr","me"],con:["nu","fi"],xc:[],nc:["es","nc","lt","ag"]},
};

// Model-level competencies for overview tab — ordered to match poster
const ALL_COMPS=[
  // Tier 1: Core — BIS first, then non-cognitive
  {id:"pc",en:"Processing Capacity",de:"Verarbeitungskapazität",t:1,bis:true,def_en:"Processing of complex information in tasks requiring drawing upon diverse information, establishing multiple relationships, formal-logical thinking, and appropriate evaluation. Corresponds to reasoning / fluid intelligence (Jäger et al., 1997).",def_de:"Verarbeitung komplexer Informationen bei Aufgaben, die vielfältiges Beziehungsstiften, formallogisch exaktes Denken und sachgerechtes Beurteilen erfordern. Entspricht dem schlussfolgernden Denken / fluide Intelligenz (Jäger et al., 1997)."},
  {id:"cr",en:"Creativity",de:"Einfallsreichtum",t:1,bis:true,def_en:"Flexible idea production presupposing the availability of diverse information and richness of imagination. Focus on problem-oriented solutions — seeing many different aspects, variants, and possibilities of objects and problems. Close to fluency and flexibility / divergent thinking (Jäger et al., 1997).",def_de:"Flexible Ideenproduktion, die vielfältige Informationen und Vorstellungsreichtum voraussetzt. Fokus auf problemorientierte Lösungen — viele verschiedene Seiten, Varianten und Möglichkeiten erkennen. Nahe verwandt mit Flüssigkeit und Flexibilität / divergentes Denken (Jäger et al., 1997)."},
  {id:"se",en:"Self-Efficacy",de:"Selbstwirksamkeit",t:1,def_en:"Confidence in one's ability to master academic challenges. Encompasses judgments about task-specific capabilities and the belief that educational goals can be achieved. Enhances performance through higher goal-setting, greater effort, and persistence in the face of adversity (Bandura, 1997).",def_de:"Überzeugung, akademische Herausforderungen bewältigen zu können. Umfasst Einschätzungen der eigenen aufgabenspezifischen Fähigkeiten und den Glauben, Bildungsziele erreichen zu können. Fördert Leistung durch höhere Zielsetzung, größere Anstrengung und Ausdauer bei Rückschlägen (Bandura, 1997)."},
  {id:"sm",en:"Self-Management",de:"Selbstmanagement",sub_en:"(incl. Low Procrastination)",sub_de:"(inkl. Geringe Prokrastination)",t:1,def_en:"Ability to organize, plan, and regulate one's own behavior, time, and resources to achieve goals effectively. Includes low procrastination: resisting the tendency to voluntarily delay intended actions despite expecting negative consequences from the delay (Steel, 2007).",def_de:"Fähigkeit, das eigene Verhalten, Zeit und Ressourcen zu organisieren, zu planen und zu regulieren, um Ziele effektiv zu erreichen. Beinhaltet geringe Prokrastination: der Tendenz widerstehen, beabsichtigte Handlungen freiwillig aufzuschieben, obwohl negative Konsequenzen erwartet werden (Steel, 2007)."},
  {id:"er",en:"Effort Regulation",de:"Anstrengungsregulation",t:1,def_en:"Ability to control effort and attention in the face of distractions and uninteresting tasks. Reflects persistence in challenging academic situations and commitment to completing study goals. Regulates the continued use of learning strategies (Pintrich et al., 1991).",def_de:"Fähigkeit, Anstrengung und Aufmerksamkeit auch bei Ablenkungen und uninteressanten Aufgaben aufrechtzuerhalten. Spiegelt Ausdauer in herausfordernden akademischen Situationen und die Bereitschaft wider, Studienziele weiterzuverfolgen (Pintrich et al., 1991)."},
  {id:"co",en:"Conscientiousness",de:"Gewissenhaftigkeit",t:1,b5:true,def_en:"Big Five personality dimension describing the tendency to be self-disciplined, organized, achievement-oriented, and dependable. Associated with greater motivation to perform well and higher persistence when faced with difficult tasks (Richardson et al., 2012).",def_de:"Big-Five-Persönlichkeitsdimension, die die Tendenz zu Selbstdisziplin, Organisation, Leistungsorientierung und Verlässlichkeit beschreibt. Verbunden mit höherer Leistungsmotivation und größerer Ausdauer bei schwierigen Aufgaben (Richardson et al., 2012)."},
  // Tier 2: Specialized — BIS first, then cognitive-adjacent, then non-cognitive/soft
  {id:"me",en:"Memory",de:"Merkfähigkeit",t:2,bis:true,def_en:"Active encoding and short-term recognition or reproduction of diverse material. Encompasses the ability to retain information in working memory and retrieve it later (Jäger et al., 1997).",def_de:"Aktives Einprägen und kurzfristiges Wiedererkennen oder Reproduzieren verschiedenartigen Materials. Umfasst die Fähigkeit, Informationen im Arbeitsgedächtnis zu behalten und später abzurufen (Jäger et al., 1997)."},
  {id:"nu",en:"Numerical Abilities",de:"Numerische Fähigkeiten",t:2,bis:true,def_en:"Number-bound thinking: the degree of acquisition and availability of the relational system of numbers. Captures how well individuals can operate within numerical frameworks, including mathematical operations, numerical reasoning, and quantitative problem-solving (Jäger et al., 1997).",def_de:"Zahlengebundenes Denken: Grad der Aneignung und Verfügbarkeit des Beziehungssystems Zahlen. Erfasst, wie gut Personen innerhalb numerischer Bezugssysteme agieren — mathematische Operationen, numerisches Schlussfolgern und quantitative Problemlösung (Jäger et al., 1997)."},
  {id:"fi",en:"Figural Abilities",de:"Figurale Fähigkeiten",t:2,bis:true,def_en:"Figural-pictorial thinking: processing that requires figural-pictorial and/or spatial imagination. Captures the ability to mentally manipulate and reason with visual-spatial information (Jäger et al., 1997).",def_de:"Anschauungsgebundenes, figural-bildhaftes Denken: Bearbeitung, die figural-bildhaftes und/oder räumliches Vorstellen erfordert. Erfasst die Fähigkeit, visuell-räumliche Informationen mental zu verarbeiten und damit zu schlussfolgern (Jäger et al., 1997)."},
  {id:"ve",en:"Verbal Abilities",de:"Verbale Fähigkeiten",t:2,bis:true,def_en:"Language-bound thinking: the degree of acquisition and availability of the relational system of language. Captures how well individuals can operate within linguistic frameworks, including vocabulary, verbal comprehension, and language-based reasoning (Jäger et al., 1997).",def_de:"Sprachgebundenes Denken: Grad der Aneignung und Verfügbarkeit des Beziehungssystems Sprache. Erfasst, wie gut Personen innerhalb sprachlicher Bezugssysteme agieren — Wortschatz, Sprachverständnis und sprachbasiertes Schlussfolgern (Jäger et al., 1997)."},
  {id:"idd",en:"Interdisciplinary Thinking",de:"Interdisziplinäres Denken",t:2,def_en:"Capacity to integrate knowledge and modes of thinking from two or more disciplines to produce cognitive advancement — explaining phenomena, solving problems, or creating products in ways impossible through single-disciplinary means (Boix Mansilla et al., 2000).",def_de:"Fähigkeit, Wissen und Denkweisen aus zwei oder mehr Disziplinen zu integrieren, um kognitive Fortschritte zu erzielen — Phänomene zu erklären, Probleme zu lösen oder Produkte zu schaffen auf eine durch rein disziplinäre Mittel unmögliche Weise (Boix Mansilla et al., 2000)."},
  {id:"cn",en:"Concentration",de:"Konzentration",t:2,def_en:"Capacity to remain attentive and task-focused during academic tasks. Encompasses sustaining attention over extended periods, resisting distractions, and maintaining cognitive engagement with the material at hand (Richardson et al., 2012).",def_de:"Fähigkeit, bei akademischen Aufgaben aufmerksam und fokussiert zu bleiben. Umfasst das Aufrechterhalten der Aufmerksamkeit über längere Zeiträume, das Widerstehen von Ablenkungen und die kognitive Beschäftigung mit dem vorliegenden Material (Richardson et al., 2012)."},
  {id:"sk",en:"Scientific Literacy",de:"Scientific Literacy",t:2,def_en:"Ability to engage with science-related issues as a reflective citizen. Encompasses using scientific knowledge to identify questions, explain phenomena, and draw evidence-based conclusions across all disciplines — from natural and engineering sciences to social sciences and humanities (OECD, 2016).",def_de:"Fähigkeit, sich als reflektierte Person mit wissenschaftlichen Themen auseinanderzusetzen. Umfasst die Anwendung wissenschaftlichen Wissens, um Fragestellungen zu erkennen, Phänomene zu erklären und evidenzbasierte Schlussfolgerungen zu ziehen — über alle Disziplinen hinweg (OECD, 2016)."},
  {id:"ss",en:"Scientific Skills",de:"Wissenschaftliche Arbeitstechniken",t:2,def_en:"Fundamental competencies of scientific inquiry and methodology, including explaining phenomena scientifically, evaluating and designing investigations, and interpreting data and evidence. Methodology varies across disciplines but shares a commitment to systematic, evidence-based, and methodologically rigorous inquiry.",def_de:"Grundlegende Kompetenzen der wissenschaftlichen Erkenntnisgewinnung, einschließlich Phänomene wissenschaftlich zu erklären, Untersuchungen zu bewerten und zu planen sowie Daten und Evidenz zu interpretieren. Methodik variiert je nach Disziplin, verbunden durch systematisches, evidenzbasiertes und methodisch rigoroses Arbeiten."},
  {id:"ep",en:"English Proficiency",de:"Englischkenntnisse",t:2,def_en:"Ability to use English across the four core skills: listening, reading, writing, and speaking. Essential for understanding English-language literature, participating in international academic discourse, and producing scientific texts. Proficiency levels defined by the CEFR from A1 to C2 (Council of Europe, 2020).",def_de:"Fähigkeit, Englisch in den vier Kernfertigkeiten Hören, Lesen, Schreiben und Sprechen einzusetzen. Unerlässlich für englischsprachige Fachliteratur, internationale akademische Kommunikation und wissenschaftliche Texte. Kompetenzstufen nach GER von A1 bis C2 (Europarat, 2020)."},
  {id:"lc",en:"Learning Skills",de:"Lernkompetenz",t:2,def_en:"Ability to regulate learning processes autonomously, make use of external learning opportunities, and independently close knowledge gaps. Integrates cognitive strategies, metacognitive regulation (planning, monitoring, adjusting), and resource management (Weinert, 2001; Pintrich et al., 1991).",def_de:"Fähigkeit, Lernprozesse eigenständig zu regulieren, externe Lernangebote zu nutzen und selbständig Wissenslücken zu schließen. Integriert kognitive Strategien, metakognitive Regulation (Planen, Überwachen, Anpassen) und Ressourcenmanagement (Weinert, 2001; Pintrich et al., 1991)."},
  {id:"sf",en:"Self-Care",de:"Selbstfürsorge",t:2,def_en:"Active behavior aimed at ensuring one's own psychological and physical well-being. Involves consciously attending to health through nutrition, sleep, physical activity, social interactions, relaxation, and stress management (Dahl & Dlugosch, 2020).",def_de:"Aktives Handeln zur Sicherstellung des eigenen psychischen und physischen Wohlbefindens. Umfasst bewusstes Kümmern um die Gesundheit durch Ernährung, Schlaf, Bewegung, soziale Kontakte, Entspannung und Stressmanagement (Dahl & Dlugosch, 2020)."},
  {id:"ra",en:"Reflective Ability",de:"Reflexionsfähigkeit",t:2,def_en:"Capacity to think about one's own thinking, feeling, and acting — to analyze and question them for deeper self-knowledge. Encompasses reflection-in-action (during action) and reflection-on-action (subsequent analysis to derive alternatives) (Schön, 1983).",def_de:"Fähigkeit, über das eigene Denken, Fühlen und Handeln nachzudenken — es zu analysieren und zu hinterfragen. Umfasst Reflection-in-Action (während des Handelns) und Reflection-on-Action (nachträgliche Analyse zur Ableitung von Alternativen) (Schön, 1983)."},
  {id:"re",en:"Resilience",de:"Resilienz",t:2,def_en:"Process and outcome of successfully adapting to difficult or challenging experiences through mental, emotional, and behavioral flexibility. Encompasses the capacity to maintain health and adaptive outcomes even in the presence of adversity (APA, 2022).",def_de:"Prozess und Ergebnis der erfolgreichen Anpassung an schwierige Erfahrungen durch mentale, emotionale und verhaltensbezogene Flexibilität. Umfasst die Fähigkeit, auch unter Widrigkeiten gesund und anpassungsfähig zu bleiben (APA, 2022)."},
  {id:"es",en:"Emotional Stability",de:"Emotionale Stabilität",t:2,b5:true,def_en:"Positive pole of the Big Five dimension Neuroticism. Characterized by low anxiety, emotional balance, ability to delay gratification, and reduced vulnerability to stressors. Associated with remaining calm under pressure and lower test anxiety (Richardson et al., 2012).",def_de:"Positiver Pol der Big-Five-Dimension Neurotizismus. Gekennzeichnet durch geringe Ängstlichkeit, emotionale Ausgeglichenheit, Fähigkeit zur Bedürfnisaufschiebung und geringere Anfälligkeit gegenüber Stressoren. Verbunden mit Ruhe unter Druck und geringerer Prüfungsangst (Richardson et al., 2012)."},
  {id:"op",en:"Openness",de:"Offenheit",t:2,b5:true,def_en:"Big Five personality dimension characterized by intellectual curiosity, imagination, and openness to new experiences. Students high in openness are more willing to consider new ideas and better able to manage new learning essential to academic achievement (Mammadov, 2022).",def_de:"Big-Five-Persönlichkeitsdimension, gekennzeichnet durch intellektuelle Neugier, Phantasiereichtum und Aufgeschlossenheit gegenüber neuen Erfahrungen. Studierende mit hoher Offenheit sind eher bereit, neue Ideen zu erwägen und neues Lernmaterial besser zu verarbeiten (Mammadov, 2022)."},
  {id:"ag",en:"Agreeableness",de:"Verträglichkeit",t:2,b5:true,def_en:"Big Five personality dimension characterized by being trusting, empathetic, and cooperative. Agreeable individuals show greater cooperation with instructors and peers, facilitating the learning process, and attend classes more consistently (Richardson et al., 2012).",def_de:"Big-Five-Persönlichkeitsdimension, gekennzeichnet durch Vertrauenswürdigkeit, Empathie und Kooperationsbereitschaft. Verträgliche Personen zeigen mehr Kooperation mit Lehrenden und Mitstudierenden, was den Lernprozess fördert (Richardson et al., 2012)."},
  {id:"lt",en:"Low Test Anxiety",de:"Geringe Prüfungsangst",t:2,def_en:"Absence of debilitating fear or worry about negative evaluation in testing situations. Test anxiety comprises a cognitive component (negative thoughts disrupting performance) and an emotionality component (physiological arousal). Low test anxiety means minimal interference from these components (Von der Embse et al., 2018).",def_de:"Fehlen beeinträchtigender Furcht oder Sorge vor negativer Bewertung in Prüfungssituationen. Prüfungsangst umfasst eine kognitive Komponente (leistungsstörende negative Gedanken) und eine Emotionalitätskomponente (physiologische Erregung). Geringe Prüfungsangst bedeutet minimale Beeinträchtigung (Von der Embse et al., 2018)."},
  {id:"tw",en:"Teamwork",de:"Teamarbeit",t:2,def_en:"Combined efforts of attitudes, behaviors, and cognitions necessary to accomplish tasks in a team context. Effective teamwork requires shared knowledge, mutual trust, open communication, and coordinated behaviors among team members (Salas et al., 2018).",def_de:"Kombination aus Einstellungen, Verhaltensweisen und Kognitionen, die notwendig sind, um Aufgaben im Teamkontext zu erreichen. Effektive Teamarbeit erfordert geteiltes Wissen, gegenseitiges Vertrauen, offene Kommunikation und koordiniertes Verhalten (Salas et al., 2018)."},
  {id:"sc",en:"Social Skills",de:"Sozialkompetenz",t:2,def_en:"Range of skills promoting effective functioning in interpersonal situations. Encompasses three dimensions: Agency Skill (assertive, self-confident behavior), Communion Skill (warm, compassionate behavior), and Interpersonal Resilience (calm, emotionally balanced behavior) (Breil et al., 2022).",def_de:"Spektrum an Fertigkeiten für effektives Handeln in zwischenmenschlichen Situationen. Umfasst drei Dimensionen: Agency Skill (durchsetzungsstarkes Verhalten), Communion Skill (warmherziges Verhalten) und Interpersonelle Resilienz (gelassenes, emotional ausgeglichenes Verhalten) (Breil et al., 2022)."},
  {id:"nc",en:"Need for Cognition",de:"Kognitionsbedürfnis",t:2,def_en:"Tendency to engage in and enjoy effortful thinking. Individuals high in need for cognition are intrinsically motivated to engage in complex cognitive processing. Positively associated with fluid intelligence, openness, and goal orientation (Cacioppo & Petty, 1982).",def_de:"Tendenz, sich gerne mit anspruchsvollem Denken zu beschäftigen. Personen mit hohem Kognitionsbedürfnis sind intrinsisch motiviert für komplexe kognitive Verarbeitung. Positiv assoziiert mit fluider Intelligenz, Offenheit und Zielorientierung (Cacioppo & Petty, 1982)."},
  {id:"mo",en:"Motivation",de:"Motivation",t:2,def_en:"Process whereby goal-directed activities are initiated and sustained. Encompasses expectancy beliefs, value beliefs, and goal orientations. Influences behavior through its impact on direction of effort, intensity of engagement, and persistence (Cook & Artino, 2016).",def_de:"Prozess, durch den zielgerichtete Aktivitäten initiiert und aufrechterhalten werden. Umfasst Erwartungsüberzeugungen, Wertüberzeugungen und Zielorientierungen. Beeinflusst Verhalten durch Wirkung auf Richtung, Intensität und Ausdauer der Anstrengung (Cook & Artino, 2016)."},
  // Tier 3: Program-Specific — BIS first, then rest matching poster
  {id:"ps",en:"Processing Speed",de:"Bearbeitungsgeschwindigkeit",t:3,bis:true,def_en:"Speed of work, ease of comprehension, and concentration when solving simply structured tasks of low difficulty. Captures quick and accurate performance on simple cognitive tasks / mental speed (Jäger et al., 1997).",def_de:"Arbeitstempo, Auffassungsleichtigkeit und Konzentration beim Lösen einfach strukturierter Aufgaben von geringem Schwierigkeitsniveau. Erfasst schnelle und genaue Leistung bei einfachen kognitiven Aufgaben / mentale Geschwindigkeit (Jäger et al., 1997)."},
  {id:"tm",en:"Technical-Mechanical Abilities",de:"Technisch-mechanische Fähigkeiten",t:3,def_en:"Complex set of capacities including the ability to perceive spatial relations, understand the relationship of physical forces and mechanical elements in practical situations, and recognize relevant mechanical principles. Underlying concepts include force, motion, gravity, velocity, levers, and gears (Bennett, 1994).",def_de:"Komplexes Bündel von Fähigkeiten, darunter räumliche Beziehungen wahrzunehmen, den Zusammenhang physikalischer Kräfte und mechanischer Elemente in praktischen Situationen zu verstehen und relevante mechanische Prinzipien zu erkennen. Zugrunde liegende Konzepte umfassen Kraft, Bewegung, Hebel und Zahnräder (Bennett, 1994)."},
  {id:"ex",en:"Extraversion",de:"Extraversion",t:3,b5:true,def_en:"Big Five personality dimension characterized by assertiveness, sociability, and positive engagement in social interactions. In academic contexts, extraversion may be beneficial for collaborative work but can limit effort regulation through distraction by social activities (Richardson et al., 2012).",def_de:"Big-Five-Persönlichkeitsdimension, gekennzeichnet durch Durchsetzungsfähigkeit, Geselligkeit und positives Engagement in sozialen Interaktionen. Im akademischen Kontext kann Extraversion für kooperatives Arbeiten förderlich sein, aber durch Ablenkung durch soziale Aktivitäten die Anstrengungsregulation einschränken (Richardson et al., 2012)."},
  {id:"rc",en:"Receptiveness to Criticism",de:"Kritikfähigkeit",t:3,def_en:"Ability to accept, process, and constructively respond to negative feedback without becoming defensive. A component of interpersonal resilience — showing calm, emotionally balanced behavior when confronted with criticism or questioning of one's abilities (Breil et al., 2022).",def_de:"Fähigkeit, negatives Feedback anzunehmen, zu verarbeiten und konstruktiv darauf zu reagieren, ohne defensiv zu werden. Komponente der interpersonellen Resilienz — gelassenes Verhalten bei Konfrontation mit Kritik oder Infragestellung der eigenen Fähigkeiten (Breil et al., 2022)."},
  {id:"mu",en:"Musicality",de:"Musikalität",t:3,def_en:"General, innate human disposition for communication through shaped tones, rhythms, and sounds. Ranges from basic abilities such as pitch discrimination to highly expertised performances. Results from a complex interaction of nature and nurture underlying musical behavior and perception (Gembris, 2018).",def_de:"Allgemeine, angeborene menschliche Disposition zur Kommunikation mit gestalteten Tönen, Rhythmen und Klängen. Reicht von basalen Fähigkeiten wie Tonhöhenunterscheidung bis zu hochexpertisierten Leistungen. Ergebnis einer komplexen Interaktion von Anlage und Umwelt (Gembris, 2018)."},
  {id:"dl",en:"Digital Literacy",de:"Digitale Kompetenz",t:3,def_en:"Ability to access, manage, understand, evaluate, and create information through digital technologies. Involves confident, critical, and responsible use of digital technologies for learning, work, and societal participation. Includes information literacy, digital content creation, and problem-solving (UNESCO, 2018; DigComp 2.2).",def_de:"Fähigkeit, Informationen über digitale Technologien zu finden, zu verwalten, zu verstehen, zu bewerten und zu erstellen. Umfasst selbstbewussten, kritischen und verantwortungsvollen Umgang mit digitalen Technologien zum Lernen, Arbeiten und zur gesellschaftlichen Teilhabe (UNESCO, 2018; DigComp 2.2)."},
  {id:"em",en:"Empathy",de:"Empathie",t:3,def_en:"Ability to perceive, understand, and share the emotional states of others — to take their perspective and respond with appropriate emotional reactions. A core component of Communion Skill: warm, compassionate behavior when the situation requires it (Davis, 1983; Breil et al., 2022).",def_de:"Fähigkeit, die emotionalen Zustände anderer wahrzunehmen, zu verstehen und nachzuempfinden — ihre Perspektive einzunehmen und mit angemessenen Reaktionen zu antworten. Kernkomponente der Communion Skill: warmherziges Verhalten, wenn die Situation es erfordert (Davis, 1983; Breil et al., 2022)."},
  {id:"pr",en:"Presentation Skills",de:"Präsentationsfähigkeiten",t:3,def_en:"Ability to present content in a structured, comprehensible, and persuasive manner to an audience. Encompasses planning and organization of content, clear verbal communication, effective use of visual aids, confident body language, responding to questions, and managing stage fright.",def_de:"Fähigkeit, Inhalte strukturiert, verständlich und überzeugend vor einem Publikum darzustellen. Umfasst Planung und Gliederung von Inhalten, klare verbale Kommunikation, effektiven Einsatz visueller Hilfsmittel, selbstsicheres Auftreten, das Eingehen auf Fragen und den Umgang mit Lampenfieber."},
  {id:"pg",en:"Programming",de:"Programmierkenntnisse",t:3,def_en:"Ability to design algorithms and implement them in programming languages to solve problems systematically. Encompasses understanding fundamental concepts (variables, control structures, data structures), translating logical processes into executable code, debugging, and testing. Increasingly relevant across disciplines for data analysis, simulation, and automation.",def_de:"Fähigkeit, Algorithmen zu entwerfen und in Programmiersprachen umzusetzen, um Probleme systematisch zu lösen. Umfasst grundlegende Konzepte (Variablen, Kontrollstrukturen, Datenstrukturen), Übersetzen logischer Prozesse in ausführbaren Code, Debugging und Testen. Zunehmend relevant in vielen Disziplinen für Datenanalyse, Simulation und Automatisierung."},
];

// ── RIASEC Radar (SVG, monochrome RWTH blue like the screenshot) ──
function RIASECRadar({p, lang, exp, setExp}) {
  // Coxcomb / Polar-Area chart: 6 non-overlapping pie-slice sectors
  // Clockwise from top: I, R, C, E, S, A
  // Right labels (top→bottom): Forschend, Realistisch, Konventionell
  // Left labels (top→bottom): Künstlerisch, Sozial, Unternehmerisch
  const dims = ["I","R","C","E","S","A"];
  const labels = {R:{en:"Realistic",de:"Realistisch"},I:{en:"Investigative",de:"Forschend"},A:{en:"Artistic",de:"Künstlerisch"},S:{en:"Social",de:"Sozial"},E:{en:"Enterprising",de:"Unternehmerisch"},C:{en:"Conventional",de:"Konventionell"}};
  const descs = {
    R:{en:"Interest in working with things, tools, machines, or in the outdoors. Preference for concrete, practical activities involving the manipulation of objects and physical materials (Holland, 1997).",de:"Interesse an der Arbeit mit Dingen, Werkzeugen, Maschinen oder im Freien. Vorliebe für konkrete, praktische Tätigkeiten mit Gegenständen und physischen Materialien (Holland, 1997)."},
    I:{en:"Interest in science, mathematics, and systematic inquiry. Preference for observing, researching, analyzing, and solving problems through systematic investigation (Holland, 1997).",de:"Interesse an Wissenschaft, Mathematik und systematischer Untersuchung. Vorliebe für Beobachten, Forschen, Analysieren und Problemlösen durch systematisches Vorgehen (Holland, 1997)."},
    A:{en:"Preference for creative expression including writing, visual and performing arts. Valuing aesthetic qualities, self-expression, and unconventional approaches to problems (Holland, 1997).",de:"Vorliebe für kreativen Ausdruck einschließlich Schreiben, bildender und darstellender Kunst. Wertschätzung ästhetischer Qualitäten, Selbstausdruck und unkonventioneller Herangehensweisen (Holland, 1997)."},
    S:{en:"Interest in helping people through informing, training, developing, or supporting others. Valuing interpersonal relationships and social welfare (Holland, 1997).",de:"Interesse am Helfen durch Informieren, Ausbilden, Fördern oder Unterstützen anderer. Wertschätzung zwischenmenschlicher Beziehungen und sozialen Wohlergehens (Holland, 1997)."},
    E:{en:"Interest in leadership, persuasion, and managing organizational goals. Preference for competitive, goal-oriented environments and taking responsibility (Holland, 1997).",de:"Interesse an Führung, Überzeugen und Erreichen organisatorischer Ziele. Vorliebe für wettbewerbsorientierte, zielgerichtete Umgebungen und Verantwortungsübernahme (Holland, 1997)."},
    C:{en:"Interest in well-structured environments with orderly, systematic activities. Preference for organizing and processing data and information according to established procedures (Holland, 1997).",de:"Interesse an gut strukturierten Umgebungen mit geordneten, systematischen Tätigkeiten. Vorliebe für Organisation und Verarbeitung von Daten und Informationen nach festgelegten Verfahren (Holland, 1997)."},
  };
  const cx=290,cy=195,maxR=120,maxVal=5;
  const slice=Math.PI*2/6; // 60° per sector

  // Fill color based on value — monochrome blue, darker = higher
  const getFill=(v)=>{
    if(v>=4) return "#1A5FAA";
    if(v>=3.5) return "#407FB7";
    if(v>=3) return "#6B9FCC";
    if(v>=2.5) return "#8EBAE5";
    if(v>=2) return "#B0CDE8";
    if(v>=1.5) return "#CCDEED";
    return "#E0E8F0";
  };

  // Build arc path for one sector (pie wedge from center)
  const wedge=(idx,val)=>{
    const r=maxR*Math.min(val,maxVal)/maxVal;
    const a0=slice*idx - Math.PI/2; // start angle (sector boundary)
    const a1=a0+slice;              // end angle
    const x0=cx+Math.cos(a0)*r, y0=cy+Math.sin(a0)*r;
    const x1=cx+Math.cos(a1)*r, y1=cy+Math.sin(a1)*r;
    return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 0,1 ${x1},${y1} Z`;
  };

  // Spoke angles (sector boundaries)
  const spokes=Array.from({length:6},(_,i)=>slice*i - Math.PI/2);

  return <div style={{background:C.bg,borderRadius:16,padding:"20px 10px 14px",border:`1.5px solid ${C.g3}`}}>
    <svg viewBox="0 0 580 410" style={{width:"100%",maxWidth:580,display:"block",margin:"0 auto"}}>

      {/* Background: concentric circle guides */}
      {[1,2,3,4,5].map(r=><circle key={r} cx={cx} cy={cy} r={maxR*r/maxVal}
        fill="none" stroke={r===maxVal?"#7BADD4":"#D0D8E0"} strokeWidth={r===maxVal?1.5:0.8}
        strokeDasharray={r<maxVal?"4,3":"none"}/>)}

      {/* Spoke lines (sector boundaries) — behind sectors */}
      {spokes.map((a,i)=><line key={i} x1={cx} y1={cy}
        x2={cx+Math.cos(a)*maxR} y2={cy+Math.sin(a)*maxR}
        stroke="#D0D8E0" strokeWidth={0.8}/>)}

      {/* Filled sectors — all drawn, no overlap */}
      {dims.map((d,i)=><path key={d} d={wedge(i,p[d])}
        fill={getFill(p[d])} stroke={C.w} strokeWidth={2}/>)}

      {/* Outer border circle */}
      <circle cx={cx} cy={cy} r={maxR} fill="none" stroke={C.blue} strokeWidth={2.5}/>

      {/* Spoke lines again on top for crisp separators */}
      {spokes.map((a,i)=><line key={"s"+i} x1={cx} y1={cy}
        x2={cx+Math.cos(a)*maxR} y2={cy+Math.sin(a)*maxR}
        stroke={C.w} strokeWidth={1.5}/>)}

      {/* Ring number labels (1 2 3 4 5) along the left-of-top spoke */}
      {[1,2,3,4,5].map(r=><text key={r}
        x={cx - 7} y={cy - maxR*r/maxVal + 14}
        fontSize={11} fill={C.g5} fontWeight={600} textAnchor="end">{r}</text>)}

      {/* RIGHT labels: I (Forschend), R (Realistisch), C (Konventionell) */}
      {["I","R","C"].map((d,i)=>{
        const active=p.code.includes(d);
        const open=exp===("ri_"+d);
        const py=80+i*70;
        const pw=150,ph=32,px=cx+maxR+18;
        return <g key={d} onClick={()=>setExp&&setExp(open?null:"ri_"+d)} style={{cursor:"pointer"}}>
          <rect x={px} y={py} width={pw} height={ph} rx={8}
            fill={active?"rgba(0,84,159,0.14)":"rgba(220,222,224,0.35)"}
            stroke={open?"#00549F":active?"#8EBAE5":"#CFD1D2"} strokeWidth={open?2:1.2}/>
          <text x={px+12} y={py+21}
            fontSize={14} fontWeight={active?700:500} fill={active?"#00549F":"#9C9C9C"}>
            {labels[d][lang]}
          </text>
          <path d={open?"M"+(px+pw-18)+" "+(py+18)+"l4-4 4 4":"M"+(px+pw-18)+" "+(py+14)+"l4 4 4-4"} stroke={active?"#00549F":"#9C9C9C"} strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>;
      })}

      {/* LEFT labels: A (Künstlerisch), S (Sozial), E (Unternehmerisch) */}
      {["A","S","E"].map((d,i)=>{
        const active=p.code.includes(d);
        const open=exp===("ri_"+d);
        const py=80+i*70;
        const pw=150,ph=32,px=cx-maxR-pw-18;
        return <g key={d} onClick={()=>setExp&&setExp(open?null:"ri_"+d)} style={{cursor:"pointer"}}>
          <rect x={px} y={py} width={pw} height={ph} rx={8}
            fill={active?"rgba(0,84,159,0.14)":"rgba(220,222,224,0.35)"}
            stroke={open?"#00549F":active?"#8EBAE5":"#CFD1D2"} strokeWidth={open?2:1.2}/>
          <text x={px+12} y={py+21}
            fontSize={14} fontWeight={active?700:500} fill={active?"#00549F":"#9C9C9C"}>
            {labels[d][lang]}
          </text>
          <path d={open?"M"+(px+pw-18)+" "+(py+18)+"l4-4 4 4":"M"+(px+pw-18)+" "+(py+14)+"l4 4 4-4"} stroke={active?"#00549F":"#9C9C9C"} strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>;
      })}
    </svg>
    <div style={{textAlign:"center",marginTop:4}}>
      <span style={{fontSize:12,color:C.g5}}>{lang==="en"?"RIASEC Code":"RIASEC-Code"}: </span>
      <span style={{fontSize:22,fontWeight:800,color:C.blue,letterSpacing:4}}>{p.code}</span>
    </div>
    {dims.filter(d=>exp===("ri_"+d)).map(d=><div key={d} style={{marginTop:8,padding:"10px 14px",background:C.g0,borderRadius:10,borderLeft:`3px solid ${p.code.includes(d)?C.blue:"#CFD1D2"}`,fontSize:13.5,lineHeight:1.6,color:C.g7,animation:"fi .2s ease"}}><strong>{labels[d][lang]}:</strong> {descs[d][lang]}</div>)}
  </div>;
}

// ── BIS Matrix (like the OSA screenshot, no values) ──
function BISMatrix({progData, lang}) {
  const ops = BIS_OPS;
  const cons = BIS_CONT;
  const hasOp = (id) => progData.ops.includes(id);
  const hasCon = (id) => progData.con.includes(id);
  const cellActive = (opId, conId) => hasOp(opId) && hasCon(conId);

  return <div style={{borderRadius:14,overflow:"hidden",border:`1.5px solid ${C.g3}`,background:C.w}}>
    {/* Header row */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",borderBottom:`1.5px solid ${C.g3}`}}>
      <div style={{padding:"14px 12px",background:C.w}}/>
      {cons.map(c => <div key={c.id} style={{padding:"14px 10px",background:hasCon(c.id)?C.blue:"#8EBAE5",textAlign:"center",color:C.w,borderLeft:`1px solid rgba(255,255,255,0.3)`}}>
        <div style={{fontSize:18,marginBottom:2}}>{c.icon==="Tt"?"Tt":c.icon==="#"?"##":c.icon}</div>
        <div style={{fontSize:14,fontWeight:700}}>{c[lang]}</div>
        <div style={{fontSize:10.5,opacity:.85,lineHeight:1.3,marginTop:2}}>{lang==="en"?c.desc_en:c.desc_de}</div>
      </div>)}
    </div>
    {/* Operation rows */}
    {ops.map(op => {
      const active = hasOp(op.id);
      return <div key={op.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",borderBottom:`1px solid ${C.g1}`}}>
        <div style={{padding:"14px 14px",background:active?(op.core?"#E0F0E0":"#E8F1F8"):C.g0,borderRight:`1px solid ${C.g3}`,borderLeft:op.core?`3px solid ${C.grn}`:"none"}}>
          <div style={{fontSize:13.5,fontWeight:700,color:active?C.blue:C.g5,marginBottom:3}}>{op[lang]}{op.core&&<span style={{color:C.grn,marginLeft:4}}>✦</span>}</div>
          <div style={{fontSize:11,color:active?C.g7:C.g5,lineHeight:1.4}}>{lang==="en"?op.desc_en:op.desc_de}</div>
        </div>
        {cons.map(c => {
          const on = cellActive(op.id, c.id);
          return <div key={c.id} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:10,background:on?"rgba(0,84,159,0.06)":C.g0,borderLeft:`1px solid ${C.g1}`}}>
            {on ? <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg, ${C.bp}, ${C.blue})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={C.w} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div> : <div style={{width:36,height:36,borderRadius:10,border:`2px dashed ${C.g3}`,background:C.g0}}/>}
          </div>;
        })}
      </div>;
    })}
  </div>;
}

// ── MAIN APP ──
export default function App() {
  const [lang,setLang]=useState("en");
  const [view,setView]=useState("model");
  const [exp,setExp]=useState(null);
  const [sel,setSel]=useState(null);
  const [exCl,setExCl]=useState(null);
  const [q,setQ]=useState("");
  const [showRefs,setShowRefs]=useState(false);
  const [wide,setWide]=useState(window.innerWidth>=580);
  React.useEffect(()=>{const h=()=>setWide(window.innerWidth>=580);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);

  const t=(a,b)=>lang==="en"?a:b;
  const tiers=useMemo(()=>({1:ALL_COMPS.filter(c=>c.t===1),2:ALL_COMPS.filter(c=>c.t===2),3:ALL_COMPS.filter(c=>c.t===3)}),[]);
  const sorted=useMemo(()=>[...PROGS].sort((a,b)=>(lang==="en"?a.en:a.de).localeCompare(lang==="en"?b.en:b.de)),[lang]);
  const filtered=useMemo(()=>{if(!q)return sorted;const s=q.toLowerCase();return sorted.filter(p=>p.en.toLowerCase().includes(s)||p.de.toLowerCase().includes(s));},[sorted,q]);
  const clusters=useMemo(()=>{const g={};PROGS.forEach((p,i)=>{if(!g[p.cl])g[p.cl]=[];g[p.cl].push({...p,idx:i});});return g;},[]);

  const Chev=({open})=><svg width="14" height="14" viewBox="0 0 16 16" style={{transform:open?"rotate(180deg)":"",transition:"transform .2s",flexShrink:0}}><path d="M4 6l4 4 4-4" stroke={C.g5} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>;
  const TBadge=({tier})=><span style={{background:TC[tier],color:C.w,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:10,letterSpacing:.5,textTransform:"uppercase"}}>Tier {tier}</span>;
  const BISBadge=()=><span style={{background:"#0098A1",color:C.w,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6,letterSpacing:.5,verticalAlign:"super",marginLeft:3}}>BIS</span>;
  const B5Badge=()=><span style={{background:"#CC6677",color:C.w,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6,letterSpacing:.5,verticalAlign:"super",marginLeft:3}}>Big Five</span>;

  const CompCard=({c})=>{const open=exp===c.id;return <div onClick={()=>setExp(open?null:c.id)} style={{background:C.w,borderRadius:12,padding:"12px 16px",cursor:"pointer",border:`1.5px solid ${open?TC[c.t]:C.g3}`,boxShadow:open?"0 4px 20px rgba(0,84,159,.08)":"0 1px 3px rgba(0,0,0,.02)",transition:"all .2s"}}>
    <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}><TBadge tier={c.t}/><span style={{fontWeight:700,fontSize:14,color:C.g9,flex:1,minWidth:100}}>{c[lang]}{c.bis&&<BISBadge/>}{c.b5&&<B5Badge/>}{c.sub_en&&<div style={{fontWeight:400,fontSize:11.5,color:C.g5,fontStyle:"italic"}}>{lang==="en"?c.sub_en:c.sub_de}</div>}</span><Chev open={open}/></div>
    {open&&<div style={{marginTop:10,padding:"10px 14px",background:C.g0,borderRadius:8,borderLeft:`3px solid ${TC[c.t]}`,fontSize:13,lineHeight:1.6,color:C.g7}}>{c["def_"+lang]}</div>}
  </div>;};

  return <div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.bg} 0%,#F8FAFB 280px,${C.g0} 100%)`,fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif"}}>
    <style>{`@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}} input:focus{outline:none;border-color:${C.blue}!important;box-shadow:0 0 0 3px rgba(0,84,159,.12)!important} *{box-sizing:border-box}`}</style>

    {/* HEADER */}
    <div style={{background:`linear-gradient(135deg,${C.bd},${C.blue})`,padding:"28px 24px 20px",color:C.w}}>
      <div style={{maxWidth:960,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
          <div style={{display:"flex",gap:2,background:"rgba(255,255,255,.15)",borderRadius:8,padding:2}}>
            {["en","de"].map(l=><button key={l} onClick={()=>setLang(l)} style={{padding:"5px 14px",fontSize:12,fontWeight:lang===l?700:500,color:lang===l?C.blue:C.w,background:lang===l?C.w:"transparent",border:"none",borderRadius:6,cursor:"pointer",transition:"all .2s"}}>{l==="en"?"EN":"DE"}</button>)}
          </div>
        </div>
        <h1 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,lineHeight:1.35,opacity:.9}}>{t("Towards a comprehensive model of university undergraduate students' competencies: A mixed-methods analysis of core skills for academic success","Auf dem Weg zu einem umfassenden Kompetenzmodell für Bachelor-Studierende: Eine Mixed-Methods-Analyse zentraler Fähigkeiten für den Studienerfolg")}</h1>
        <div style={{fontSize:11,opacity:.55,marginBottom:12}}>{t("Paper in preparation","Paper in Vorbereitung")} · Mathis Rabe, Larissa Franziska Buitkamp, Malte Persike</div>
        <h2 style={{margin:"0 0 6px",fontSize:24,fontWeight:800,lineHeight:1.2}}>{t("Interactive Undergraduate Competency Model","Interaktives Kompetenzmodell für Bachelorstudierende")}</h2>
        <p style={{margin:0,fontSize:13,opacity:.65,lineHeight:1.5}}>{t("Explore competency requirements across 34 Bachelor programs based on a mixed-methods analysis with N = 1,512 participants (students and academic staff). Browse the three-tier competency model, compare program-specific profiles, and discover how programs cluster by their competency and interest patterns.","Entdecken Sie Kompetenzanforderungen über 34 Bachelorstudiengänge basierend auf einer Mixed-Methods-Analyse mit N = 1.512 Teilnehmenden (Studierende und wissenschaftliches Personal). Durchsuchen Sie das dreistufige Kompetenzmodell, vergleichen Sie studiengangsspezifische Profile und entdecken Sie, wie Studiengänge nach ihren Kompetenz- und Interessenmustern clustern.")}</p>
      </div>
    </div>

    {/* TABS */}
    <div style={{maxWidth:960,margin:"0 auto",padding:"12px 24px 0",display:"flex",gap:6,flexWrap:"wrap"}}>
      {[{id:"model",en:"Competency Model",de:"Kompetenzmodell"},{id:"profiles",en:"Program Profiles",de:"Studiengangprofile"},{id:"clusters",en:"Program Clusters",de:"Studiengang-Cluster"}].map(tab=>
        <button key={tab.id} onClick={()=>{setView(tab.id);setExp(null);}} style={{padding:"8px 18px",fontSize:13,fontWeight:view===tab.id?700:500,color:view===tab.id?C.w:C.blue,background:view===tab.id?C.blue:"transparent",border:`1.5px solid ${view===tab.id?C.blue:C.bl}`,borderRadius:10,cursor:"pointer",transition:"all .2s"}}>{t(tab.en,tab.de)}</button>
      )}
    </div>

    <div style={{maxWidth:960,margin:"0 auto",padding:"16px 24px 60px"}}>

      {/* ── MODEL ── */}
      {view==="model"&&<div style={{animation:"fi .3s ease"}}>{[1,2,3].map(tier=><div key={tier} style={{marginBottom:26}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:4,height:24,borderRadius:2,background:TC[tier]}}/><div>
          <h2 style={{margin:0,fontSize:16,fontWeight:800,color:C.g9}}>Tier {tier}: {t(tier===1?"Core Competencies":tier===2?"Specialized Competencies":"Program-Specific Competencies",tier===1?"Kernkompetenzen":tier===2?"Spezialisierte Kompetenzen":"Studiengangsspezifische Kompetenzen")}</h2>
          <p style={{margin:"1px 0 0",fontSize:12,color:C.g5}}>{t(tier===1?"Universally important across all programs (M ≥ 4.0, low cluster variation)":tier===2?"Important for multiple programs (M ≥ 3.0, validated in >3 programs)":"Important for specific programs but not meeting Tier 2 criteria",tier===1?"Universell wichtig in allen Studiengängen (M ≥ 4.0, geringe Clustervariation)":tier===2?"Wichtig für mehrere Studiengänge (M ≥ 3.0, in >3 Studiengängen validiert)":"Wichtig für einzelne Studiengänge, ohne die Tier-2-Kriterien zu erfüllen")} ({tiers[tier].length})</p>
        </div></div>
        <div style={{display:"grid",gap:6,gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",alignItems:"start"}}>{tiers[tier].map(c=><CompCard key={c.id} c={c}/>)}</div>
      </div>)}

      {/* Interest Dimensions */}
      <div style={{marginBottom:26}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:4,height:24,borderRadius:2,background:"#8EBAE5"}}/><div>
          <h2 style={{margin:0,fontSize:16,fontWeight:800,color:C.g9}}>{t("Interest Profile (RIASEC)","Interessenprofil (RIASEC)")}</h2>
          <p style={{margin:"1px 0 0",fontSize:12,color:C.g5}}>{t("Vocational interests assessed separately from competencies, based on Holland's model","Berufliche Interessen nach Hollands Modell, separat von Kompetenzen erfasst")} (6)</p>
        </div></div>
        <div style={{display:"grid",gap:6,gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",alignItems:"start"}}>
          {[
            {code:"R",en:"Realistic",de:"Realistisch",def_en:"Interest in working with things, tools, machines, or in the outdoors. Preference for concrete, practical activities involving the manipulation of objects and physical materials (Holland, 1997).",def_de:"Interesse an der Arbeit mit Dingen, Werkzeugen, Maschinen oder im Freien. Vorliebe für konkrete, praktische Tätigkeiten mit Gegenständen und physischen Materialien (Holland, 1997)."},
            {code:"I",en:"Investigative",de:"Forschend",def_en:"Interest in science, mathematics, and systematic inquiry. Preference for observing, researching, analyzing, and solving problems through systematic investigation (Holland, 1997).",def_de:"Interesse an Wissenschaft, Mathematik und systematischer Untersuchung. Vorliebe für Beobachten, Forschen, Analysieren und Problemlösen durch systematisches Vorgehen (Holland, 1997)."},
            {code:"A",en:"Artistic",de:"Künstlerisch",def_en:"Preference for creative expression including writing, visual and performing arts. Valuing aesthetic qualities, self-expression, and unconventional approaches to problems (Holland, 1997).",def_de:"Vorliebe für kreativen Ausdruck einschließlich Schreiben, bildender und darstellender Kunst. Wertschätzung ästhetischer Qualitäten, Selbstausdruck und unkonventioneller Herangehensweisen (Holland, 1997)."},
            {code:"S",en:"Social",de:"Sozial",def_en:"Interest in helping people through informing, training, developing, or supporting others. Valuing interpersonal relationships and social welfare (Holland, 1997).",def_de:"Interesse am Helfen durch Informieren, Ausbilden, Fördern oder Unterstützen anderer. Wertschätzung zwischenmenschlicher Beziehungen und sozialen Wohlergehens (Holland, 1997)."},
            {code:"E",en:"Enterprising",de:"Unternehmerisch",def_en:"Interest in leadership, persuasion, and managing organizational goals. Preference for competitive, goal-oriented environments and taking responsibility (Holland, 1997).",def_de:"Interesse an Führung, Überzeugen und Erreichen organisatorischer Ziele. Vorliebe für wettbewerbsorientierte, zielgerichtete Umgebungen und Verantwortungsübernahme (Holland, 1997)."},
            {code:"C",en:"Conventional",de:"Konventionell",def_en:"Interest in well-structured environments with orderly, systematic activities. Preference for organizing and processing data and information according to established procedures (Holland, 1997).",def_de:"Interesse an gut strukturierten Umgebungen mit geordneten, systematischen Tätigkeiten. Vorliebe für Organisation und Verarbeitung von Daten und Informationen nach festgelegten Verfahren (Holland, 1997)."},
          ].map(r=>{
            const open=exp===("riasec_"+r.code);
            return <div key={r.code} onClick={()=>setExp(open?null:"riasec_"+r.code)} style={{background:C.w,borderRadius:12,padding:"12px 16px",cursor:"pointer",border:`1.5px solid ${open?"#8EBAE5":C.g3}`,boxShadow:open?"0 4px 20px rgba(0,84,159,.08)":"0 1px 3px rgba(0,0,0,.02)",transition:"all .2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <span style={{background:"#8EBAE5",color:C.w,fontSize:12,fontWeight:800,width:26,height:26,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>{r.code}</span>
                <span style={{fontWeight:700,fontSize:14,color:C.g9,flex:1}}>{r[lang]}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" style={{transform:open?"rotate(180deg)":"",transition:"transform .2s"}}><path d="M4 6l4 4 4-4" stroke={C.g5} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
              </div>
              {open&&<div style={{marginTop:10,padding:"10px 14px",background:C.g0,borderRadius:8,borderLeft:"3px solid #8EBAE5",fontSize:13,lineHeight:1.6,color:C.g7}}>{lang==="en"?r.def_en:r.def_de}</div>}
            </div>;
          })}
        </div>
      </div>
      </div>}

      {/* ── PROFILES ── */}
      {view==="profiles"&&<div style={{animation:"fi .3s ease"}}>
        <div style={{marginBottom:16}}>
          <input type="text" placeholder={t("Search programs...","Studiengänge suchen...")} value={q} onChange={e=>setQ(e.target.value)} style={{width:"100%",padding:"11px 14px",fontSize:14,border:`1.5px solid ${C.g3}`,borderRadius:10,background:C.w,marginBottom:6}}/>
          <div style={{maxHeight:200,overflowY:"auto",border:`1px solid ${C.g3}`,borderRadius:10,background:C.w}}>
            {filtered.map(p=>{const idx=PROGS.findIndex(pp=>pp.en===p.en);return <div key={idx} onClick={()=>{setSel(idx);setQ("");setExp(null);}} style={{padding:"9px 14px",cursor:"pointer",borderBottom:`1px solid ${C.g1}`,background:sel===idx?C.bg:C.w,display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:8,height:8,borderRadius:4,background:CC[p.cl],flexShrink:0}}/>
              <div><div style={{fontSize:13,fontWeight:sel===idx?700:500,color:C.g9}}>{p[lang]}, {p.deg}</div><div style={{fontSize:10,color:C.g5}}>Cluster {p.cl}: {CN[p.cl][lang]}</div></div>
            </div>;})}
          </div>
        </div>

        {sel!==null&&(()=>{const p=PROGS[sel];const pd=PP[sel];const xcItems=EXTRA_COG.filter(c=>pd.xc.includes(c.id));const ncProgram=NONCOG.filter(c=>pd.nc.includes(c.id));
          const b5ids=["co","es","op","ag","ex"];
          const coreNC=NONCOG.filter(c=>c.tier===1&&!b5ids.includes(c.id));
          const allNC=[...coreNC,...ncProgram.filter(c=>c.tier!==1&&!b5ids.includes(c.id))];
          const uniqueNC=[...new Map(allNC.map(c=>[c.id,c])).values()];
          return <div style={{animation:"fi .3s ease"}}>
            {/* Header */}
            <div style={{background:`linear-gradient(135deg,${C.bd},${C.blue})`,borderRadius:14,padding:"20px 22px",color:C.w,marginBottom:20}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",opacity:.5}}>{t("Program Profile","Studiengangsprofil")}</div>
              <h2 style={{margin:"2px 0 0",fontSize:20,fontWeight:800}}>{p[lang]}, {p.deg}</h2>
              <div style={{display:"flex",gap:6,marginTop:8,alignItems:"center"}}><div style={{width:10,height:10,borderRadius:5,background:CC[p.cl]}}/><span style={{fontSize:12,opacity:.75}}>Cluster {p.cl}: {CN[p.cl][lang]}</span></div>
            </div>

            {/* BIS Matrix */}
            <h3 style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:C.g9,display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:20,height:20,borderRadius:6,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke={C.w} strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke={C.w} strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke={C.w} strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke={C.w} strokeWidth="2"/></svg></div>
              {t("Cognitive Abilities (BIS Model)","Kognitive Fähigkeiten (BIS-Modell)")}
            </h3>
            <p style={{margin:"0 0 10px",fontSize:12,color:C.g5,paddingLeft:28}}>{t("Berlin Intelligence Structure Model: cognitive abilities as combinations of operations (rows) and content domains (columns). Checkmarks indicate which combinations are relevant for this program.","Berliner Intelligenzstrukturmodell: Kognitive Fähigkeiten als Kombination von Operationen (Zeilen) und Inhaltsbereichen (Spalten). Häkchen zeigen, welche Kombinationen für diesen Studiengang relevant sind.")}</p>
            <BISMatrix progData={pd} lang={lang}/>
            <div style={{fontSize:11,color:C.g5,marginTop:6}}>✦ = {t("Core competency (all programs)","Kernkompetenz (alle Studiengänge)")}</div>

            {/* Big Five Personality */}
            <h3 style={{margin:"24px 0 4px",fontSize:15,fontWeight:700,color:C.g9,display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:20,height:20,borderRadius:6,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={C.w} strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke={C.w} strokeWidth="2" strokeLinecap="round"/></svg></div>
              {t("Personality (Big Five)","Persönlichkeit (Big Five)")}
            </h3>
            <p style={{margin:"0 0 10px",fontSize:12,color:C.g5,paddingLeft:28}}>{t("The five broad personality dimensions most consistently associated with academic outcomes (OCEAN model). Colored traits are relevant for this program. Tap a trait for its description.","Die fünf zentralen Persönlichkeitsdimensionen mit den stärksten Zusammenhängen zu akademischem Erfolg (OCEAN-Modell). Farbige Merkmale sind für diesen Studiengang relevant. Tippe auf ein Merkmal für die Beschreibung.")}</p>
            {(()=>{
              const b5=[
                {id:"op",en:"Openness",de:"Offenheit",desc_en:"Intellectual curiosity and openness to new experiences and perspectives.",desc_de:"Intellektuelle Neugier und Offenheit für neue Erfahrungen und Perspektiven."},
                {id:"co",en:"Conscientiousness",de:"Gewissenhaftigkeit",core:true,desc_en:"Thoroughness, reliability, and organized academic behavior.",desc_de:"Gründlichkeit, Zuverlässigkeit und organisiertes Verhalten."},
                {id:"ex",en:"Extraversion",de:"Extraversion",desc_en:"Assertiveness, sociability, and positive engagement in social interactions.",desc_de:"Durchsetzungsfähigkeit, Geselligkeit und positives Engagement in sozialen Interaktionen."},
                {id:"ag",en:"Agreeableness",de:"Verträglichkeit",desc_en:"Cooperation and consideration for others in group settings.",desc_de:"Kooperation und Rücksichtnahme in Gruppensituationen."},
                {id:"es",en:"Emotional Stability",de:"Emotionale Stabilität",desc_en:"Remaining calm under pressure, coping with stress and uncertainty.",desc_de:"Unter Druck ruhig bleiben und mit Stress und Unsicherheit umgehen."},
              ];
              return <div>
                <div style={{borderRadius:14,overflow:"hidden",border:`1.5px solid ${C.g3}`,background:C.w}}>
                  <div style={{display:"grid",gridTemplateColumns:wide?"repeat(5, 1fr)":"1fr"}}>
                    {b5.map(d=>{
                      const active=d.core||pd.nc.includes(d.id);
                      const open=exp===("b5_"+d.id);
                      return <div key={d.id} onClick={()=>setExp(open?null:"b5_"+d.id)} style={{
                        padding:wide?"16px 8px":"12px 16px",textAlign:wide?"center":"left",cursor:"pointer",
                        background:active?(d.core?"rgba(87,171,39,0.15)":"rgba(0,84,159,0.10)"):"#F5F6F7",
                        borderLeft:wide?`1px solid ${C.g3}`:"none",
                        borderTop:wide?"none":`1px solid ${C.g3}`,
                        transition:"all .2s"}}>
                        <div style={{fontSize:13,fontWeight:700,color:active?(d.core?C.grn:C.blue):C.g5,lineHeight:1.3,display:wide?"block":"inline"}}>{d[lang]}</div>
                        {d.core&&<div style={{fontSize:9,color:C.grn,fontWeight:700,marginTop:wide?4:0,marginLeft:wide?0:8,letterSpacing:0.5,display:wide?"block":"inline"}}>✦ CORE</div>}
                        {!active&&<div style={{fontSize:10,color:"#B0B0B0",marginTop:wide?4:0,marginLeft:wide?0:8,display:wide?"block":"inline"}}>{t("not required","nicht erford.")}</div>}
                        <div style={{display:"flex",justifyContent:wide?"center":"flex-start",marginTop:4}}><Chev open={open}/></div>
                      </div>;
                    })}
                  </div>
                </div>
                {b5.filter(d=>exp===("b5_"+d.id)).map(d=>{
                  const active=d.core||pd.nc.includes(d.id);
                  return <div key={d.id} style={{marginTop:8,padding:"10px 14px",background:C.g0,borderRadius:10,borderLeft:`3px solid ${d.core?C.grn:C.blue}`,fontSize:13.5,lineHeight:1.6,color:C.g7,animation:"fi .2s ease"}}>{lang==="en"?d.desc_en:d.desc_de}</div>;
                })}
              </div>;
            })()}
            <div style={{fontSize:11,color:C.g5,marginTop:6}}>✦ = {t("Core competency (all programs)","Kernkompetenz (alle Studiengänge)")}</div>

            {/* Competencies — equal-weight section */}
            <h3 style={{margin:"24px 0 4px",fontSize:15,fontWeight:700,color:C.g9,display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:20,height:20,borderRadius:6,background:C.grn,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke={C.w} strokeWidth="2" fill="none"/></svg></div>
              {t("Competencies","Kompetenzen")}
            </h3>
            <p style={{margin:"0 0 10px",fontSize:12,color:C.g5,paddingLeft:28}}>{t("Self-regulatory, academic, and social competencies identified through surveys and expert workshops. Tap for descriptions.","Selbstregulatorische, akademische und soziale Kompetenzen aus Befragungen und Expertenworkshops. Tippe für Beschreibungen.")}</p>
            <div style={{display:"grid",gap:8,gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",alignItems:"start"}}>
              {[...uniqueNC.filter(c=>c.tier===1),...xcItems,...uniqueNC.filter(c=>c.tier!==1)].map(c=>{
                const isCore = c.tier===1;
                const open = exp===c.id;
                return <div key={c.id} onClick={()=>setExp(open?null:c.id)} style={{padding:"12px 16px",borderRadius:12,fontSize:14,fontWeight:isCore?700:500,cursor:"pointer",background:open?(isCore?C.grn:C.blue):isCore?"#EBF5E0":C.w,color:open?C.w:C.g9,border:`1.5px solid ${open?(isCore?C.grn:C.blue):isCore?"#B5D99C":C.g3}`,transition:"all .2s",boxShadow:open?"0 4px 16px rgba(0,84,159,.1)":"0 1px 3px rgba(0,0,0,.04)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{flex:1}}>{c[lang]}{isCore?" ✦":""}</span><Chev open={open}/></div>
                  {open&&<div style={{marginTop:8,paddingTop:8,borderTop:`1px solid ${isCore?"rgba(255,255,255,.3)":"rgba(255,255,255,.3)"}`,fontSize:12.5,lineHeight:1.6,opacity:.9}}>{lang==="en"?c.def_en:c.def_de}</div>}
                </div>;
              })}
            </div>
            <div style={{fontSize:11,color:C.g5,marginTop:8}}>✦ = {t("Core competency (all programs)","Kernkompetenz (alle Studiengänge)")}</div>

            {/* RIASEC — at the bottom */}
            <h3 style={{margin:"28px 0 4px",fontSize:15,fontWeight:700,color:C.g9,display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:20,height:20,borderRadius:6,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,8.5 22,19.5 12,22 2,19.5 2,8.5" stroke={C.w} strokeWidth="2" fill="none"/></svg></div>
              {t("Interest Profile (RIASEC)","Interessenprofil (RIASEC)")}
            </h3>
            <p style={{margin:"0 0 10px",fontSize:12,color:C.g5,paddingLeft:28}}>{t("Vocational interests based on Holland's RIASEC model, assessed separately from competencies. The chart shows the relative strength of each interest dimension. The three strongest dimensions form the 3-letter RIASEC code (colored labels). Tap labels for descriptions.","Berufliche Interessen nach Hollands RIASEC-Modell, separat von Kompetenzen erfasst. Das Diagramm zeigt die relative Ausprägung jeder Interessendimension. Die drei stärksten bilden den 3-Buchstaben-Code (farbige Labels). Tippe auf Labels für Beschreibungen.")}</p>
            <RIASECRadar p={p} lang={lang} exp={exp} setExp={setExp}/>
          </div>;
        })()}

        {sel===null&&<div style={{textAlign:"center",padding:"40px 20px",color:C.g5}}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.g3} strokeWidth="1.5" style={{marginBottom:8}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <p style={{fontSize:13,margin:0}}>{t("Select a program to explore its profile.","Wähle einen Studiengang, um das Profil zu erkunden.")}</p>
        </div>}
      </div>}

      {/* ── CLUSTERS ── */}
      {view==="clusters"&&<div style={{animation:"fi .3s ease"}}>
        <p style={{fontSize:13,color:C.g7,lineHeight:1.6,marginBottom:16,maxWidth:660}}>{t("34 programs grouped into 10 clusters by hierarchical cluster analysis (Ward's method) on combined competency and interest profiles.","34 Studiengänge gruppiert in 10 Cluster durch hierarchische Clusteranalyse (Ward-Methode) auf Basis kombinierter Kompetenz- und Interessenprofile.")}</p>
        <div style={{display:"grid",gap:10,gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",alignItems:"start"}}>
          {Object.entries(clusters).sort((a,b)=>+a[0]-+b[0]).map(([cid,progs])=>{const cn=+cid;const isE=exCl===cn;
            return <div key={cn} onClick={()=>setExCl(isE?null:cn)} style={{background:C.w,borderRadius:12,padding:"12px 16px",cursor:"pointer",border:`2px solid ${isE?CC[cn]:C.g3}`,boxShadow:isE?`0 3px 16px ${CC[cn]}20`:"none",transition:"all .2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:32,height:32,borderRadius:8,background:CC[cn],display:"flex",alignItems:"center",justifyContent:"center",color:C.w,fontWeight:800,fontSize:14,flexShrink:0}}>{cn}</div>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:C.g9}}>{CN[cn][lang]}</div><div style={{fontSize:10.5,color:C.g5}}>{progs.length} {t("programs","Studiengänge")}</div></div>
                <Chev open={isE}/>
              </div>
              {isE&&<div style={{marginTop:10,borderTop:`1px solid ${C.g1}`,paddingTop:8,animation:"fi .2s ease"}}>
                {progs.map(p=><div key={p.idx} onClick={e=>{e.stopPropagation();setSel(p.idx);setView("profiles");setExp(null);}} style={{padding:"6px 0",borderBottom:`1px solid ${C.g1}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:12,fontWeight:600,color:C.g9}}>{p[lang]}, {p.deg}</span>
                  <span style={{fontSize:10.5,color:C.blue,fontWeight:600}}>{t("View →","Ansehen →")}</span>
                </div>)}
              </div>}
            </div>;
          })}
        </div>
      </div>}
    </div>

    {/* References */}
    <div style={{maxWidth:960,margin:"0 auto",padding:"0 24px 24px"}}>
      <div onClick={()=>setShowRefs(!showRefs)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"10px 0",borderTop:`1px solid ${C.g3}`}}>
        <span style={{fontSize:13,fontWeight:700,color:C.g7}}>{t("References","Literatur")}</span>
        <Chev open={showRefs}/>
      </div>
      {showRefs&&<div style={{fontSize:11,color:C.g7,lineHeight:2,animation:"fi .2s ease"}}>
        {[
          "American Psychological Association (2022). Resilience. https://www.apa.org/topics/resilience",
          "Bandura, A. (1997). Self-efficacy: The exercise of control. Freeman.",
          "Beierlein, C., Kovaleva, A., Kemper, C. J., & Rammstedt, B. (2014). Allgemeine Selbstwirksamkeit Kurzskala (ASKU). ZIS. https://doi.org/10.6102/zis35",
          "Bennett, G. K. (1994). Bennett Mechanical Comprehension Test (BMCT-II). The Psychological Corporation.",
          "Boix Mansilla, V., Miller, W. C., & Gardner, H. (2000). On disciplinary lenses and interdisciplinary work. In S. Wineburg & P. Grossman (Eds.), Interdisciplinary curriculum: Challenges to implementation (pp. 17\u201338). Teachers College Press.",
          "Breil, S. M., Forthmann, B., & Back, M. D. (2022). Measuring distinct social skills via multiple speed assessments. European Journal of Psychological Assessment, 38(3), 224\u2013236.",
          "Breil, S. M., Mielke, I., Ahrens, H., Geldmacher, T., Sensmeier, J., Marschall, B., & Back, M. D. (2022). Predicting actual social skill expression from personality and skill self-concepts. Journal of Intelligence, 10(3), Article 48.",
          "Cacioppo, J. T., & Petty, R. E. (1982). The need for cognition. Journal of Personality and Social Psychology, 42(1), 116\u2013131.",
          "Cook, D. A., & Artino, A. R. (2016). Motivation to learn: An overview of contemporary theories. Medical Education, 50(10), 997\u20131014.",
          "Council of Europe (2020). Common European Framework of Reference for Languages: Learning, teaching, assessment \u2013 Companion volume. Council of Europe Publishing. https://www.coe.int/en/web/common-european-framework-reference-languages",
          "Dahl, C., & Dlugosch, G. E. (2020). Selbstf\u00fcrsorge als Thema in Gesundheitsf\u00f6rderung und Pr\u00e4vention. In C. Dahl & G. E. Dlugosch, Besser leben! Pr\u00e4vention und Gesundheitsf\u00f6rderung, 15(1), 27\u201335. https://doi.org/10.1007/s11553-019-00735-2",
          "Davis, M. H. (1983). Measuring individual differences in empathy: Evidence for a multidimensional approach. Journal of Personality and Social Psychology, 44(1), 113\u2013126.",
          "Doll, E. S., Nie\u00dfen, D., Schmidt, I., Rammstedt, B., & Lechner, C. M. (2021). General self-efficacy short scale-3 (GSE-3). ZIS. https://doi.org/10.6102/zis294",
          "Eccles, J. S., & Wigfield, A. (2002). Motivational beliefs, values, and goals. Annual Review of Psychology, 53, 109\u2013132.",
          "Garmezy, N. (1974). The study of competence in children at risk for severe psychopathology. In E. J. Anthony & C. Koupernik (Eds.), The child in his family: Vol. 3. Children at psychiatric risk (pp. 77\u201397). Wiley.",
          "Gembris, H. (2018). Musikalische Entwicklung: das Erwachsenenalter. In A. C. Lehmann & R. Kopiez (Hrsg.), Handbuch Musikpsychologie (S. 236). Hogrefe.",
          "Holland, J. L. (1997). Making vocational choices: A theory of vocational personalities and work environments (3rd ed.). Psychological Assessment Resources.",
          "Honicke, T., & Broadbent, J. (2016). The influence of academic self-efficacy on academic performance. Educational Research Review, 17, 63\u201384.",
          "J\u00e4ger, A. O., S\u00fc\u00df, H.-M., & Beauducel, A. (1997). Berliner Intelligenzstruktur-Test (BIS-Test, Form 4). Hogrefe.",
          "Mammadov, S. (2022). Big Five personality traits and academic performance. Journal of Personality, 90, 222\u2013255.",
          "McCrae, R. R., & John, O. P. (1992). An introduction to the five-factor model. Journal of Personality, 60(2), 175\u2013215.",
          "Muchinsky, P. M. (2006). Psychology applied to work (8th ed.). Thomson Wadsworth.",
          "Nye, C. D., Su, R., Rounds, J., & Drasgow, F. (2012). Vocational interests and performance. Perspectives on Psychological Science, 7(4), 384\u2013403.",
          "Pintrich, P. R., Smith, D. A. F., Garcia, T., & McKeachie, W. J. (1991). A manual for the use of the motivated strategies for learning questionnaire (MSLQ). University of Michigan.",
          "Richardson, M., Abraham, C., & Bond, R. (2012). Psychological correlates of university students\u2019 academic performance. Psychological Bulletin, 138, 353\u2013387.",
          "Salas, E., Dickinson, T. L., Converse, S. A., & Tannenbaum, S. I. (1992). Toward an understanding of team performance and training. In R. W. Swezey & E. Salas (Eds.), Teams: Their training and performance. Ablex.",
          "Salas, E., Reyes, D. L., & McDaniel, S. H. (2018). The science of teamwork: Progress, reflections, and the road ahead. American Psychologist, 73(4), 593\u2013600.",
          "Sch\u00f6n, D. A. (1983). The reflective practitioner: How professionals think in action. Basic Books.",
          "Spelt, E. J. H., Biemans, H. J. A., Tobi, H., Luning, P. A., & Mulder, M. (2009). Teaching and learning in interdisciplinary higher education: A systematic review. Educational Psychology Review, 21(4), 365\u2013378. https://doi.org/10.1007/s10648-009-9113-z",
          "Steel, P. (2007). The nature of procrastination: A meta-analytic and theoretical review. Psychological Bulletin, 133(1), 65\u201394.",
          "S\u00fc\u00df, H.-M., & Beauducel, A. (2015). Modeling the construct validity of the Berlin Intelligence Structure Model. Estudos de Psicologia (Campinas), 32(1), 13\u201325.",
          "Talsma, K., Sch\u00fcz, B., Schwarzer, R., & Norris, K. (2018). I believe, therefore I achieve. Learning and Individual Differences, 61, 136\u2013150.",
          "UNESCO Institute for Statistics (2018). A global framework of reference on digital literacy skills for Indicator 4.4.2 (Information Paper No. 51). UNESCO.",
          "Von der Embse, N., Jester, D., Roy, D., & Post, J. (2018). Test anxiety effects, predictors, and correlates: A 30-year meta-analytic review. Journal of Affective Disorders, 227, 483\u2013493.",
          "Vuorikari, R., Kluzer, S., & Punie, Y. (2022). DigComp 2.2: The Digital Competence Framework for Citizens. Publications Office of the European Union.",
          "Weinert, F. E. (2001). Vergleichende Leistungsmessung in Schulen \u2013 eine umstrittene Selbstverst\u00e4ndlichkeit. In F. E. Weinert (Hrsg.), Leistungsmessungen in Schulen (S. 17\u201331). Beltz. [Definition Kompetenz: S. 27f.]",
          "Wolf, A., & Loepthien, T. (2013/aktualisiert). Musikalit\u00e4t. In M. A. Wirtz (Hrsg.), Dorsch \u2013 Lexikon der Psychologie. Hogrefe.",
          "Zeidner, M. (1998). Test anxiety: The state of the art. Plenum Press. https://doi.org/10.1007/b109548",
        ].map((r,i)=><div key={i} style={{paddingLeft:24,textIndent:-24}}>{r}</div>)}
      </div>}
    </div>

    <div style={{background:C.g9,padding:"20px 24px",color:C.g5,fontSize:10,textAlign:"center",lineHeight:1.8}}>
      <div style={{maxWidth:960,margin:"0 auto"}}>
        <div>Rabe, M., Buitkamp, L. F., & Persike, M. (in preparation). Towards a comprehensive model of university undergraduate students' competencies: A mixed-methods analysis of core skills for academic success.</div>
        <div style={{marginTop:4}}>
          <a href="https://osf.io/rud6v" target="_blank" rel="noopener noreferrer" style={{color:"#8EBAE5",textDecoration:"none",fontWeight:600}}>osf.io/rud6v</a>
          <span style={{margin:"0 8px",opacity:.4}}>·</span>
          <span>{t("Licensed under","Lizenziert unter")} </span>
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style={{color:"#8EBAE5",textDecoration:"none",fontWeight:600}}>CC BY 4.0</a>
        </div>
        <div style={{marginTop:4,opacity:.5}}>{t("Visual design created with AI assistance","Visuelle Gestaltung mit KI-Unterstützung erstellt")}</div>
      </div>
    </div>
  </div>;
}
