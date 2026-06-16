
import React, { useEffect, useRef } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

export const Rules = () => {
  const observerRef = useRef(null);
  const DISCORD_LINK = "https://discord.gg/HSJpT644n";

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

  const gameplayRules = [
    {
      id: 1,
      title: "No Griefing",
      icon: 'Hammer',
      content: "Minimal griefing is allowed — but anything major, like destroying entire builds, is not. It's always okay to steal and loot bases."
    },
    {
      id: 2,
      title: "No Cheating",
      icon: 'ZapOff',
      content: "Cheating is strictly forbidden and results in a permanent ban. This includes hacked clients, X-ray, kill aura, and duping. Quality-of-life clients like Feather and Lunar are allowed."
    },
    {
      id: 3,
      title: "No Exploiting Bugs",
      icon: 'Bug',
      content: "Do not exploit bugs or glitches in any way. Report them to the admins so they can be fixed."
    }
  ];

  const communityRules = [
    {
      id: 4,
      title: "No Advertising",
      icon: 'Megaphone',
      content: "Do not advertise other servers, Discords, YouTube channels, or unrelated content — in chat or in DMs."
    },
    {
      id: 5,
      title: "No Unwanted DMs",
      icon: 'MessageSquareOff',
      content: "Do not send private messages to other players unless they've given you permission."
    },
    {
      id: 6,
      title: "Keep Chat Respectful",
      icon: 'MessageSquare',
      content: "Swearing is allowed, but racism, slurs, and personal attacks are not tolerated. Keep it chill — if someone asks you to stop, stop."
    }
  ];

  const serverRules = [
    {
      id: 7,
      title: "No Spamming",
      icon: 'VolumeX',
      content: "Don't spam chat, commands, or sounds."
    },
    {
      id: 8,
      title: "Staff Decisions Are Final",
      icon: 'Gavel',
      content: "If an admin asks you to stop doing something, listen. You can always discuss it with another staff member on Discord — but don't argue in-game chat."
    },
    {
      id: 9,
      title: "Have Fun!",
      icon: 'PartyPopper',
      content: "Headbound is a community — be the kind of player you'd want to play with. 🎮"
    }
  ];

  const fieldNotes = [
    "No combat logging",
    "No lag machines",
    "No autoclickers",
    "No staff begging",
    "No alt accounts",
    "No impersonation",
    "No doxxing",
    "No chargebacks",
    "Keep chat English"
  ];

  const SectionHeader = ({ title, icon }) => html`
    <div className="flex items-center gap-4 mb-12 reveal">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
      <div className="flex items-center gap-3 px-6 py-2 bg-gray-50 rounded-full border border-gray-200">
        <span className="text-blue-500">${icon}</span>
        <h2 className="text-xs font-black text-gray-700 tracking-[0.3em] uppercase">${title}</h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200"></div>
    </div>
  `;

  const RuleCard = ({ item, idx }) => {
    const Icon = Lucide[item.icon];
    return html`
      <div
        className="reveal bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-500 group flex flex-col h-full"
        style=${{ transitionDelay: `${idx * 80}ms` }}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="p-4 bg-blue-50 rounded-[1.25rem] group-hover:bg-blue-100 transition-colors duration-500 group-hover:scale-110">
            <${Icon} className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[40px] font-black text-gray-100 group-hover:text-blue-100 transition-colors italic">
            ${String(item.id).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
          ${item.title}
        </h3>
        <p className="text-gray-500 font-medium leading-relaxed text-[13px] flex-1">${item.content}</p>
      </div>
    `;
  };

  return html`
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-24 reveal">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
            The <span className="text-green-glow">Codex</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Few rules, real consequences. Fight freely, steal smartly — but never destroy what others have built.
          </p>
        </div>

        <${SectionHeader} title="Gameplay Laws" icon=${html`<${Lucide.Sword} className="w-4 h-4" />`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          ${gameplayRules.map((item, idx) => html`<${RuleCard} key=${item.id} item=${item} idx=${idx} />`)}
        </div>

        <${SectionHeader} title="Social Standards" icon=${html`<${Lucide.Users} className="w-4 h-4" />`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          ${communityRules.map((item, idx) => html`<${RuleCard} key=${item.id} item=${item} idx=${idx} />`)}
        </div>

        <${SectionHeader} title="Server Standards" icon=${html`<${Lucide.Shield} className="w-4 h-4" />`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          ${serverRules.map((item, idx) => html`<${RuleCard} key=${item.id} item=${item} idx=${idx} />`)}
        </div>

        <!-- ── Field Notes (quick rules) ── -->
        <div className="reveal mb-24 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
            <div className="flex items-center gap-3 px-6 py-2 bg-gray-50 rounded-full border border-gray-200">
              <${Lucide.NotebookPen} className="w-4 h-4 text-blue-500" />
              <h2 className="text-xs font-black text-gray-700 tracking-[0.3em] uppercase">Other Small Gameplay Rules</h2>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200"></div>
          </div>
          <ul className="bg-white rounded-[2rem] border border-gray-100 shadow-sm divide-y divide-gray-100">
            ${fieldNotes.map((note, idx) => html`
              <li key=${idx} className="px-8 py-4 text-gray-600 font-bold text-sm">
                ${note}
              </li>
            `)}
          </ul>
        </div>

        <div className="reveal max-w-3xl mx-auto">
          <div className="bg-blue-600 p-12 rounded-[3rem] text-center shadow-xl shadow-blue-600/20">
            <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Need Clarification?</h3>
            <p className="text-blue-100 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              Our staff are available on Discord to discuss any specific scenarios or rule interpretations.
            </p>
            <a
              href=${DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white hover:bg-blue-50 text-blue-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-md"
            >
              <${Lucide.MessageSquare} className="w-4 h-4" />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
};
