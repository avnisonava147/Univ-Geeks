(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,58274,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(22016);let n=(e,t)=>({name:e,role:t,initials:e.split(" ").map(e=>e[0]).slice(0,2).join("").toUpperCase()}),o=n("Himanshu Shekhawat","Founder"),i=[{id:"tech",name:"Tech Team",icon:"💻",description:"Building and improving the UnivGeeks platform.",color:"#2563eb",members:[n("Anshuman Ojha","Tech Team"),n("Avni Sonava","Tech Team"),n("Kapil Saini","Tech Team"),n("Navya Bhawsar","Tech Team"),n("Himesh Vaishnav","Tech Team"),n("Mohit Suthar","Tech Team"),n("Shivani Gehlot","Tech Team")]},{id:"notes",name:"Notes Team",icon:"📚",description:"Making study material easier to access.",color:"#059669",members:[n("Sonu Regar","Notes Team"),n("Ritul Verma","Notes Team"),n("Rakshit Kaler","Notes Team")]},{id:"media",name:"Media Team",icon:"🎨",description:"Bringing ideas to life through creative content.",color:"#db2777",members:[n("Lakshay Hada","Media Team"),n("Mohammad Maquil","Media Team"),n("Vanshika Joshi","Media Team"),n("Shivraj Katariya","Media Team"),n("Amit Choudhary","Media Team"),n("Omprakash Jaat","Media Team"),n("Devansh Khandelwal","Media Team")]},{id:"core",name:"Core Team",icon:"⚡",description:"Coordinating people, ideas and community activities.",color:"#7c3aed",members:[n("Jyoti Shekhawat","Core Team"),n("Aayu Daukiva","Core Team"),n("Varaha Bohra","Core Team"),n("Dilkhush Khoja","Core Team"),n("Yashvardhan Singh Rathore","Core Team"),n("Arush Kumar Bhardwaj","Core Team"),n("Saumy Sharma","Core Team"),n("Vishnu Sharma","Core Team")]}],s=i.reduce((e,t)=>e+t.members.length,0);function l({children:e,delay:a=0,className:n=""}){let o=(0,r.useRef)(null),[i,s]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let e=o.current;if(!e)return;let t=new IntersectionObserver(([e])=>{e.isIntersecting&&(s(!0),t.unobserve(e.target))},{threshold:.12});return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)("div",{ref:o,className:`team-reveal ${i?"team-reveal-visible":""} ${n}`,style:{transitionDelay:`${a}ms`},children:e})}function c({member:e,color:r,index:a}){return(0,t.jsx)(l,{delay:a%4*90,children:(0,t.jsxs)("article",{className:"member-card",style:{"--member-color":r},children:[(0,t.jsx)("div",{className:"member-avatar",children:e.initials}),(0,t.jsx)("h3",{children:e.name}),(0,t.jsx)("p",{children:e.role}),(0,t.jsx)("div",{className:"member-underline"})]})})}e.s(["default",0,function(){let[e,n]=(0,r.useState)("all"),[d,m]=(0,r.useState)(""),f=i.filter(t=>"all"===e||t.id===e).map(e=>({...e,members:e.members.filter(e=>`${e.name} ${e.role}`.toLowerCase().includes(d.toLowerCase().trim()))})).filter(e=>e.members.length>0);return(0,t.jsxs)("main",{className:"teams-page",children:[(0,t.jsx)("style",{children:`
        .teams-page {
          min-height: 100vh;
          background: #ffffff;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
        }

        .teams-page * { box-sizing: border-box; }
        .teams-page a { text-decoration: none; }

        .team-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 7%;
          border-bottom: 1px solid #e8edf5;
          background: #ffffff;
        }

        .team-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #172033;
          letter-spacing: -.7px;
        }

        .team-logo span { color: #2563eb; }

        .team-nav-links {
          display: flex;
          align-items: center;
          gap: 27px;
        }

        .team-nav-links a {
          color: #475569;
          font-size: .95rem;
          transition: color .25s ease;
        }

        .team-nav-links a:hover,
        .team-nav-links .current {
          color: #2563eb;
        }

        .team-hero {
          position: relative;
          isolation: isolate;
          padding: 95px 20px 65px;
          text-align: center;
          background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
        }

        .team-hero::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          left: calc(50% - 180px);
          width: 360px;
          height: 260px;
          border-radius: 50%;
          background: #60a5fa30;
          filter: blur(80px);
          animation: teamGlow 5s ease-in-out infinite alternate;
        }

        .team-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          border: 1px solid #bfdbfe;
          border-radius: 50px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: 1px;
          animation: teamFadeDown .7s ease both;
        }

        .team-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2563eb;
        }

        .team-hero h1 {
          margin: 24px 0 16px;
          font-size: clamp(2.7rem, 7vw, 5rem);
          line-height: 1.1;
          letter-spacing: -2px;
          color: #111827;
          animation: teamFadeUp .8s .1s ease both;
        }

        .team-gradient {
          color: #2563eb;
        }

        .team-hero > p {
          max-width: 660px;
          margin: 0 auto;
          color: #64748b;
          font-size: 1.05rem;
          line-height: 1.8;
          animation: teamFadeUp .8s .2s ease both;
        }

        .team-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 28px;
          animation: teamFadeUp .8s .3s ease both;
        }

        .team-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 21px;
          border: 1px solid transparent;
          border-radius: 9px;
          font-size: .93rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform .25s ease, background .25s ease,
            box-shadow .25s ease;
        }

        .team-btn:hover { transform: translateY(-3px); }

        .team-btn-primary {
          background: #2563eb;
          color: #ffffff !important;
          box-shadow: 0 5px 15px #2563eb20;
        }

        .team-btn-primary:hover {
          background: #1d4ed8;
          box-shadow: 0 8px 22px #2563eb35;
        }

        .team-btn-secondary {
          border-color: #cbd5e1;
          background: #ffffff;
          color: #334155 !important;
        }

        .team-btn-secondary:hover { background: #f8fafc; }

        .team-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 720px;
          margin: 45px auto 0;
          border: 1px solid #dbeafe;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 8px 30px #1e40af0a;
          animation: teamFadeUp .8s .4s ease both;
        }

        .team-stat { padding: 21px 10px; }

        .team-stat + .team-stat {
          border-left: 1px solid #e2e8f0;
        }

        .team-stat strong {
          display: block;
          color: #2563eb;
          font-size: 2rem;
          font-weight: 800;
        }

        .team-stat span {
          display: block;
          margin-top: 5px;
          color: #64748b;
          font-size: .86rem;
        }

        .teams-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 25px 85px;
        }

        .team-section-heading {
          margin: 50px 0 30px;
          text-align: center;
        }

        .team-section-kicker {
          color: #2563eb;
          font-size: .8rem;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .team-section-heading h2 {
          margin: 12px 0;
          color: #111827;
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -1px;
        }

        .team-section-heading p {
          max-width: 620px;
          margin: 0 auto;
          color: #64748b;
          line-height: 1.8;
        }

        .founder-wrap {
          max-width: 480px;
          margin: 0 auto 70px;
        }

        .founder-card {
          padding: 30px 24px;
          border: 1px solid #bfdbfe;
          border-radius: 16px;
          background: linear-gradient(145deg, #ffffff, #eff6ff);
          text-align: center;
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .founder-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px #2563eb14;
        }

        .founder-label {
          display: inline-block;
          padding: 7px 13px;
          border-radius: 50px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: .78rem;
          font-weight: 800;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        .founder-avatar {
          display: grid;
          place-items: center;
          width: 88px;
          height: 88px;
          margin: 20px auto;
          border: 3px solid #bfdbfe;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #60a5fa);
          color: #ffffff;
          font-size: 1.7rem;
          font-weight: 800;
          box-shadow: 0 5px 18px #2563eb25;
        }

        .founder-card h3 {
          margin: 0 0 8px;
          color: #172033;
          font-size: 1.4rem;
        }

        .founder-card p {
          margin: 0;
          color: #64748b;
        }

        .team-tools {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 30px;
        }

        .team-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .team-filter {
          padding: 9px 15px;
          border: 1px solid #dbe3ef;
          border-radius: 50px;
          background: #ffffff;
          color: #475569;
          font-size: .88rem;
          cursor: pointer;
          transition: all .2s ease;
        }

        .team-filter:hover {
          border-color: #93c5fd;
          color: #2563eb;
        }

        .team-filter.active {
          border-color: #2563eb;
          background: #2563eb;
          color: #ffffff;
        }

        .team-search {
          width: 250px;
          max-width: 100%;
          padding: 11px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          outline: none;
          background: #ffffff;
          color: #172033;
          font-size: .9rem;
        }

        .team-search::placeholder { color: #94a3b8; }

        .team-search:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px #dbeafe;
        }

        .team-group {
          margin-top: 42px;
          scroll-margin-top: 25px;
        }

        .team-group-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .team-icon {
          display: grid;
          place-items: center;
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #f8fafc;
          font-size: 1.4rem;
        }

        .team-group-header h3 {
          margin: 0 0 5px;
          color: #172033;
          font-size: 1.4rem;
        }

        .team-group-header p {
          margin: 0;
          color: #64748b;
          font-size: .91rem;
          line-height: 1.6;
        }

        .member-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
        }

        .member-card {
          position: relative;
          height: 100%;
          min-height: 190px;
          overflow: hidden;
          padding: 24px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
          text-align: center;
          transition: transform .28s ease, border-color .28s ease,
            box-shadow .28s ease;
        }

        .member-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--member-color);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .3s ease;
        }

        .member-card:hover {
          transform: translateY(-5px);
          border-color: #bfdbfe;
          box-shadow: 0 12px 28px #1e40af0d;
        }

        .member-card:hover::before { transform: scaleX(1); }

        .member-avatar {
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          border: 1px solid #dbeafe;
          border-radius: 50%;
          background: #eff6ff;
          color: var(--member-color);
          font-size: 1rem;
          font-weight: 800;
          transition: transform .25s ease;
        }

        .member-card:hover .member-avatar {
          transform: scale(1.06);
        }

        .member-card h3 {
          margin: 0 0 8px;
          color: #172033;
          font-size: 1rem;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .member-card p {
          margin: 0;
          color: #64748b;
          font-size: .84rem;
        }

        .member-underline {
          width: 28px;
          height: 3px;
          margin: 17px auto 0;
          border-radius: 50px;
          background: var(--member-color);
          opacity: .7;
        }

        .team-empty {
          padding: 35px 20px;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          color: #64748b;
          text-align: center;
        }

        .team-cta {
          margin-top: 80px;
          padding: 48px 24px;
          border: 1px solid #bfdbfe;
          border-radius: 17px;
          background: linear-gradient(135deg, #eff6ff, #ffffff);
          text-align: center;
        }

        .team-cta h2 {
          margin: 12px 0;
          color: #172033;
          font-size: clamp(1.9rem, 4vw, 2.7rem);
        }

        .team-cta p {
          max-width: 620px;
          margin: 0 auto;
          color: #64748b;
          line-height: 1.8;
        }

        .team-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
          padding: 25px 7%;
          border-top: 1px solid #e8edf5;
          background: #ffffff;
          color: #64748b;
          font-size: .87rem;
        }

        .team-footer .team-logo { font-size: 1.3rem; }

        .team-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .team-footer-links a:hover { color: #2563eb; }

        /* About Us-style reveal animations */
        .team-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .7s ease, transform .7s ease;
        }

        .team-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes teamFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes teamFadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes teamGlow {
          from { opacity: .45; transform: scale(.9); }
          to { opacity: 1; transform: scale(1.08); }
        }

        @media (max-width: 900px) {
          .member-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .team-navbar { padding-right: 5%; padding-left: 5%; }
          .teams-content { padding-right: 5%; padding-left: 5%; }
        }

        @media (max-width: 640px) {
          .team-navbar { padding: 17px 5%; }
          .team-logo { font-size: 1.2rem; }
          .team-nav-links { gap: 14px; font-size: .83rem; }
          .team-hero { padding: 70px 17px 50px; }
          .team-hero h1 { letter-spacing: -1.3px; }
          .team-hero > p { font-size: .97rem; }
          .team-stat { padding: 17px 5px; }
          .team-stat strong { font-size: 1.65rem; }
          .team-stat span { font-size: .73rem; }
          .teams-content { padding: 12px 16px 55px; }
          .team-tools { align-items: stretch; }
          .team-search { width: 100%; }
          .member-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
          .member-card { min-height: 180px; padding: 20px 9px; }
          .team-filter { padding: 8px 11px; font-size: .81rem; }
          .team-cta { margin-top: 55px; padding: 36px 17px; }
          .team-footer { flex-direction: column; text-align: center; }
        }

        @media (max-width: 360px) {
          .team-nav-links { gap: 9px; font-size: .77rem; }
          .member-grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .teams-page *, .teams-page *::before, .teams-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }

          .team-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}),(0,t.jsxs)("nav",{className:"team-navbar",children:[(0,t.jsxs)(a.default,{href:"/",className:"team-logo",children:["Univ",(0,t.jsx)("span",{children:"Geeks"})]}),(0,t.jsxs)("div",{className:"team-nav-links",children:[(0,t.jsx)(a.default,{href:"/",children:"Home"}),(0,t.jsx)(a.default,{href:"/about",children:"About"}),(0,t.jsx)(a.default,{href:"/team",className:"current",children:"Team"}),(0,t.jsx)(a.default,{href:"/contact",children:"Contact"})]})]}),(0,t.jsxs)("section",{className:"team-hero",children:[(0,t.jsxs)("div",{className:"team-eyebrow",children:[(0,t.jsx)("span",{className:"team-eyebrow-dot"}),"THE PEOPLE BEHIND UNIVGEEKS"]}),(0,t.jsxs)("h1",{children:["Meet the ",(0,t.jsx)("span",{className:"team-gradient",children:"Team"})]}),(0,t.jsx)("p",{children:"Meet the passionate people working behind UnivGeeks to make learning resources more accessible and the student community stronger."}),(0,t.jsx)("div",{className:"team-actions",children:(0,t.jsx)("a",{href:"#our-teams",className:"team-btn team-btn-primary",children:"Explore Our Teams ↓"})}),(0,t.jsxs)("div",{className:"team-stats",children:[(0,t.jsxs)("div",{className:"team-stat",children:[(0,t.jsxs)("strong",{children:[s,"+"]}),(0,t.jsx)("span",{children:"Team Members"})]}),(0,t.jsxs)("div",{className:"team-stat",children:[(0,t.jsx)("strong",{children:i.length}),(0,t.jsx)("span",{children:"Teams"})]}),(0,t.jsxs)("div",{className:"team-stat",children:[(0,t.jsx)("strong",{children:"1"}),(0,t.jsx)("span",{children:"One Community"})]})]})]}),(0,t.jsxs)("div",{className:"teams-content",children:[(0,t.jsx)(l,{children:(0,t.jsxs)("div",{className:"team-section-heading",children:[(0,t.jsx)("div",{className:"team-section-kicker",children:"Leadership"}),(0,t.jsxs)("h2",{children:["The ",(0,t.jsx)("span",{className:"team-gradient",children:"Founder"})]}),(0,t.jsx)("p",{children:"The person whose vision helped bring the UnivGeeks community to life."})]})}),(0,t.jsx)("div",{className:"founder-wrap",children:(0,t.jsx)(l,{delay:100,children:(0,t.jsxs)("article",{className:"founder-card",children:[(0,t.jsx)("div",{className:"founder-label",children:"✦ Founder"}),(0,t.jsx)("div",{className:"founder-avatar",children:o.initials}),(0,t.jsx)("h3",{children:o.name}),(0,t.jsxs)("p",{children:[o.role," · UnivGeeks"]})]})})}),(0,t.jsxs)("section",{id:"our-teams",children:[(0,t.jsx)(l,{children:(0,t.jsxs)("div",{className:"team-section-heading",children:[(0,t.jsx)("div",{className:"team-section-kicker",children:"Meet The People"}),(0,t.jsxs)("h2",{children:["Our ",(0,t.jsx)("span",{className:"team-gradient",children:"Teams"})]}),(0,t.jsx)("p",{children:"Different skills, one shared goal. Meet the people contributing to the UnivGeeks community."})]})}),(0,t.jsxs)("div",{className:"team-tools",children:[(0,t.jsx)("div",{className:"team-filters",children:[{id:"all",label:"All Teams"},{id:"tech",label:"Tech"},{id:"notes",label:"Notes"},{id:"media",label:"Media"},{id:"core",label:"Core"}].map(r=>(0,t.jsx)("button",{type:"button",className:`team-filter ${e===r.id?"active":""}`,onClick:()=>n(r.id),children:r.label},r.id))}),(0,t.jsx)("input",{type:"search",className:"team-search",placeholder:"Search team members...","aria-label":"Search team members",value:d,onChange:e=>m(e.target.value)})]}),f.length>0?f.map(e=>(0,t.jsxs)("section",{className:"team-group",children:[(0,t.jsx)(l,{children:(0,t.jsxs)("div",{className:"team-group-header",children:[(0,t.jsx)("div",{className:"team-icon",children:e.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{children:e.name}),(0,t.jsx)("p",{children:e.description})]})]})}),(0,t.jsx)("div",{className:"member-grid",children:e.members.map((r,a)=>(0,t.jsx)(c,{member:r,color:e.color,index:a},r.name))})]},e.id)):(0,t.jsx)("div",{className:"team-empty",children:"No team members found. Try a different name or filter."})]}),(0,t.jsx)(l,{children:(0,t.jsxs)("section",{className:"team-cta",children:[(0,t.jsx)("div",{className:"team-section-kicker",children:"Be Part Of Something"}),(0,t.jsxs)("h2",{children:["Grow with ",(0,t.jsx)("span",{className:"team-gradient",children:"UnivGeeks"})]}),(0,t.jsx)("p",{children:"Have an idea or a skill to share? Connect with the community and help make learning better for students."}),(0,t.jsx)("div",{className:"team-actions",children:(0,t.jsx)(a.default,{href:"/contact",className:"team-btn team-btn-secondary",children:"Contact Us →"})})]})})]}),(0,t.jsxs)("footer",{className:"team-footer",children:[(0,t.jsxs)(a.default,{href:"/",className:"team-logo",children:["Univ",(0,t.jsx)("span",{children:"Geeks"})]}),(0,t.jsx)("span",{children:"Made with ♥ for students, by students."}),(0,t.jsxs)("div",{className:"team-footer-links",children:[(0,t.jsx)(a.default,{href:"/",children:"Home"}),(0,t.jsx)(a.default,{href:"/about",children:"About"}),(0,t.jsx)(a.default,{href:"/contact",children:"Contact"})]})]})]})}])},22016,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return g},useLinkStatus:function(){return v}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=e.r(90809),i=e.r(43476),s=o._(e.r(71645)),l=e.r(95057),c=e.r(8372),d=e.r(18581),m=e.r(18967),f=e.r(5550),p=e.r(88540),u=e.r(91949),h=e.r(73668),x=e.r(9396);function g(t){var r;let a,n,o,[g,v]=(0,s.useOptimistic)(u.IDLE_LINK_STATUS),y=(0,s.useRef)(null),{href:j,as:w,children:k,prefetch:T=null,passHref:N,replace:S,shallow:C,scroll:P,onClick:E,onMouseEnter:O,onTouchStart:z,legacyBehavior:M=!1,onNavigate:_,transitionTypes:U,ref:R,unstable_dynamicOnHover:A,...L}=t;a=k,M&&("string"==typeof a||"number"==typeof a)&&(a=(0,i.jsx)("a",{children:a}));let $=s.default.useContext(c.AppRouterContext),F=!1!==T,I=!1===T?"none":!0===T?"full":"auto",B="none"!==I?"auto"===I?x.FetchStrategy.PPR:x.FetchStrategy.Full:x.FetchStrategy.PPR,D="string"==typeof(r=w||j)?r:(0,l.formatUrl)(r);if(M){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=s.default.Children.only(a)}let K=M?n&&"object"==typeof n&&n.ref:R,G,Y=s.default.useCallback(e=>(null!==$&&(y.current=(0,u.mountLinkInstance)(e,D,$,B,F,v,G)),()=>{y.current&&((0,u.unmountLinkForCurrentNavigation)(y.current),y.current=null),(0,u.unmountPrefetchableInstance)(e)}),[F,D,$,B,v,G]),H={ref:(0,d.useMergedRef)(Y,K),onClick(t){M||"function"!=typeof E||E(t),M&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!$||t.defaultPrevented||function(t,r,a,n,o,i,l,c="none"){if("u">typeof window){let d,{nodeName:m}=t.currentTarget;if("A"===m.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){n&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(99781);s.default.startTransition(()=>{f(r,n?"replace":"push",!1===o?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,a.current,l,c)})}}(t,D,y,S,P,_,U,I)},onMouseEnter(e){M||"function"!=typeof O||O(e),M&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),$&&F&&(0,u.onNavigationIntent)(e.currentTarget,!0===A)},onTouchStart:function(e){M||"function"!=typeof z||z(e),M&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),$&&F&&(0,u.onNavigationIntent)(e.currentTarget,!0===A)}};return(0,m.isAbsoluteUrl)(D)?H.href=D:M&&!N&&("a"!==n.type||"href"in n.props)||(H.href=(0,f.addBasePath)(D)),o=M?s.default.cloneElement(n,H):(0,i.jsx)("a",{...L,...H,children:a}),(0,i.jsx)(b.Provider,{value:g,children:o})}let b=(0,s.createContext)(u.IDLE_LINK_STATUS),v=()=>(0,s.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let a=e.r(71645);function n(e,t){let r=(0,a.useRef)(null),n=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=o(e,a)),t&&(n.current=o(t,a))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let a=e.r(18967),n=e.r(52817);function o(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={assign:function(){return l},searchParamsToUrlQuery:function(){return o},urlQueryToSearchParams:function(){return s}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});function o(e){let t={};for(let[r,a]of e.entries()){let e=t[r];void 0===e?t[r]=a:Array.isArray(e)?e.push(a):t[r]=[e,a]}return t}function i(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,a]of Object.entries(e))if(Array.isArray(a))for(let e of a)t.append(r,i(e));else t.set(r,i(a));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,a]of r.entries())e.append(t,a)}return e}},95057,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return s},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,a=e.protocol||"",n=e.pathname||"",s=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(o.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||i.test(a))&&!1!==c?(c="//"+(c||""),n&&"/"!==n[0]&&(n="/"+n)):c||(c=""),s&&"#"!==s[0]&&(s="#"+s),d&&"?"!==d[0]&&(d="?"+d),n=n.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${a}${c}${n}${d}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return s(e)}},18967,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var a={DecodeError:function(){return g},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return y},NormalizeError:function(){return b},PageNotFoundError:function(){return v},SP:function(){return h},ST:function(){return x},WEB_VITALS:function(){return o},execOnce:function(){return i},getDisplayName:function(){return m},getLocationOrigin:function(){return c},getURL:function(){return d},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return u},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return w}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...a)=>(r||(r=!0,t=e(...a)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function d(){let{href:e}=window.location,t=c();return e.substring(t.length)}function m(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function u(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await u(t.Component,t.ctx)}:{};let a=await e.getInitialProps(t);if(r&&f(r))return a;if(!a)throw Object.defineProperty(Error(`"${m(e)}.getInitialProps()" should resolve to an object. But found "${a}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return a}let h="u">typeof performance,x=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class b extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class y extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}}]);