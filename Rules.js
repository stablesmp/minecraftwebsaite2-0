
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
      title: "PvP is ON",
      icon: 'Sword',
      content: html`
        <div className="space-y-4">
          <p>Stable SMP is a full PvP server. Combat is part of daily life here — be ready.</p>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:border-blue-200 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <h4 className="font-black text-blue-600 text-[10px] tracking-widest uppercase">Combat Rules</h4>
            </div>
            <ul className="text-[11px] text-gray-500 space-y-2 list-none leading-relaxed">
              <li>• <strong className="text-gray-800">Open PvP:</strong> You can attack any player at any time, anywhere on the map. No rules against it.</li>
              <li>• <strong className="text-gray-800">Stealing allowed:</strong> Looting unprotected chests and items from fallen players is completely fair game.</li>
              <li>• <strong className="text-gray-800">No spawn killing:</strong> Repeatedly killing someone at their spawn point is considered harassment and is not allowed.</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      id: 2,
      title: "Minimal Griefing Only",
      icon: 'Shield',
      content: "Small-scale griefing is part of the game — breaking a wall to loot a chest or blowing open a door is fair play. What is NOT allowed is total destruction: levelling someone's entire base, mass TNT bombing, or wiping out hours of someone's work. Use common sense. Total annihilation = permanent ban."
    },
    {
      id: 3,
      title: "No Cheating / Unfair Mods",
      icon: 'ZapOff',
      content: "Keep it fair. X-Ray, fly hacks, auto-clickers, or any hacked client will get you permanently blacklisted. Only performance mods (Sodium) and visual mods (Shaders) are allowed."
    }
  ];

  const communityRules = [
    {
      id: 4,
      title: "Keep it Civil",
      icon: 'MessageSquare',
      content: "Rivalry is fun, but harassment is not. Trash talk is fine — personal attacks, real-life threats, and targeted bullying will get you removed. There's a difference between in-game enemies and being an actual jerk."
    },
    {
      id: 5,
      title: "20–35 Players Max",
      icon: 'Users',
      content: "The server cap exists for a reason — we want everyone to know each other. Participate, interact, and be part of the community. Lurkers who never engage will lose their whitelist spot."
    },
    {
      id: 6,
      title: "No Spam or Ads",
      icon: 'Globe',
      content: "Don't advertise other servers or services. Keep chat relevant and readable. Spam clutters the experience for everyone."
    }
  ];

  const securityRules = [
    {
      id: 7,
      title: "Whitelisted Entry",
      icon: 'Shield',
      content: "Our IP (stablesv.falix.gg) is public, but access is exclusively for whitelisted members. Do not attempt to bypass security or exploit server access. Each whitelist spot is personal."
    },
    {
      id: 8,
      title: "Zero Tolerance Policy",
      icon: 'Ban',
      content: html`
        <div className="space-y-4">
          <p>Admins hold the scales of justice. We have zero tolerance for malice:</p>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl border border-blue-100">
                <span className="text-[10px] font-black text-blue-700 uppercase">Minor Offense</span>
                <span className="text-[10px] font-bold text-blue-600">Formal Warning</span>
            </div>
            <div className="flex items-center justify-between bg-orange-50 p-3 rounded-xl border border-orange-100">
              <span className="text-[10px] font-black text-orange-600 uppercase">Total Destruction / Mass Griefing</span>
              <span className="text-[10px] font-bold text-orange-500">Instant Permanent Ban</span>
            </div>
            <div className="flex items-center justify-between bg-red-50 p-3 rounded-xl border border-red-100">
              <span className="text-[10px] font-black text-red-600 uppercase">Hacking / Cheating</span>
              <span className="text-[10px] font-bold text-red-500">Instant Permanent Ban</span>
            </div>
          </div>
        </div>
      `
    }
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
        style=${{ transitionDelay: `${idx * 100}ms` }}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="p-4 bg-blue-50 rounded-[1.25rem] group-hover:bg-blue-100 transition-colors duration-500 group-hover:scale-110">
            <${Icon} className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-[40px] font-black text-gray-100 group-hover:text-blue-100 transition-colors italic">0${item.id}</span>
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
          ${item.title}
        </h3>
        <div className="text-gray-500 font-medium leading-relaxed text-[13px] flex-1">
          ${item.content}
        </div>
      </div>
    `;
  };

  return html`
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black text-red-600 uppercase tracking-tighter animate-pulse">
            ⚠ OUTDATED RULES ⚠
          </h2>
          <p className="text-red-400 font-bold mt-2 text-sm uppercase tracking-widest">These rules are no longer up to date</p>
        </div>
        <div className="text-center mb-24 reveal">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
            The <span className="text-green-glow">Codex</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Few rules, real consequences. Fight freely, steal smartly — but never destroy what others have built.
          </p>
        </div>

        <${SectionHeader} title="Gameplay Laws" icon=${html`<${Lucide.Heart} className="w-4 h-4" />`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          ${gameplayRules.map((item, idx) => html`<${RuleCard} key=${item.id} item=${item} idx=${idx} />`)}
        </div>

        <${SectionHeader} title="Social Standards" icon=${html`<${Lucide.Users} className="w-4 h-4" />`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          ${communityRules.map((item, idx) => html`<${RuleCard} key=${item.id} item=${item} idx=${idx} />`)}
        </div>

        <${SectionHeader} title="Security & Compliance" icon=${html`<${Lucide.Shield} className="w-4 h-4" />`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          ${securityRules.map((item, idx) => html`<${RuleCard} key=${item.id} item=${item} idx=${idx} />`)}
        </div>

        <div className="reveal mt-32 max-w-3xl mx-auto">
          <div className="bg-blue-600 p-12 rounded-[3rem] text-center shadow-xl shadow-blue-600/20">
            <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Need Clarification?</h3>
            <p className="text-blue-100 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              Our High Council (Admins) are available on Discord to discuss any specific scenarios or rule interpretations.
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
