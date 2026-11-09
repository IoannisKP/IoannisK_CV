export const person = {
  name: 'Ioannis Koupidis',
  firstName: 'Ioannis',
  location: 'Stockholm, Sweden',
  email: 'gkoupidis@gmail.com',
  linkedin: 'https://www.linkedin.com/in/koupidisyannis',
  github: 'https://github.com/IoannisKP',
  phone: '+46 (0) 73 955 82 53',
  tagline: 'Founder turned product thinker.',
  bio: 'I spent years building services people could depend on. Today, I’m bringing that experience into digital products, combining research, clear decisions and hands-on experimentation.',
};

export const experience = [
  { company:'Konduko AB', role:'Founder', years:'2012 to 2025', details:'Founded and ran a specialist healthcare staffing company serving Swedish public healthcare. Designed the operational system that connected procurement, physician availability, contracts, schedules, invoicing and quality assurance.', evidence:['25+ public procurement contracts','140+ physicians on parallel assignments','Framework coverage across Swedish regions'], note:'Awarded frameworks had an aggregate estimated procurement value above SEK 1.5B. This was not company revenue or guaranteed spending.'},
  { company:'NiyaCare', role:'Founder', years:'2011 to Present', details:'Established a personal assistance company built around understanding individual needs, finding reliable matches and delivering dependable everyday support.'},
  { company:'Apolyto S.A.', role:'Graphic Designer → Project Manager', years:'1998 to 2009', details:'Worked in graphic design and project management.'},
  { company:'Angelos Frentzos S.A.', role:'Creative Consultant', years:'2004 to 2011', details:'Creative consulting.'},
  { company:'Barbara’s Food Company', role:'Creative Consultant', years:'2009 to 2010', details:'Creative consulting.'},
  { company:'PricewaterhouseCoopers', role:'Design Consultant', years:'2004 to 2009', details:'Design consulting.'},
];

export const education = [
  { school:'Hyper Island', subject:'Product Management', years:'Current' },
  { school:'Medieinstitutet', subject:'UX Design', years:'2026' },
  { school:'IIEK Technografiko · Athens', subject:'Graphic Design', years:'1996' },
];

export const projects = [
  {
    id:'hiroom', title:'HIRoom', ordinal:'01', eyebrow:'Product discovery / Team project', category:'Product management', year:'2026', status:'Student prototype', accent:'#e5e5e5', ink:'#161616',
    intro:'A better room-booking experience starts before the first click.',
    teaser:'Researching the everyday friction of booking rooms at Hyper Island, then turning feedback into clearer product priorities.',
    role:'Research, synthesis, user flows and prioritisation within a student team',
    scope:'Discovery · Prototyping · Usability testing',
    highlight:{num:'10',label:'moderated booking-task participants',qualifier:'Additional staff-oriented and written feedback reviewed separately'},
    links:[{label:'Explore the prototype',url:'https://book-an-island.lovable.app'}], visual:'hiroom',
    short:[
      {label:'The challenge',title:'Booking a room should not feel like an investigation.',body:'Our team explored the friction in Hyper Island’s existing Humly booking experience and built a prototype called HIRoom. The goal was to make it easier to find a suitable space, understand availability and manage bookings.'},
      {label:'My work',title:'Turn what people said into decisions.',body:'I worked across interviews, research patterns, user flows, prototype testing and a prioritized Linear backlog. We separated observed problems from proposed improvements and identified what still needed validation.'},
      {label:'Evidence',title:'Small but concrete signals.',body:'Ten participants completed moderated booking tasks. A separate staff/calendar walkthrough and written UX feedback exposed confusion around capacity, times, navigation, availability counts and editing bookings.'},
      {label:'Takeaway',title:'Start with the friction, not the feature.',body:'The project sharpened my understanding of how research should change priorities. It remains a student prototype, not a launched service or a measured business success.'}
    ],
    chapters:[
      {label:'Context',title:'When the room is there, but the path is hard.',body:['Students needed to reserve meeting spaces to work together. The team examined the existing Humly experience, listening for where finding and managing a room became unnecessarily complicated.','The assignment was not simply to make a booking app look modern. It was to identify which parts of the experience caused friction and explore a more useful alternative.'], take:'Problem framing: reduce avoidable effort in finding and managing a room.'},
      {label:'Discovery',title:'Different needs, repeated patterns.',body:['Early interviews informed an evolving picture of students’ booking habits and the conditions they checked before choosing a room. The team developed research synthesis, persona work and user-flow thinking before committing to an interface.','The prototype was developed in Lovable and tested against practical booking tasks. Across the project, 10 participants completed moderated booking tasks. Feedback also included a separate staff/calendar-oriented walkthrough and written UX observations. These are qualitative signals, not population-wide rates.'], take:'10 moderated booking-task participants; other feedback came from different evaluation formats.'},
      {label:'What we learned',title:'Availability is not just a green indicator.',body:['Participants wanted to see room capacity without opening every room, compare start and end times more directly, and avoid trial-and-error searching for alternatives.','One participant could cancel a booking but could not find an edit flow. Feedback also surfaced inconsistent navigation, unclear calendar connection and conflicting availability counts in some views. The large decorative homepage hero pushed the primary action below the fold.'], take:'Visibility, confidence and fewer unnecessary steps emerged as design priorities.'},
      {label:'Decisions',title:'Translate feedback into a backlog.',body:['The team organized issues in Linear by category, impact and urgency. High-priority opportunities included access to booking without scrolling, consistent navigation, visible room capacity, clearer time/availability information and editing existing reservations.','A key distinction in the backlog is that suggestions are not proven improvements. Each proposed change includes acceptance criteria and a testable expectation for subsequent work.'], take:'Evidence → problem statement → proposed direction → acceptance criteria.'},
      {label:'Validation',title:'A prototype is a question, not an answer.',body:['Proposed success measures include successful booking completion, time to complete a task, booking errors, edits completed and perceived confidence. These are measurement ideas rather than achieved results.','The next useful step would be comparative usability testing with realistic tasks, devices and consistent observation criteria, followed by genuine implementation checks for calendar synchronization and availability data.'], take:'There is no evidence here of a production launch or a quantified usability improvement.'},
      {label:'Reflection',title:'Less decoration. More direction.',body:['One memorable lesson was how a striking hero treatment could compete with the job users came to do. A good interface can still get in the way if the most important action is visually secondary.','I also learned to separate feedback, assumptions and actual completed work. That makes prioritization more honest and helps the team discuss what deserves attention next.'], take:'Good product work connects decisions to evidence, including imperfect evidence.'}
    ]
  },
  {
    id:'scribe', title:'Scribe', ordinal:'02', eyebrow:'Independent product / macOS', category:'Product delivery', year:'2026', status:'Working pre-release app', accent:'#b3c9fa', ink:'#1c2853',
    intro:'A meeting recorder where the recording matters more than the demo.',
    teaser:'Defining and verifying a privacy-conscious macOS recorder with local transcription and recoverable files.',
    role:'Product scope, acceptance criteria, AI-agent direction and verification', scope:'Product decisions · AI-assisted build · QA',
    highlight:{num:'04',label:'defects found through manual verification',qualifier:'Despite 283 passing automated tests in a documented snapshot'},
    links:[{label:'View repository',url:'https://github.com/IoannisKP/scribe'},{label:'Original case study',url:'https://ioanniskp.github.io/IoannisK_CV/?lang=en#work/scribe'}], visual:'scribe',
    short:[
      {label:'The challenge',title:'Meeting records you can actually keep.',body:'Scribe is a macOS meeting recorder built around privacy, local transcription and durable session files. The critical promise is not just text on screen, but recordings and transcripts that are actually saved.'},
      {label:'My role',title:'I directed the product, not every line of code.',body:'I established scope and acceptance criteria, compared twelve transcription model options, directed AI-assisted implementation and manually verified the end-to-end experience.'},
      {label:'Evidence',title:'283 tests passed. Four problems remained.',body:'In one documented snapshot, 283 automated tests were passing while manual checks revealed four defects, including a transcript shown in the interface but not saved correctly. These are historical counts, not claims about the latest build.'},
      {label:'Takeaway',title:'Passing tests do not guarantee a usable outcome.',body:'The next question is whether people can reliably record, recover and reuse their meetings. Scribe is working software, but user value and repeated use are not yet established by this case study.'}
    ],
    chapters:[
      {label:'Problem',title:'The most important file is the one you can recover.',body:['Scribe began with a straightforward desire: capture a meeting, transcribe it and retain control of the result. The product direction emphasized local processing for recording and transcription, with files that remain accessible outside the interface.','This raised a more serious design question than how to display speech: what happens when recording, transcription and saving fail independently?'], take:'The product promise depends on trustworthy artifacts, not only interface states.'},
      {label:'Scope',title:'Decide what not to automate.',body:['I defined scope and acceptance criteria before directing AI-assisted implementation. The early plan explicitly protected the boundary between recording and processing: transcription problems should not be presented as lost audio.','I compared twelve transcription model options. Local processing was prioritized, accepting trade-offs such as download size, model performance and a visible delay before the first live text.'], take:'Twelve model options compared during early product definition.'},
      {label:'Workflow',title:'AI built. I had to verify.',body:['The first working build was developed over a documented 13-day period. I directed implementation using AI tools and checked behavior manually, including capture, playback, the transcript and the saved session directory.','The distinction matters: AI-assisted software creation can accelerate implementation, but scope ownership, verification and acceptance remain product responsibilities.'], take:'AI-assisted delivery still requires accountable acceptance.'},
      {label:'Evidence',title:'A green test suite hid a broken user outcome.',body:['At one point, 283 automated tests passed while a hands-on review found four defects. One failure meant transcript text could be visible but not reliably written to the saved file.','I learned to test what the user ultimately receives: recording audio, stopping, reopening a saved session, playing the audio and checking the actual transcript file. The case documents defect discovery, not that every issue has been resolved.'], take:'283 automated passes / 4 manual defects, historical snapshot.'},
      {label:'Trade-offs',title:'Privacy needs precise language.',body:['Scribe’s core recording and transcription workflow is designed to run locally. Optional summary integrations described in the repository may involve external providers after explicit confirmation. These optional integrations have different privacy implications from the local workflow.','The interface must distinguish recording from transcription states and explain recoverable failures rather than offering vague success messages.'], take:'Honest product copy is part of reliability.'},
      {label:'Reflection',title:'Working is not the same as proven useful.',body:['The project demonstrates detailed scoping, product trade-offs and acceptance discipline. The next meaningful evidence would be end-to-end workflows with real users and repeated use over time.','A product manager cannot stop at a successful build. The question is whether the person trying to do a job can complete it without surprise or lost work.'], take:'Technical validation and user validation answer different questions.'}
    ]
  },
  {
    id:'agent-x', title:'Agent X', ordinal:'03', eyebrow:'UX research / Final course project', category:'Discovery & UX', year:'2026', status:'Researched concept', accent:'#e4b5f8', ink:'#43234d',
    intro:'Give players a clue without taking away the discovery.',
    teaser:'Researching how new Escape from Tarkov players recover from failure, without removing the game’s challenge.',
    role:'Interviews, synthesis, concept design, wireframes and evaluation', scope:'User research · Journey mapping · Think-aloud testing',
    highlight:{num:'08',label:'Discord player interviews',qualifier:'Four wireframe views evaluated in three think-aloud sessions'},
    links:[{label:'See original case study',url:'https://ioanniskp.github.io/-agent-x-case-study/'}], visual:'agent',
    short:[
      {label:'The problem',title:'Too much help can ruin the game.',body:'Escape from Tarkov makes difficulty and uncertainty part of its appeal. I explored how a struggling new player could understand failure and find a next step without being handed a complete answer.'},
      {label:'My work',title:'Research first, hints second.',body:'I conducted eight Discord text interviews, synthesized a research matrix, two working personas and an emotional journey, then developed four wireframe views around contextual guidance.'},
      {label:'Evidence',title:'Understandable, but not yet validated for players.',body:'Three think-aloud participants understood the proposed interface, but none had played Tarkov. This supported comprehension, not usefulness to the target audience.'},
      {label:'Takeaway',title:'The right test depends on the right participant.',body:'The next study would involve actual new players and compare when a hint should appear. Comprehension alone does not establish product value.'}
    ],
    chapters:[
      {label:'Brief',title:'Help without removing the challenge.',body:['This supervised Medieinstitutet UX project began with a tension: first-time players can struggle to learn Escape from Tarkov, but overcoming uncertainty is itself part of the game’s experience.','A traditional tutorial risks solving the immediate problem by removing the discovery that makes the game memorable. The opportunity was more nuanced: support reflection after failure, while keeping the next decision with the player.'], take:'Design challenge: preserve agency while helping interpretation.'},
      {label:'Interviews',title:'Eight conversations, a different problem.',body:['I conducted eight text interviews via Discord with players across the experience spectrum, including someone who had stopped playing.','The synthesis shifted attention away from simply giving beginners more instructions. It surfaced the need to interpret what went wrong and identify what might be worth trying differently next time.'], take:'Eight Discord text interviews.'},
      {label:'Synthesis',title:'From recurring feelings to a focused concept.',body:['I organized the material into a research matrix, two working personas and an emotional journey map. The primary audience became the motivated newcomer who wants to persist but cannot easily explain repeated failure.','The concept was a companion that offers context when needed, points toward a direction and then gets out of the way. The activation threshold remained a hypothesis.'], take:'The product should give direction without providing a complete route.'},
      {label:'Wireframes',title:'Explore a single helpful interruption.',body:['Four wireframe views explored how guidance could be discovered, understood and dismissed. The concept aimed to be quiet by default, respectful of attention and understandable when it appeared.','A critical open question was not only what the guidance said, but when it should appear: after one failure, after several or only when explicitly requested.'], take:'Four wireframe views; timing still unvalidated.'},
      {label:'Evaluation',title:'Three understood it. The real audience was missing.',body:['Three participants in think-aloud sessions located and understood the intended guidance without prompting. None was a Tarkov player.','This is a meaningful limit. The sessions offered initial evidence of discoverability and comprehension, but could not show usefulness, appropriate timing or preservation of the actual play experience.'], take:'Three think-aloud sessions were not target-user validation.'},
      {label:'Reflection',title:'Test the question that matters.',body:['The next step would recruit new Tarkov players and observe whether a contextual clue changes their next attempt, rather than only asking whether the interface is clear.','The central lesson is that a usable idea is not automatically a valuable idea. Recruiting the right participants is part of designing the research, not an administrative detail.'], take:'Understanding ≠ validated value.'}
    ]
  },
  {
    id:'pm-compass', title:'PM Compass', ordinal:'04', eyebrow:'Independent product / In progress', category:'Product strategy', year:'2026, Ongoing', status:'In progress · Private', accent:'#ffdba6', ink:'#543416',
    intro:'A small tool for the big question: what do I do next?',
    teaser:'Designing a practical companion that helps an early-career PM recover context, prepare and move from theory into action.',
    role:'Product vision, information architecture, prioritization, Lovable builds and testing', scope:'Strategy · Information architecture · Iteration',
    highlight:{num:'05',label:'primary product areas',qualifier:'Today · Help Me · Guides · Library · Projects'},
    links:[], visual:'compass',
    short:[
      {label:'The problem',title:'Understanding a framework is not the same as using it.',body:'As a PM student, I noticed that learning a method in class did not mean I could easily apply it days later. I wanted a tool that made next steps easier to find.'},
      {label:'The product',title:'An external memory for product work.',body:'PM Compass brings Today, Help Me, Guides, Library and Projects into a focused personal workspace. The goal is to resume work and make decisions without reconstructing everything from memory.'},
      {label:'Decisions',title:'Choose usefulness over feature count.',body:'I prioritized plain-language guidance, reliable context and structured resources. I deliberately postponed unnecessary AI features and kept the product private rather than pretending it was ready for a public market.'},
      {label:'Status',title:'Still building, still learning.',body:'The app is an ongoing private project with completed milestones in structure, library/search and authentication. It has not been validated for public adoption, and future iterations remain open.'}
    ],
    chapters:[
      {label:'Origin',title:'What do I do next?',body:['As a Product Management student, I could understand a framework during a lesson but struggle to recall the appropriate next step later. Resuming an unfinished project was often less about finding information and more about recovering context.','I wanted a companion that answers a practical question before opening a textbook: where am I, what have I decided and what should I do now?'], take:'The core job is continuity, not encyclopedic coverage.'},
      {label:'Vision',title:'A useful companion, not another glossary.',body:['PM Compass is designed as an external memory and practical work companion for a junior PM. The five areas are Today, Help Me, Guides, Library and Projects.','Different entry points serve different jobs: return to work, handle a situation, complete a task, remember a concept or recover a project decision.'], take:'Five primary areas reflect five distinct jobs.'},
      {label:'Scope',title:'Focus makes the product useful.',body:['I prioritized practical guidance, plain language and structured information over a long catalogue of disconnected frameworks. The content model includes sources and caveats so methods are not presented as universal laws.','I chose to defer more elaborate AI functionality where rule-based or structured guidance could meet the need with less complexity.'], take:'Prioritization is as much about what not to build.'},
      {label:'Building',title:'Milestones before embellishments.',body:['The project progressed through information architecture and UX, the Library and search, an expanded set of curated resources, and authentication with an optional profile. Visual exploration moved toward an editorial utility and field-notebook language.','The work uses Lovable for rapid building and review. A prior milestone reported 42 passing tests, which should be treated as a historical snapshot rather than a current audit.'], take:'The product is actively evolving; a public launch is not the current goal.'},
      {label:'Decisions',title:'Private on purpose.',body:['I decided not to treat PM Compass as a public launch prematurely. That keeps attention on whether it helps me do real work, and allows scope and quality to evolve without inventing a market or pushing growth metrics.','Product questions remain open: which guidance is genuinely useful, how to export decisions and what is worth adding next.'], take:'Private and in progress is an intentional product status.'},
      {label:'Reflection',title:'Build for the actual job.',body:['This project has taught me to evaluate a feature against the task it is meant to support. A glossary can contain a lot of content without helping someone decide what to do.','My next priority is continued usage, evidence from real situations and improvements based on what causes friction, not simply increasing the number of features.'], take:'The product measures success in useful decisions, not feature quantity.'}
    ]
  },
  {
    id:'tedx-circles', title:'TEDx Circles', ordinal:'05', eyebrow:'Community concept / Team project', category:'Concept validation', year:'2026', status:'Student concept & pitch', accent:'#f7a8a8', ink:'#51232c',
    intro:'What if the conversation continued after the event?',
    teaser:'Exploring a smaller, recurring format for meaningful connection around TEDxStockholm ideas.',
    role:'Team discovery, concept development and pitch collaboration', scope:'Community research · Value proposition · Concept testing',
    highlight:{num:'08',label:'people per proposed discussion table',qualifier:'Concept explored by a six-person student team'},
    links:[{label:'Project repository',url:'https://github.com/IoannisKP/TEDxStockholm'}], visual:'circles',
    short:[
      {label:'The challenge',title:'Make community more than an event.',body:'Our six-person Hyper Island team explored how TEDxStockholm might sustain meaningful engagement between large events.'},
      {label:'The idea',title:'Small groups. One good question.',body:'TEDx Circles proposed recurring conversations around a monthly theme, with tables of approximately eight people and volunteer hosts.'},
      {label:'Early signal',title:'Interest is not attendance.',body:'Early discussions and surveys suggested interest in the format. Preliminary host interest was reported, but that is not evidence of attendance, retention or a launched program.'},
      {label:'Learning',title:'The next test is a real circle.',body:'The strongest next step would be a small pilot tracking actual participation, discussion quality and willingness to return. The project ended as a concept and pitch.'}
    ],
    chapters:[
      {label:'Challenge',title:'The idea does not need to end at the exit.',body:['TEDxStockholm has a recognizable event format, but the team explored what might make the community more active between major events.','We looked for a recurring way to connect people who care about ideas but may not have an easy path into smaller, ongoing conversations.'], take:'A community challenge framed around continuity.'},
      {label:'Discovery',title:'People wanted meaningful, accessible conversation.',body:['The team explored perceptions of TEDxStockholm, barriers to ongoing engagement and appetite for smaller group discussions. Our observations informed a value proposition centered on thoughtful participation rather than another large event.','This was early-stage discovery. Statements of interest required further testing in real-world conditions.'], take:'Signals from interviews and surveys informed, but did not validate, demand.'},
      {label:'Concept',title:'A recurring question. A table of eight.',body:['TEDx Circles proposed a monthly conversation prompt and intimate gatherings led by hosts. The approximate eight-person table size was intended to make participation manageable and help people contribute.','The format could be repeated without needing the production scale of a major conference.'], take:'Low-complexity, recurring community experience.'},
      {label:'Testing',title:'Interest is a starting signal.',body:['The group gathered early feedback, including preliminary expressions of host interest. The next step would be to test whether that interest translates into hosting a real gathering.','A positive response to a concept is different from actual turnout, a successful event and repeat participation.'], take:'Separate intention from observed behavior.'},
      {label:'Pitch',title:'Tell a coherent story in five minutes.',body:['The team aligned around the concept and presented a concise pitch. This required communicating the problem, proposed mechanism and potential value without disguising a concept as an existing service.','The deliverable was a developed idea and presentation, not a launched TEDxStockholm program.'], take:'Concept and pitch, not production deployment.'},
      {label:'Reflection',title:'Run a circle. Then learn.',body:['An appropriate next experiment would be one or two small gatherings with a simple measure of attendance, contribution, satisfaction and interest in returning.','The project reinforced the value of testing the smallest real version of a service before planning an entire community program.'], take:'A pilot tests participation better than a survey alone.'}
    ]
  }
  ,
  {
    id:'radio', title:'Radio', ordinal:'06', eyebrow:'Independent iOS experiment / Product delivery', category:'Product execution', year:'2026', status:'Working build, not released', accent:'#e5e5e5', ink:'#161616',
    intro:'Eight hours to build. Real-device testing to learn what works.',
    teaser:'A tightly scoped iOS radio player, developed with separate AI implementation and review agents and verified on a physical iPhone.',
    role:'Product scope, agent direction, acceptance and device testing',
    scope:'Scope definition · AI-assisted delivery · Independent QA',
    highlight:{num:'08h',label:'from written scope to working handover build',qualifier:'A time-boxed personal project, not a public launch'},
    links:[{label:'View project repository',url:'https://github.com/IoannisKP/Radio-iOS-app'},{label:'Earlier case study',url:'https://ioanniskp.github.io/IoannisK_CV/?lang=en#work/radio'}],
    visual:'radio',
    short:[
      {label:'The challenge',title:'Build the essential listening experience in one day.',body:'I scoped an iOS radio player around browsing stations, searching and playback. The eight-hour limit made explicit trade-offs and acceptance criteria essential.'},
      {label:'My role',title:'Define, direct, review and verify.',body:'I wrote the scope and acceptance conditions, directed an implementation agent, used a separate review agent and tested the handover build on a physical iPhone.'},
      {label:'Evidence',title:'The real device revealed what the simulator missed.',body:'An independent review reported four blocking faults. The physical iPhone test also exposed a network failure not encountered in the simulator. A documented handover included 24 passing automated tests.'},
      {label:'Learning',title:'Shipping a build is not the same as shipping a product.',body:'Radio was a working but unreleased build. The project established a more reliable habit of defining expectations, reviewing independently and verifying in real conditions before claiming completion.'}
    ],
    chapters:[
      {label:'Challenge',title:'One day. One focused product journey.',body:['The experiment was to scope and produce a usable internet radio player within eight hours. The core user journey was straightforward: browse or search for a station, start listening and know what is playing.','I consciously excluded features outside the core listening experience. A short time box increases the need for clearly stated requirements rather than replacing them.'],take:'A narrow scope helped keep the essential listening experience central.'},
      {label:'Product scope',title:'Define acceptance before implementation.',body:['I documented the required browsing, searching and playback behavior and the conditions that would count as an acceptable build.','The scope was meant to guide implementation and make the result objectively reviewable, not simply to produce an attractive interface within a deadline.'],take:'Clear boundaries made an eight-hour experiment possible.'},
      {label:'Delivery',title:'Separate implementation from review.',body:['I directed an AI implementation agent and a separate review agent. The reviewer could identify blocking faults instead of assuming work described as complete was correct.','I remained responsible for product decisions and acceptance. The project was AI-assisted development, not a claim that I personally wrote every line of the native iOS code.'],take:'Independent review introduced a critical check before acceptance.'},
      {label:'Verification',title:'A physical iPhone changed the result.',body:['The independent audit identified four blocking faults. A subsequent test on a physical iPhone exposed network behavior that did not fail in the simulator.','At handover, the project recorded 24 passing automated tests. That snapshot does not establish complete reliability or prove all identified issues have been resolved.'],take:'Real-world verification and automation answer different questions.'},
      {label:'Outcome',title:'A working build, not a released app.',body:['Radio produced a working handover build in an eight-hour exercise, but it was not released or validated with actual listeners.','Before public availability, it would require reliability checks, clear documentation of outstanding faults and evaluation of the listening experience with intended users.'],take:'A functioning prototype is evidence of delivery, not product-market value.'},
      {label:'Reflection',title:'A process I could take into the next project.',body:['The define, build, independently review and test loop became a repeatable way to approach AI-assisted projects. I refined it further when developing Scribe.','The lesson was to make real-user conditions part of acceptance: the device, network, playback and saved state matter more than a passing demo.'],take:'Define, build, review and verify before claiming the product works.'}
    ]
  }
];

export const visualNames = {hiroom:'Booking clarity',scribe:'Meeting, saved',agent:'Guidance, not answers',compass:'What’s next?',circles:'Ideas become conversations',radio:'A listening experiment'};
