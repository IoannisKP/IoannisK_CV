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
  { company:'Konduko AB', role:'Founder', years:'2012 to 2025', details:'Founded and ran a specialist healthcare staffing company serving Swedish public healthcare. Designed the operational system that connected procurement, physician availability, contracts, schedules, invoicing and quality assurance.', evidence:['25+ public procurement contracts','140+ physicians on parallel assignments','Framework coverage across Swedish regions'], note:'The awarded frameworks had an aggregate estimated procurement value above SEK 1.5B. That figure is the procurement estimate, not company revenue.'},
  { company:'NiyaCare', role:'Founder', years:'2011 to Present', details:'Established a personal assistance company built around understanding individual needs, finding reliable matches and delivering dependable everyday support.'},
  { company:'Earlier career in design', role:'Graphic Designer · Project Manager · Creative Consultant', years:'1998 to 2011', details:'Graphic designer and later project manager at Apolyto S.A. (1998 to 2009). Design and creative consultant for Angelos Frentzos S.A., PricewaterhouseCoopers and Barbara’s Food Company.'},
];

export const education = [
  { school:'Hyper Island · Stockholm', subject:'Product Management, two-year program', years:'2026 to 2028' },
  { school:'Medieinstitutet', subject:'UX Design', years:'2026' },
  { school:'IIEK Technografiko · Athens', subject:'Graphic Design', years:'1996' },
];

export const projects = [
  {
    id:'hiroom', title:'HIRoom', ordinal:'01', eyebrow:'Product discovery / Team project', category:'Product management', year:'2026', status:'Student prototype', accent:'#e5e5e5', ink:'#161616',
    intro:'A better room-booking experience starts before the first click.',
    teaser:'Product Owner in a student team rethinking room booking at Hyper Island. Planned the research, designed the booking flows and cut scope to keep booking fast.',
    role:'Product Owner in a five-person student team: research plan, synthesis, user flows and scope decisions',
    scope:'Discovery · Prototyping · Usability testing',
    highlight:{num:'10',label:'moderated booking-task participants',qualifier:'Additional staff-oriented and written feedback reviewed separately'},
    links:[{label:'Explore the prototype',url:'https://www.hiroom.se'}], visual:'hiroom',
    short:[
      {label:'The challenge',title:'Booking a room should not feel like an investigation.',body:'Students at Hyper Island book meeting rooms through Humly. Our team looked at where finding, booking and changing a room took more effort than it should, and built a prototype called HIRoom to test a simpler path.'},
      {label:'My role',title:'Product Owner, from research plan to scope.',body:'I was appointed Product Owner. I set up the team workspace in Linear, wrote the hypothesis and interview questions, mapped the current and proposed booking flows and made the case for what to leave out.'},
      {label:'Evidence',title:'Ten people tried to book a room.',body:'Ten participants completed moderated booking tasks on the prototype. A separate staff walkthrough and written UX feedback pointed to the same gaps: room capacity, start and end times, navigation and editing a booking.'},
      {label:'Takeaway',title:'Start with the friction, not the feature.',body:'My first assumption was that Humly had to be replaced. The interviews changed the question to which steps slow people down. HIRoom is a student prototype and has not replaced Humly.'}
    ],
    chapters:[
      {label:'Context',title:'When the room is there, but the path is hard.',body:['Students at Hyper Island reserve meeting rooms through Humly. Our team chose this problem from several candidates. I had put forward two and withdrew one myself because its scope was too broad for the course.','I started out assuming Humly needed to be replaced. Before anyone built on that, I wanted it checked with students: did they have problems with Humly at all, and would a new system make booking easier?'], take:'The first job was to test my own assumption.'},
      {label:'Discovery',title:'A research plan before a prototype.',body:['As Product Owner I set up the project in Linear with a teammate, wrote down our hypothesis and prepared interview questions about how students find a room, book it and confirm the reservation. Each team member ran two interviews.','I mapped the current booking flow in Humly as a baseline. A teammate later expanded it to show how the user, Humly and Google Calendar interact.','A first prototype existed early, built on assumptions. I asked that the interview data decide the direction. After a team session on how we make decisions, I proposed ending every stand-up with a short summary of what we had agreed.'], take:'Research first, and agreements written down.'},
      {label:'What we learned',title:'Speed and simplicity came up again and again.',body:['I analyzed the interviews for patterns. Students valued speed and simplicity. Unnecessary steps, confusing labels and repeated information made booking more frustrating than it needed to be.','Ten participants completed moderated booking tasks on the prototype. They wanted to see room capacity without opening every room, compare start and end times directly and stop searching by trial and error. One participant could cancel a booking but could not find a way to edit it. The large homepage hero pushed the main action below the fold.','A separate staff walkthrough and written UX feedback added inconsistent navigation and conflicting availability counts in some views.'], take:'Visibility, confidence and fewer steps became the priorities.'},
      {label:'Decisions',title:'What I argued to leave out.',body:['I turned the interview patterns into a proposed booking flow and presented it to the team. It became our shared reference for the next prototype iteration.','Group creation. The prototype let users create and maintain groups. That added steps and upkeep, which went against our aim of quick booking. I proposed removing it and suggesting teammates during booking instead. The team was against it at first. After I explained the reasoning a few times, everyone agreed.','AI booking. I had proposed letting users book a room in natural language. I cancelled my own idea after discussing it with the team. It was more than the project needed and would have used up our Lovable credits.'], take:'Two features cut, one of them my own.'},
      {label:'Prototype',title:'Decisions into prompts, then checked.',body:['We built the prototype in Lovable. In the final sprint I worked on simplifying the landing page, the booking flow and time selection. Much of that was turning team decisions into prompts and checking that the result behaved as intended.','I wanted a full availability overview on every screen. Testing layouts showed that what works on desktop does not fit a phone. I proposed that the mobile version instead lists the rooms with the most availability for the chosen booking duration.','The team worked in sprints in Linear, with issues grouped by category, impact and urgency. Each proposed change was written with acceptance criteria.'], take:'Desktop shows the full timeline. Mobile ranks rooms by availability.'},
      {label:'Reflection',title:'Listening is part of the job.',body:['The group-creation discussion taught me something about listening. The idea only landed once we slowed down and considered it properly. I recognized the pattern, because I also sometimes wait for my turn to speak instead of listening.','HIRoom is a student prototype. It has not replaced Humly and we have not measured an improvement. The next step would be a usability test against Humly on the same tasks, followed by checks on calendar sync and live availability data.'], take:'Next step: test HIRoom against Humly on the same tasks.'}
    ]
  },
  {
    id:'scribe', title:'Scribe', ordinal:'02', eyebrow:'Independent product / macOS', category:'Product delivery', year:'2026', status:'Working pre-release app', accent:'#b3c9fa', ink:'#1c2853',
    intro:'A meeting recorder where the recording matters more than the demo.',
    teaser:'Defining and verifying a privacy-conscious macOS recorder with local transcription and recoverable files.',
    role:'Product scope, acceptance criteria, AI-agent direction and verification', scope:'Product decisions · AI-assisted build · QA',
    highlight:{num:'04',label:'defects found through manual verification',qualifier:'While 283 automated tests were passing'},
    links:[{label:'View repository',url:'https://github.com/IoannisKP/scribe'},{label:'Original case study',url:'https://ioanniskp.github.io/IoannisK_CV/?lang=en#work/scribe'}], visual:'scribe',
    short:[
      {label:'The challenge',title:'Meeting records you can actually keep.',body:'Scribe is a macOS meeting recorder built around privacy, local transcription and durable session files. The critical promise is not just text on screen, but recordings and transcripts that are actually saved.'},
      {label:'My role',title:'I directed the product, not every line of code.',body:'I established scope and acceptance criteria, compared twelve transcription model options, directed AI-assisted implementation and manually verified the end-to-end experience.'},
      {label:'Evidence',title:'283 tests passed. Four problems remained.',body:'In one documented snapshot, 283 automated tests were passing while manual checks revealed four defects, including a transcript shown in the interface but not saved correctly.'},
      {label:'Takeaway',title:'Passing tests do not guarantee a usable outcome.',body:'Scribe is working software. The next question is whether people can reliably record, recover and reuse their meetings, and that needs real users over time.'}
    ],
    chapters:[
      {label:'Problem',title:'The most important file is the one you can recover.',body:['Scribe began with a straightforward desire: capture a meeting, transcribe it and retain control of the result. The product direction emphasized local processing for recording and transcription, with files that remain accessible outside the interface.','This raised a more serious design question than how to display speech: what happens when recording, transcription and saving fail independently?'], take:'The product promise depends on trustworthy artifacts, not only interface states.'},
      {label:'Scope',title:'Decide what not to automate.',body:['I defined scope and acceptance criteria before directing AI-assisted implementation. The early plan explicitly protected the boundary between recording and processing: transcription problems should not be presented as lost audio.','I compared twelve transcription model options. Local processing was prioritized, accepting trade-offs such as download size, model performance and a visible delay before the first live text.'], take:'Twelve model options compared during early product definition.'},
      {label:'Workflow',title:'AI built. I had to verify.',body:['The first working build was developed over a documented 13-day period. I directed implementation using AI tools and checked behavior manually, including capture, playback, the transcript and the saved session directory.','The distinction matters: AI-assisted software creation can accelerate implementation, but scope ownership, verification and acceptance remain product responsibilities.'], take:'AI-assisted delivery still requires accountable acceptance.'},
      {label:'Evidence',title:'A green test suite hid a broken user outcome.',body:['At one point, 283 automated tests passed while a hands-on review found four defects. One failure meant transcript text could be visible but not reliably written to the saved file.','I learned to test what the user ultimately receives: recording audio, stopping, reopening a saved session, playing the audio and checking the actual transcript file.'], take:'283 automated passes. Four defects found by hand.'},
      {label:'Trade-offs',title:'Privacy needs precise language.',body:['Scribe’s core recording and transcription workflow is designed to run locally. Optional summary integrations described in the repository may involve external providers after explicit confirmation. These optional integrations have different privacy implications from the local workflow.','The interface must distinguish recording from transcription states and explain recoverable failures rather than offering vague success messages.'], take:'Honest product copy is part of reliability.'},
      {label:'Reflection',title:'Working is not the same as proven useful.',body:['Scribe taught me to scope in detail, weigh trade-offs and hold the line on acceptance. What it still lacks is evidence from real users and repeated use over time.','A product manager cannot stop at a successful build. The question is whether the person trying to do a job can complete it without surprise or lost work.'], take:'Technical validation and user validation answer different questions.'}
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
    id:'tedx-circles', title:'TEDx Circles', ordinal:'04', eyebrow:'Community concept / Team project', category:'Concept validation', year:'2026', status:'Student concept & pitch', accent:'#f7a8a8', ink:'#51232c',
    intro:'What if the conversation continued after the event?',
    teaser:'Exploring a smaller, recurring format for meaningful connection around TEDxStockholm ideas.',
    role:'Team discovery, concept development and pitch collaboration', scope:'Community research · Value proposition · Concept testing',
    highlight:{num:'08',label:'people per proposed discussion table',qualifier:'Concept explored by a six-person student team'},
    links:[{label:'Project repository',url:'https://github.com/IoannisKP/TEDxStockholm'}], visual:'circles',
    short:[
      {label:'The challenge',title:'Make community more than an event.',body:'Our six-person Hyper Island team explored how TEDxStockholm might sustain meaningful engagement between large events.'},
      {label:'The idea',title:'Small groups. One good question.',body:'TEDx Circles proposed recurring conversations around a monthly theme, with tables of approximately eight people and volunteer hosts.'},
      {label:'Early signal',title:'Interest is not attendance.',body:'Early discussions and surveys suggested interest in the format, and some people said they would host. Whether they would turn up is untested.'},
      {label:'Learning',title:'The next test is a real circle.',body:'The strongest next step would be a small pilot tracking actual participation, discussion quality and willingness to return. The project ended as a concept and pitch.'}
    ],
    chapters:[
      {label:'Challenge',title:'The idea does not need to end at the exit.',body:['TEDxStockholm has a recognizable event format, but the team explored what might make the community more active between major events.','We looked for a recurring way to connect people who care about ideas but may not have an easy path into smaller, ongoing conversations.'], take:'A community challenge framed around continuity.'},
      {label:'Discovery',title:'People wanted meaningful, accessible conversation.',body:['The team explored perceptions of TEDxStockholm, barriers to ongoing engagement and appetite for smaller group discussions. Our observations informed a value proposition centered on thoughtful participation rather than another large event.','This was early-stage discovery. Statements of interest required further testing in real-world conditions.'], take:'Signals from interviews and surveys informed, but did not validate, demand.'},
      {label:'Concept',title:'A recurring question. A table of eight.',body:['TEDx Circles proposed a monthly conversation prompt and intimate gatherings led by hosts. The approximate eight-person table size was intended to make participation manageable and help people contribute.','The format could be repeated without needing the production scale of a major conference.'], take:'Low-complexity, recurring community experience.'},
      {label:'Testing',title:'Interest is a starting signal.',body:['The group gathered early feedback, including preliminary expressions of host interest. The next step would be to test whether that interest translates into hosting a real gathering.','A positive response to a concept is different from actual turnout, a successful event and repeat participation.'], take:'Separate intention from observed behavior.'},
      {label:'Pitch',title:'Tell a coherent story in five minutes.',body:['The team aligned around the concept and presented a concise pitch. This required communicating the problem, the proposed mechanism and the potential value in five minutes.','The project ended as a developed concept and a pitch.'], take:'Problem, mechanism and value in five minutes.'},
      {label:'Reflection',title:'Run a circle. Then learn.',body:['An appropriate next experiment would be one or two small gatherings with a simple measure of attendance, contribution, satisfaction and interest in returning.','The project reinforced the value of testing the smallest real version of a service before planning an entire community program.'], take:'A pilot tests participation better than a survey alone.'}
    ]
  },
  {
    id:'radio', title:'Radio', ordinal:'05', eyebrow:'Independent iOS experiment / Product delivery', category:'Product execution', year:'2026', status:'Working build, not released', accent:'#e5e5e5', ink:'#161616',
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
      {label:'Delivery',title:'Separate implementation from review.',body:['I directed an AI implementation agent and a separate review agent. The reviewer could identify blocking faults instead of assuming work described as complete was correct.','I remained responsible for product decisions and acceptance. The native iOS code was written by AI agents under my direction.'],take:'Independent review introduced a critical check before acceptance.'},
      {label:'Verification',title:'A physical iPhone changed the result.',body:['The independent audit identified four blocking faults. A subsequent test on a physical iPhone exposed network behavior that did not fail in the simulator.','At handover, the project recorded 24 passing automated tests.'],take:'Real-world verification and automation answer different questions.'},
      {label:'Outcome',title:'A working build, not a released app.',body:['Radio produced a working handover build in an eight-hour exercise, but it was not released or validated with actual listeners.','Before public availability, it would require reliability checks, clear documentation of outstanding faults and evaluation of the listening experience with intended users.'],take:'A functioning prototype is evidence of delivery, not product-market value.'},
      {label:'Reflection',title:'A process I could take into the next project.',body:['The define, build, independently review and test loop became a repeatable way to approach AI-assisted projects. I refined it further when developing Scribe.','The lesson was to make real-user conditions part of acceptance: the device, network, playback and saved state matter more than a passing demo.'],take:'Define, build, review and verify before claiming the product works.'}
    ]
  }
];

export const visualNames = {hiroom:'Booking clarity',scribe:'Meeting, saved',agent:'Guidance, not answers',circles:'Ideas become conversations',radio:'A listening experiment'};
