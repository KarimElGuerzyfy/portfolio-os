import type { ReactNode } from 'react'
import { BookOpen, Wallet, Globe, Braces, type LucideIcon } from 'lucide-react'

export type CaseStudy = {
  id: string
  label: string
  icon: LucideIcon
  group: 'projects' | 'meta'
  title: string
  subtitle: string
  tags: string[]
  sections: { heading: string; body: ReactNode }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'deuka',
    label: 'Deuka',
    icon: BookOpen,
    group: 'projects',
    title: 'Deuka',
    subtitle: 'German vocabulary, built so you can\'t skip ahead · deuka.app',
    tags: ['React', 'Vite', 'TypeScript', 'Supabase', 'Zustand', 'PWA'],
    sections: [
      {
        heading: 'The problem',
        body: (
          <>
            <p>
              The idea arrived when I started learning to code, in February 2026: was
              it possible to build an app that could help me with my German? At the
              time my method was analogue — every morning I wrote ten to twenty new
              words on slips of paper and carried them to work, pulling them out
              through the day. It worked. It also got messy fast: stacks of paper in
              my pocket, pulled out and pushed back until they fell apart.
            </p>
            <p>
              Two weeks into learning to code I built a crude version — 100 words,
              looped through ten at a time. A replacement for the paper slips, nothing
              more. Then came the idea that made it worth building properly: what if
              you had to take an exam, and only <em>passed</em> on a perfect 10/10? I
              showed the draft to friends who were also learning German and they were
              excited by it. So I got to work. It took two more months of learning and
              building other projects to get comfortable with HTML, CSS, JavaScript
              and TypeScript — then I started building Deuka. (Deutsch and Karim.)
            </p>
          </>
        ),
      },
      {
        heading: 'What I built',
        body: (
          <>
            <p>
              Deuka covers A1 through B2 German vocabulary — approximately 4,500 words
              — organised into a three-tier curriculum called the{' '}
              <strong>Centurion System</strong>. Ten words make a <em>bucket</em>, ten
              buckets make a <em>centurion</em>, and centurions make a level: A1 = 700
              words, A2 = 500, B1 = 1,000, B2 = 2,000.
            </p>
            <p>
              Each bucket runs a two-phase loop. In <strong>review</strong>, the user
              works through the ten words one at a time — generate the German word,
              reveal the English or Arabic translation, or reveal an example sentence
              as a contextual hint. No timer; the user sets the pace. Once all ten
              have been seen, the Next button unlocks.
            </p>
            <p>
              Phase two is the <strong>quiz gate</strong>. All ten words appear as
              multiple-choice questions, four options each, with a five-second
              countdown per question that can be disabled in settings. A perfect 10/10
              is required to advance — one wrong answer or one timeout fails the
              attempt and returns the user to review for the same bucket. Attempts are
              unlimited. Completing A1 means passing seventy consecutive perfect
              quizzes.
            </p>
            <p>
              Distractors are selected by semantic and orthographic proximity rather
              than at random: verbs are matched with verbs, words sharing a prefix
              like <code>ver-</code>, <code>be-</code> or <code>ent-</code> are
              matched with each other, and words from the same category are
              prioritised. Questions and answer positions reshuffle on every attempt,
              so passing on a retry means knowing the words rather than the button
              positions.
            </p>
            <p>
              The stack is React and Vite with strict TypeScript — no SSR or SEO
              requirements, so Next.js would have added infrastructure for no benefit.
              Zustand holds all app state as the single source of truth; Supabase
              provides auth, Postgres and Edge Functions with row-level security, and
              is written to only on bucket advancement rather than on every state
              change. Word IDs encode curriculum coordinates — <code>A1-1-1-4</code>{' '}
              is level A1, centurion 1, bucket 1, position 4 — which makes progress
              filtering, quiz construction and bucket-boundary detection string
              operations instead of database joins.
            </p>
            <p>
              Vocabulary ships bundled as TypeScript constants rather than fetched at
              runtime: it&apos;s static curated content, so bundling removes network
              requests and keeps the app usable offline. Two Supabase Edge Functions
              handle privileged operations — account deletion, which needs the service
              role key, and blocking password changes on the public demo account. The
              interface is fully bilingual, English and Arabic with RTL layout
              switching applied before first render, and the whole thing installs as a
              PWA on Android and iOS via vite-plugin-pwa and Workbox. Eighteen Vitest
              unit tests cover the vocabulary service, quiz generation and state. The
              interface was designed by Driss Bourkkadi; I built it from his Figma
              file. Source is on{' '}
              <a
                href="https://github.com/KarimElGuerzyfy/deuka-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </>
        ),
      },
      {
        heading: 'What I learned',
        body: (
          <>
            <p>
              The hardest part wasn&apos;t the code. It was the words. Four and a half
              thousand entries, each needing a correct German word, an English
              translation, an Arabic translation, an example sentence and a category —
              and a single typo in a translation teaches someone the wrong thing.
              There is no test that catches it and no error in the console. I worked
              through the lists with my German teacher, who is also a friend, and
              spent longer on data correctness than on any feature in the app. In a
              learning tool the content <em>is</em> the product; the interface is just
              how you reach it.
            </p>
            <p>
              Late in production I found a behaviour: switching levels in the
              A1/A2/B1/B2 navigation bar reset the user&apos;s bucket position to
              zero. My instinct was to fix it. Then it became clear what fixing it
              meant — tracking progress separately per level, preventing position
              bleed between levels, deciding what &ldquo;current level&rdquo; even
              means when a user has partial progress across several. The complexity
              was real and the benefit was questionable. More importantly, the
              behaviour fit the philosophy of Deuka perfectly. The Centurion System is
              built on the principle that mastery is earned, not navigated. A user who
              switches from A1 to B2 mid-session hasn&apos;t mastered A1 and
              hasn&apos;t earned B2; letting them hold their A1 position while
              exploring B2 would turn a progression system into a word browser. So I
              kept the reset and made it explicit — switching levels now triggers a
              confirmation modal that requires the user to type the target level name
              before proceeding, with an unambiguous warning that all progress on the
              current level will be erased. Three lines of store logic and a modal.
              The alternative, multi-level progress tracking, would have been weeks of
              work for a feature that actively works against what Deuka is trying to
              be.
            </p>
            <p>
              Recognising when a technical behaviour aligns with product intent, and
              choosing to embrace it rather than patch it, is one of the more valuable
              skills in software development. This was one of those moments.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'ledger',
    label: 'Ledger',
    icon: Wallet,
    group: 'projects',
    title: 'Ledger',
    subtitle: 'Full-stack expense tracker · react-ledger-app.vercel.app',
    tags: ['React', 'Vite', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    sections: [
      {
        heading: 'The problem',
        body: (
          <>
            <p>
              Deuka was always the goal. But you don&apos;t build a multi-user app
              with auth, a database and scheduled server jobs as your first real
              project — you build something smaller that forces you to learn the
              same things. Ledger was that. Most people learn by following
              tutorials; I wanted the same practice without someone else&apos;s
              architecture to copy, so I picked a problem I actually had and built
              it my own way.
            </p>
            <p>
              The first version was vanilla JavaScript — DOM manipulation, array
              methods, filter pills, no framework. It taught me the fundamentals
              and then showed me its own ceiling: no accounts, no persistence,
              everything gone on refresh. So I rebuilt it from scratch. Ledger v2
              is the same idea with real authentication, a real Postgres database,
              a structured data model and TypeScript throughout — which is exactly
              the ground I needed to be standing on before starting Deuka.
            </p>
          </>
        ),
      },
      {
        heading: 'What I built',
        body: (
          <>
            <p>
              The organising idea is that <strong>the day is the atomic unit</strong>.
              You log expenses as they happen; weekly, monthly and yearly totals
              are summaries built from closed days rather than separate records.
              Days close at 00:00, weeks close Sunday at 00:00 and are numbered
              1–52, months close at the last second of the month. Weeks and months
              close <em>independently</em> — a month can close mid-week and the
              week keeps accumulating until its own Sunday. Neither ever stores
              expenses directly; both read from closed days.
            </p>
            <p>
              That closing runs on Supabase cron Edge Functions rather than
              client-side checks on page load. A browser tab can&apos;t run code
              when it&apos;s closed, so client-side period closing is unreliable
              and inconsistent between users. The known trade-off is timezones:
              the cron fires at 00:00 UTC and Edge Functions have no per-user
              timezone, so a user in Morocco closes their day at 01:00 local. The
              data stays accurate — only the closing moment drifts. Storing each
              user&apos;s timezone in their profile is the proper fix, and a
              post-launch one.
            </p>
            <p>
              Auth, Postgres and Edge Functions all come from Supabase, with
              row-level security isolating each user&apos;s data at the database
              level rather than in application logic. The dashboard shows the
              current period with a Day/Week/Month/Year filter, and those totals
              are calculated, not hardcoded — a single query pulls every closed day
              from January 1st to yesterday, then week, month and year are filtered
              from that in JavaScript, one round trip instead of three. History
              paginates against the database using the limit + 1 trick: each query
              asks for one more row than it needs, and if the extra row comes back,
              the &ldquo;Show more&rdquo; button appears — no separate count query.
            </p>
            <p>
              Two pieces I&apos;m glad I didn&apos;t shortcut. Inactivity logout is
              a Supabase Pro feature; instead of paying for it I wrote a{' '}
              <code>useInactivityLogout</code> hook that listens for activity
              events, throttles to once every three seconds, registers its
              listeners as passive so it doesn&apos;t block scrolling, and reads
              its timeout from the user&apos;s profile. It&apos;s called once in{' '}
              <code>AppLayout</code>, so every protected page inherits it. And
              account deletion runs as an Edge Function, because{' '}
              <code>auth.admin.deleteUser()</code> needs the service role key and
              can never touch the browser — the function verifies the caller&apos;s
              JWT, then deletes expenses, days, weeks, months, years, profile and
              auth user in that order.
            </p>
            <p>
              The whole thing was built UI-first: types, then routing skeleton,
              then page UI against hardcoded data, then logic, then Supabase
              wiring. Building the frontend fully before connecting the backend
              kept the two from blocking each other and made the component
              structure easier to reason about. The design came from Driss
              Bourkkadi, built from his Figma file.
            </p>
          </>
        ),
      },
      {
        heading: 'What I learned',
        body: (
          <>
            <p>
              Ledger is where TypeScript stopped being a syntax I was typing and
              became something I was using. The data model is genuinely awkward —
              expenses belong to days, days roll up into weeks and months
              independently, both roll up into years — and in v1&apos;s vanilla
              JavaScript that shape lived in my head, where it kept being wrong. In
              v2 every type is declared once in <code>src/types/index.ts</code> and
              the editor holds the model for me. Change a type and TypeScript
              points at every place that has to change with it.
            </p>
            <p>
              It also taught me where a client-side app ends. Almost everything
              that made v2 harder than v1 — closing periods on a schedule,
              deleting an account, isolating one user&apos;s rows from
              another&apos;s — is work the browser structurally cannot do. Not
              harder in the browser: impossible. Learning to recognise that
              boundary, and reaching for a scheduled job or an Edge Function
              instead of trying to be clever in the client, was the actual lesson.
            </p>
            <p>
              And a smaller one that stuck: <code>ExpenseForm</code> takes an{' '}
              <code>ExpenseInput</code>, not a full <code>Expense</code>. The form
              knows three things — description, amount, category. The{' '}
              <code>id</code> and <code>createdAt</code> come back from Supabase on
              insert. Passing a full <code>Expense</code> with a fabricated id
              would have worked and been quietly dishonest about what the component
              actually needs. Types are a description of a contract, and the
              contract should be true.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'dentist',
    label: 'Dentist site',
    icon: Globe,
    group: 'projects',
    title: 'Clinic Fez',
    subtitle: 'Bilingual site for a dental practice · Fès, Morocco',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FR/AR', 'Figma'],
    sections: [
      {
        heading: 'The problem',
        body: (
          <>
            <p>
              After Deuka I wanted a different kind of test: a real client, a real
              business, a site that had to work for people who would never care
              what it was built with. Dr. Amine Marbouh is a dentist and
              orthodontist in Fès. His patients find him on a phone, usually
              one-handed, and they need one of three things — call, directions, or
              an appointment. Everything else on the page is in service of those.
            </p>
            <p>
              The part that made it a graduation project rather than another solo
              build was the scale of it. Driss Bourkkadi designed this one too,
              but where Deuka and Ledger were my own products — my call on what
              the app was for, and a design serving that — this was a real client
              with a real business, and the design was the spec from the start.
              My job was to build it as drawn. That&apos;s the situation every
              professional frontend role actually is.
            </p>
          </>
        ),
      },
      {
        heading: 'What I built',
        body: (
          <>
            <p>
              A statically generated Next.js 14 site on the App Router, TypeScript
              throughout, deployed to Vercel behind a CDN. No database and no
              application state — for a brochure site those would be weight without
              benefit. What matters is that it loads instantly on a mid-range phone
              over Moroccan mobile data, so everything that can be static is
              static, images go through <code>next/image</code>, and fonts load
              through <code>next/font/google</code> rather than a render-blocking
              stylesheet.
            </p>
            <p>
              It ships fully bilingual in French and Arabic, with proper RTL rather
              than a mirrored afterthought. Language lives in a{' '}
              <code>LanguageContext</code> exposing <code>lang</code>,{' '}
              <code>isRTL</code> and <code>toggleLanguage()</code>, so any component
              can read direction without prop drilling. Every piece of client copy
              is keyed by language — name, specialty, address, opening hours,
              services, testimonials, trust messaging — so the two versions
              can&apos;t drift apart. Hind carries the Latin script, Cairo the
              Arabic.
            </p>
            <p>
              Contact is deliberately plural, because different patients reach out
              differently: tap-to-call in the sticky header, a WhatsApp link, a
              Formspree-backed contact form that needs no server of my own, and a
              Google Maps embed with a directions button. The homepage runs
              header, hero with stats, a horizontal services carousel,
              testimonials, contact and footer — with two marquee strips
              (address, accepted insurance) driven by CSS animations defined as
              Tailwind v4 utilities rather than JavaScript.
            </p>
            <p>
              Every colour in the Figma file became a design token in the{' '}
              <code>@theme</code> block — brand navy, accent blue, light
              background, muted grey — and no component hardcodes a hex. If Driss
              revises a colour it changes in one place and the whole site follows.
              The service and testimonial cards are single components rendered from
              arrays, so the layout stays consistent with the design no matter how
              many the client eventually has.
            </p>
            <p>
              The last decision was to make it a template rather than a one-off.
              Every client-specific value — names, phone, WhatsApp, Formspree
              endpoint, address, map URLs, hours, services, reviews — lives in a
              single <code>clinic.config.ts</code> at the project root. Standing up
              the next local business is: duplicate the folder, edit one file, swap
              the images, deploy. The work is done once and the design system
              travels with it.
            </p>
          </>
        ),
      },
      {
        heading: 'What I learned',
        body: (
          <>
            <p>
              Implementing someone else&apos;s design is a skill, and it&apos;s not
              the same skill as having taste. A Figma file is precise about spacing,
              weight and rhythm in ways that are easy to approximate and obvious
              when you don&apos;t — and &ldquo;close enough&rdquo; reads as sloppy
              next to the original. Working to Driss&apos;s files taught me to read a
              design as a specification: measure, match, and raise a question when
              something genuinely doesn&apos;t translate to the browser rather than
              quietly deciding for myself.
            </p>
            <p>
              The questions turned out to be the valuable part. A design is a static
              frame; a site is a live thing that has to handle a long service name,
              a screen size the mock never showed, and the same layout flipped into
              Arabic. Raising those early — here&apos;s what happens to this
              component in RTL, here&apos;s what this card does when the text runs
              two lines longer — is collaboration, where guessing is just a
              deviation nobody agreed to. Building to someone else&apos;s target
              raised the standard I was building to, and it meant all my attention
              went to build quality.
            </p>
            <p>
              It also settled a question about tooling. Deuka and Ledger both use
              Vite, because they&apos;re applications behind a login with no SEO
              requirement. This is the opposite: a local business that lives or dies
              by search, all public pages, no application state. Next.js and static
              generation are exactly right here for the same reasons they&apos;d
              have been overhead there. Choosing the tool that fits the problem is
              worth more than being fluent in one.
            </p>
          </>
        ),
      },
    ],
  },
{
  id: 'driss',
  label: 'Driss portfolio',
  icon: Globe,
  group: 'projects',
  title: 'Driss Bourkkadi',
  subtitle: 'Portfolio for a designer · driss-bourkkadi.vercel.app',
  tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
  sections: [
    {
      heading: 'The problem',
      body: (
        <>
          <p>
            Driss designed Deuka, Ledger and the clinic site. This one runs the
            other way: his portfolio, his design, built by me. It presents his
            case studies — not just websites and apps but product design, label
            design, logos, full company identities — which makes the brief
            unusual. On a normal client site the design serves the content. Here
            the design is the content. The site is a sample of his work
            before a visitor has scrolled to anything, and a layout I approximate
            rather than match undermines the exact thing he&apos;s selling.
          </p>
        </>
      ),
    },
    {
      heading: 'What I built',
      body: (
        <>
          <p>
            Same stack as the clinic site — Next.js on the App Router, TypeScript
            throughout, Tailwind, static, deployed to Vercel — and a completely
            different design, so nothing carried over but the toolchain. Single
            language, no RTL, no forms: the whole job is presenting work at high
            fidelity and getting out of the way.
          </p>
          <p>
            The hard part was responsive. Driss&apos;s layouts interleave images
            and text in arrangements that are specific on purpose — a piece
            sitting at a particular size next to a particular block of copy, with
            the relationship between them doing the work. That&apos;s
            straightforward at the width it was drawn for and brutal everywhere
            else. Every one of those compositions needed a decision at phone,
            tablet and desktop: which element leads when they stack, what the
            image does when the column narrows, whether a pairing that reads as
            deliberate side by side still reads that way stacked, or whether it
            needs different proportions to survive the change. Getting each
            breakpoint to feel designed rather than reflowed was most of the
            build.
          </p>
        </>
      ),
    },
    {
      heading: 'What I learned',
      body: (
        <>
          <p>
            A design file shows you one width. Every other width is a decision
            somebody has to make, and if the developer makes it silently, they
            have designed part of the site. On the clinic build I learned to read
            a Figma file as a specification; here I learned where the
            specification stops — and that the honest move is to name those gaps
            and take them back to the designer rather than resolve them alone.
            Most of my useful messages to Driss on this project were some version
            of &ldquo;this pairing doesn&apos;t hold at 390px, here are two ways
            it could go.&rdquo;
          </p>
          <p>
            It also mattered whose work it was. On a client site a slightly loose
            margin is a small flaw. On a designer&apos;s portfolio it is a claim
            about their standards, made in public, in my code. Building something
            for the person whose designs I build from raised the bar in a way
            I&apos;d recommend to anyone — you review your own output differently
            when the audience is the one person who will notice everything.
          </p>
        </>
      ),
    },
  ],
},
{
  id: 'skills',
  label: 'Skills',
  icon: Braces,
  group: 'meta',
  title: 'Skills',
  subtitle: 'What I work with, and how',
  tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  sections: [
    {
      heading: 'Overview',
      body: (
        <>
          <p>
            The stack is in the tags above every case study, so rather than
            repeat it: React and TypeScript are the constant, and everything
            around them is a choice I make per project. Deuka and Ledger run on
            Vite because they&apos;re applications behind a login — no public
            pages, nothing to index, so Next.js would have been infrastructure
            paying for itself in nothing. The clinic site and Driss&apos;s
            portfolio run on Next.js and static generation because they&apos;re
            the opposite: all public, search matters, no application state. Same
            reasoning both times, opposite conclusions. That&apos;s the part I
            care about more than the list — knowing why a tool fits, and being
            willing to not use the one I&apos;m most comfortable with.
          </p>
          <p>
            Supabase covers the backend I need: Postgres with row-level security,
            auth, and Edge Functions for the work a browser structurally
            can&apos;t do — closing accounting periods on a schedule, deleting an
            account with the service role key, blocking a privileged action
            server-side rather than hiding the button. Recognising where the
            client ends and the server has to start is a lesson every one of
            these projects taught me, usually the hard way.
          </p>
          <p>
            How I work: types first, then a routing skeleton, then UI against
            fake data, then logic, then the backend wiring. Building the frontend
            fully before connecting anything real keeps the two from blocking
            each other and makes the component structure easier to reason about.
            I discuss architecture before writing code, because the expensive
            mistakes are structural and they&apos;re cheap to catch in a
            conversation. When I work from a designer&apos;s file I treat it as a
            specification — measure and match, and when something genuinely
            doesn&apos;t translate to the browser, raise it rather than decide
            quietly. I use AI as part of the workflow, the way I use any other
            tool that makes me faster; the output is mine and so is
            responsibility for its quality.
          </p>
          <p>
            Where I actually am: I started writing code in February 2026, and
            everything here was built since. I&apos;m strong on frontend
            architecture, TypeScript, and the Supabase-shaped slice of backend —
            schema design, RLS, Edge Functions, auth flows. I&apos;ve written
            unit tests but not integration or end-to-end suites, I haven&apos;t
            set up CI beyond Vercel&apos;s deploy pipeline, and I haven&apos;t
            worked in a large team codebase or a code review process — which is
            precisely what I want next. I&apos;d rather say that plainly than
            imply even depth across a list of logos.
          </p>
        </>
      ),
    },
  ],
},
]