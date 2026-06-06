
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
      </div>

      <!-- ── Hero Text ── -->
      <section className="relative px-6 pb-20 -mt-4">
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
            <h2 className="text-4xl font-black mb-4 text-gray-900 uppercase tracking-tight">Why Stable SMP?</h2>
            <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Small server, real stakes. PvP is live, stealing is fair game — but your builds will never be touched.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${FEATURES.map((feature, idx) => {
              const Icon = Lucide[feature.icon];
              const isLocked = feature.title === 'Create Mod Server';
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
