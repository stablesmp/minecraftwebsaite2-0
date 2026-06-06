
import React, { useState } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

export const ApplicationPage = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    discord: '',
    username: '',
    playerDescription: '',
    goals: '',
    playtime: '',
    motivation: '',
    additionalInfo: ''
  });

  const handlePreSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const finalizeSubmission = () => {
    onSubmit(formData);
    setSubmitted(true);
    setShowConfirmModal(false);
    window.scrollTo(0, 0);
  };

  const redirectToRules = () => {
    window.location.hash = 'rules';
    setShowConfirmModal(false);
  };

  if (submitted) {
    return html`
      <div className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full bg-white p-12 rounded-3xl border border-gray-100 shadow-lg text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <${Lucide.CircleCheck} className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Application Sent!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed font-medium">
            Thank you for your application to Stable SMP. Your responses have been registered. 
            A confirmation and future updates will be sent to you on Discord: <strong>${formData.discord}</strong>.
          </p>
          <button 
            onClick=${() => window.location.hash = '#home'}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    `;
  }

  return html`
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">Apply to the Server</h1>
          <p className="text-gray-500 text-lg font-medium">
            Tell us who you are and how you play. We're looking for people who fit the vibe of a tight-knit PvP server.
          </p>
        </div>

        <form onSubmit=${handlePreSubmit} className="space-y-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Discord Username (For updates)</label>
              <div className="relative">
                <${Lucide.MessageCircle} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  required
                  type="text" 
                  value=${formData.discord}
                  onChange=${e => setFormData({...formData, discord: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                  placeholder="username#0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">How old are you?</label>
                <input 
                  required
                  type="number" 
                  value=${formData.age}
                  onChange=${e => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                  placeholder="e.g. 18"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Minecraft Username (IGN)</label>
                <input 
                  required
                  type="text" 
                  value=${formData.username}
                  onChange=${e => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                  placeholder="Your IGN"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">How do you play on PvP servers?</label>
              <textarea
                required
                value=${formData.playerDescription}
                onChange=${e => setFormData({...formData, playerDescription: e.target.value})}
                rows=${3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                placeholder="Fighter, base builder, raider, strategist, lone wolf, alliance player..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">What's your plan when you join?</label>
              <textarea
                required
                value=${formData.goals}
                onChange=${e => setFormData({...formData, goals: e.target.value})}
                rows=${3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                placeholder="Rush gear and start fighting, build a hidden base, form alliances, raid enemies..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">How much do you plan to play?</label>
              <input 
                required
                type="text" 
                value=${formData.playtime}
                onChange=${e => setFormData({...formData, playtime: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                placeholder="e.g. 10 hours a week"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Why do you want to join Stable SMP?</label>
              <textarea
                required
                value=${formData.motivation}
                onChange=${e => setFormData({...formData, motivation: e.target.value})}
                rows=${4}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                placeholder="Why a small PvP server? What are you looking for?"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Anything else we should know?</label>
              <textarea 
                value=${formData.additionalInfo}
                onChange=${e => setFormData({...formData, additionalInfo: e.target.value})}
                rows=${2}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                placeholder="Previous PvP experience, friends on the server, anything relevant..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="flex items-center gap-2 px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all shadow-md"
            >
              SUBMIT APPLICATION
              <${Lucide.ChevronRight} className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>

      ${showConfirmModal && html`
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick=${() => setShowConfirmModal(false)}></div>
          <div className="relative bg-white w-full max-w-md p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <${Lucide.TriangleAlert} className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-center text-gray-900 uppercase tracking-tight mb-4">Wait a second!</h2>
            <p className="text-center text-gray-500 text-sm mb-8 leading-relaxed">
              Have you read and understood the <span className="text-blue-600 font-bold uppercase">Rules</span>? PvP and stealing are allowed — but total destruction of builds results in an instant permanent ban.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick=${finalizeSubmission}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-md uppercase tracking-widest text-xs"
              >
                Yes, I understand and agree
              </button>
              <button 
                onClick=${redirectToRules}
                className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-600 font-black rounded-2xl transition-all border border-gray-200 uppercase tracking-widest text-[10px]"
              >
                No, let me read them again
              </button>
            </div>
          </div>
        </div>
      `}
    </div>
  `;
};
