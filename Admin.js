
import React, { useState } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

export const AdminPage = ({ applications, onUpdateStatus, onDelete }) => {
  const [showAll, setShowAll] = useState(false);

  const handleAccept = (app) => onUpdateStatus(app.id, 'Accepted');
  const handleDeny = (app) => onUpdateStatus(app.id, 'Denied');

  const displayedApps = showAll
    ? applications
    : applications.filter(app => app.status === 'Pending');

  const pendingCount = applications.filter(app => app.status === 'Pending').length;

  return html`
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm font-medium">Review and manage player applications</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick=${() => setShowAll(!showAll)}
              className=${`flex items-center gap-2 px-6 py-3 rounded-2xl border text-xs font-black tracking-widest uppercase transition-all ${
                showAll
                ? 'bg-gray-100 border-gray-200 text-gray-700'
                : 'bg-blue-50 border-blue-200 text-blue-600'
              }`}
            >
              <${Lucide.Filter} className="w-4 h-4" />
              ${showAll ? 'Show Pending Only' : 'Show All History'}
            </button>
            <div className="bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl border border-blue-200 text-xs font-black tracking-widest uppercase">
              ${pendingCount} Pending
            </div>
          </div>
        </div>

        ${displayedApps.length === 0 ? html`
          <div className="bg-white p-20 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <${Lucide.User} className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-400 text-xl font-medium uppercase tracking-tight">
              ${showAll ? 'No applications found.' : 'No pending applications to review.'}
            </p>
          </div>
        ` : html`
          <div className="grid grid-cols-1 gap-6">
            ${displayedApps.sort((a, b) => b.submittedAt - a.submittedAt).map(app => html`
              <div
                key=${app.id}
                className=${`bg-white p-8 rounded-3xl border-l-4 shadow-sm transition-all ${
                  app.status === 'Accepted' ? 'border-l-blue-500' :
                  app.status === 'Denied' ? 'border-l-red-500' : 'border-l-gray-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1 min-w-0 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex-shrink-0 flex items-center justify-center border border-blue-100">
                          <span className="text-2xl font-black text-blue-600">${(app.username || 'U')[0].toUpperCase()}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-2xl font-black text-gray-900 tracking-tight truncate">${app.username || 'Unknown User'}</h3>
                          <span className="text-gray-400 flex items-center gap-1 font-medium text-[10px] tracking-wider">
                            <${Lucide.Clock} className="w-3 h-3" />
                            ${new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className=${`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                        app.status === 'Accepted' ? 'bg-blue-50 text-blue-600' :
                        app.status === 'Denied' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                      }`}>
                        ${app.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Discord</p>
                        <div className="flex items-center gap-2 text-blue-600 font-bold break-all">
                          <${Lucide.MessageCircle} className="w-3 h-3 flex-shrink-0" />
                          ${app.discord}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Age</p>
                        <p className="text-gray-700 font-bold">${app.age} years old</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">About Player</p>
                        <p className="text-gray-600 leading-relaxed font-medium break-words whitespace-pre-wrap">"${app.playerDescription}"</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Goals</p>
                        <p className="text-gray-600 leading-relaxed font-medium break-words whitespace-pre-wrap">${app.goals}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Motivation</p>
                        <p className="text-gray-600 leading-relaxed font-medium break-words whitespace-pre-wrap">${app.motivation}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-400 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Additional Info</p>
                        <p className="text-gray-600 font-medium break-words whitespace-pre-wrap">${app.additionalInfo || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-3 justify-center">
                    <button
                      onClick=${() => handleAccept(app)}
                      className=${`flex-1 lg:flex-none p-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest ${
                        app.status === 'Accepted'
                        ? 'bg-blue-600 text-white cursor-default'
                        : 'bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200'
                      }`}
                    >
                      <${Lucide.CircleCheck} className="w-5 h-5" />
                      Approve
                    </button>
                    <button
                      onClick=${() => handleDeny(app)}
                      className=${`flex-1 lg:flex-none p-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest ${
                        app.status === 'Denied'
                        ? 'bg-red-600 text-white cursor-default'
                        : 'bg-red-50 hover:bg-red-600 text-red-500 hover:text-white border border-red-200'
                      }`}
                    >
                      <${Lucide.CircleX} className="w-5 h-5" />
                      Deny
                    </button>
                    <button
                      onClick=${() => onDelete(app.id)}
                      className="p-4 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all flex items-center justify-center border border-gray-100"
                    >
                      <${Lucide.Trash2} className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            `)}
          </div>
        `}
      </div>
    </div>
  `;
};
