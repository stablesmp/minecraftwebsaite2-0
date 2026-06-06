
import React, { useEffect, useRef } from 'react';
import htm from 'htm';
import { Logo } from './Logo.js';
import { FEATURES } from './constants.js';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

const HERO_IMAGE = './hero.png';

// Placeholder image for the split-card (replace with your own later)
const CARD_IMAGE = './heroz.png';

export const Home = ({ onNavigate }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const copyIp = () => {
    alert('Server IP is not available yet.');
  };

  return html`
    <div>

      <!-- ── Hero Image with white fade ── -->
      <div className="relative w-full h-64 md:h-[440px] overflow-hidden mt-[64px]">
        <img
          src=${HERO_IMAGE}
          className="w-full h-full object-cover object-center"
          alt="Server landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white"></div>
        <!-- Icon overlaid on hero image -->
        <div className="absolute animate-float z-10 w-56 h-56 md:w-80 md:h-80" style=${{ top: '38%', left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto', transform: 'translateY(-50%)' }}>
          <svg width="100%" viewBox="0 0 680 680" role="img" xmlns="http://www.w3.org/2000/svg">
            <defs><clipPath id="face-clip"><rect x="233" y="160" width="214" height="210"/></clipPath></defs>
            <rect x="200" y="120" width="280" height="280" rx="16" fill="#1a1008" opacity="0.35"/>
            <line x1="100" y1="252" x2="450" y2="238" stroke="#8B4513" stroke-width="12" stroke-linecap="round"/>
            <line x1="130" y1="250" x2="450" y2="238" stroke="#A0550A" stroke-width="3" opacity="0.4"/>
            <polygon points="100,252 115,238 108,258" fill="#CC3333"/>
            <polygon points="100,252 112,268 108,250" fill="#993333"/>
            <polygon points="100,252 95,238 105,242" fill="#CC4444"/>
            <line x1="450" y1="238" x2="580" y2="227" stroke="#8B4513" stroke-width="12" stroke-linecap="round"/>
            <line x1="452" y1="238" x2="555" y2="228" stroke="#A0550A" stroke-width="3" opacity="0.4"/>
            <polygon points="580,227 555,218 562,232" fill="#C0C0C0"/>
            <polygon points="580,227 555,236 562,222" fill="#A0A0A0"/>
            <rect x="260" y="40" width="160" height="30" fill="#5C3317"/>
            <rect x="230" y="70" width="220" height="30" fill="#5C3317"/>
            <rect x="230" y="100" width="220" height="30" fill="#5C3317"/>
            <rect x="230" y="130" width="60" height="30" fill="#5C3317"/>
            <rect x="290" y="130" width="100" height="30" fill="#C68642"/>
            <rect x="390" y="130" width="60" height="30" fill="#5C3317"/>
            <rect x="230" y="160" width="220" height="30" fill="#C68642"/>
            <rect x="230" y="190" width="220" height="30" fill="#C68642"/>
            <rect x="230" y="220" width="220" height="30" fill="#C68642"/>
            <rect x="230" y="250" width="220" height="30" fill="#C68642"/>
            <rect x="230" y="280" width="220" height="30" fill="#C68642"/>
            <rect x="230" y="310" width="220" height="30" fill="#C68642"/>
            <rect x="290" y="340" width="100" height="30" fill="#C68642"/>
            <g clip-path="url(#face-clip)">
              <line x1="268" y1="218" x2="312" y2="252" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
              <line x1="312" y1="218" x2="268" y2="252" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
              <line x1="368" y1="218" x2="412" y2="252" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
              <line x1="412" y1="218" x2="368" y2="252" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
            </g>
            <rect x="320" y="260" width="30" height="20" fill="#A0622A"/>
            <rect x="275" y="300" width="30" height="15" fill="#3a1a08"/>
            <rect x="305" y="310" width="70" height="10" fill="#3a1a08"/>
            <rect x="375" y="300" width="30" height="15" fill="#3a1a08"/>
            <text x="340" y="440" text-anchor="middle" font-family="'Courier New', monospace" font-size="48" font-weight="700" fill="#C68642" letter-spacing="4">HEADBOUND</text>
            <text x="340" y="468" text-anchor="middle" font-family="'Courier New', monospace" font-size="18" font-weight="400" fill="#8B5A2B" letter-spacing="6">MINECRAFT SERVER</text>
          </svg>
        </div>
      </div>

      <!-- ── Hero Text ── -->
      <section className="relative px-6 pb-20 -mt-8">
        <div className="text-center max-w-4xl mx-auto reveal">
          <${Logo} size="lg" className="mb-6 justify-center" />
          <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Fight, steal, build, and survive. A raw PvP world for 30–50 players who actually get to know each other.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick=${() => onNavigate('application')}
              className="group px-16 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:-translate-y-1 w-full sm:w-auto"
            >
              APPLY NOW
            </button>
          </div>
        </div>

        <!-- Server Stats -->
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-gray-100 pt-12 w-full max-w-4xl mx-auto reveal">
          <div className="space-y-1 transition-transform hover:scale-105 duration-300 cursor-default flex flex-col items-center">
            <div className="text-5xl font-black text-blue-500">13</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold mt-2">Members</div>
          </div>
          <div
            className="group space-y-1 transition-transform hover:scale-105 duration-300 cursor-pointer flex flex-col items-center"
            onClick=${copyIp}
            title="Click to copy IP"
          >
            <div className="text-2xl font-black text-gray-900 py-1 group-hover:text-blue-600 transition-colors uppercase">Not Available Yet</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold group-hover:text-blue-500">Server IP · Coming Soon</div>
          </div>
          <div className="space-y-1 transition-transform hover:scale-105 duration-300 cursor-default flex flex-col items-center">
            <div className="text-5xl font-black text-gray-900">1.21.11</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold">Version</div>
          </div>
        </div>
      </section>

      <!-- ── Features Grid ── -->
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl font-black mb-4 text-gray-900 uppercase tracking-tight">Why Headbound SMP?</h2>
            <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Small server, real stakes. PvP is live, stealing is fair game — but your builds will never be touched.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${FEATURES.map((feature, idx) => {
              const Icon = Lucide[feature.icon];
              const isLocked = false;
              return html`
                <div
                  key=${idx}
                  className="reveal relative bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 shine-effect group overflow-hidden"
                  style=${{ transitionDelay: idx * 100 + 'ms' }}
                >
                  ${isLocked && html`
                    <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/60 rounded-2xl flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-gray-100 rounded-2xl">
                        <${Lucide.Lock} className="w-8 h-8 text-gray-500" />
                      </div>
                      <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Coming Soon</p>
                    </div>
                  `}
                  <div className="mb-6 p-4 bg-blue-50 rounded-2xl w-fit group-hover:bg-blue-100 transition-colors duration-500">
                    <div className="text-blue-600 transition-transform duration-500 group-hover:rotate-6">
                      <${Icon} className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-3 uppercase tracking-wide">${feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium">${feature.description}</p>
                </div>
              `;
            })}
          </div>
        </div>
      </section>

      <!-- ── Split Card ── -->
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto reveal">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[460px]">

            <!-- Left: Image -->
            <div className="w-full md:w-1/2 relative min-h-[260px]">
              <img
                src=${CARD_IMAGE}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Our world"
              />
              <!-- Subtle dark overlay so text on top pops if needed -->
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
            </div>

            <!-- Right: Text -->
            <div className="w-full md:w-1/2 p-12 md:p-14 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4 leading-tight">
                A New World<br/>Awaits...🗡️
              </h2>

              <p className="text-gray-500 leading-relaxed mb-3 text-[15px]">
                On <strong className="text-gray-800">31 June at 19:00</strong>, a new chapter begins.
              </p>

              <p className="text-gray-500 leading-relaxed mb-3 text-sm">
                A fresh world. New alliances. New rivalries. New stories waiting to be written.
              </p>

              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Gather your friends, prepare your plans, and get ready to leave your mark on the server. Everything starts from day one — what happens next is up to the players.
              </p>

              <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl mb-6 w-fit">
                <${Lucide.CalendarDays} className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Launch: 31 June • 19:00</span>
              </div>

              <p className="text-gray-400 text-sm font-medium italic">
                Good luck. You'll need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CTA ── -->
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-blue-600 p-16 rounded-[2.5rem] text-center reveal shadow-xl shadow-blue-600/20">
          <h2 className="text-4xl font-black mb-4 text-white uppercase tracking-tight">Start Your Adventure</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Think you've got what it takes? Apply for a spot among 30–50 players.
          </p>
          <button
            onClick=${() => onNavigate('application')}
            className="px-16 py-5 bg-white hover:bg-blue-50 text-blue-700 rounded-2xl font-black text-xl transition-all duration-300 shadow-md hover:-translate-y-1"
          >
            START APPLICATION
          </button>
        </div>
      </section>

      <!-- Hidden admin trigger -->
      <div
        onClick=${() => onNavigate('admin')}
        className="fixed bottom-2 right-2 w-10 h-10 cursor-default opacity-0 hover:opacity-5 transition-opacity z-[100]"
      ></div>
    </div>
  `;
};
