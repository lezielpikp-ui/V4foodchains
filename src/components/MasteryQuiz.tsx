import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Printer, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS, HERO_IMAGE } from '../data/ecosystemData';
import { soundFx } from '../utils/audio';

interface MasteryQuizProps {
  onObjectiveAchieved: (id: number) => void;
  onAllCompleted: () => void;
}

export const MasteryQuiz: React.FC<MasteryQuizProps> = ({
  onObjectiveAchieved,
  onAllCompleted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [studentName, setStudentName] = useState('Junior Ecologist');

  const question = QUIZ_QUESTIONS[currentQuestionIndex];
  const userChoice = selectedAnswers[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing after revealing
    soundFx.playClick();
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });
    setShowExplanation(true);

    const isCorrect = optionIndex === question.correctAnswer;
    if (isCorrect) {
      soundFx.playCorrect();
      // Mark corresponding curriculum objective
      onObjectiveAchieved(question.objectiveIndex);
    } else {
      soundFx.playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    setShowExplanation(false);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
      soundFx.playStar();
      onAllCompleted();
    }
  };

  const handleRestartQuiz = () => {
    soundFx.playClick();
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsQuizFinished(false);
  };

  // Calculate final score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIndex, answer]) => answer === QUIZ_QUESTIONS[Number(qIndex)].correctAnswer
  ).length;

  const scorePercentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {!isQuizFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Primary Science Exam Mastery Quiz
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </h2>
            </div>

            <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
              Objective {question.objectiveIndex}: {question.objectiveTitle}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {question.options.map((opt, optIdx) => {
                const isSelected = userChoice === optIdx;
                const isCorrect = optIdx === question.correctAnswer;

                let buttonClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                if (showExplanation) {
                  if (isCorrect) {
                    buttonClass = 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-semibold';
                  } else if (isSelected) {
                    buttonClass = 'bg-rose-100/80 border-rose-500 text-rose-950';
                  } else {
                    buttonClass = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={showExplanation}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${buttonClass}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-white/80 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 animate-in fade-in">
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Explanation & Learning Point:</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {question.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'See Certificate' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        /* Certificate & Results Screen */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-4 border-amber-300/80 shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl" />

            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-sm">
                <img
                  src={HERO_IMAGE}
                  alt="Ecosystem Seal"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-sm">
                🏆
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                Certificate of Primary Science Achievement
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Junior Ecologist Award
              </h2>
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              This certificate confirms successful mastery of living organisms, energy sources, producers, consumers, predator-prey relationships, food chains, and ecosystem interdependence!
            </p>

            <div className="max-w-xs mx-auto text-left">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Student Name:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-center px-4 py-2 border-2 border-emerald-400 rounded-xl text-base font-bold text-slate-900 bg-emerald-50/40 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="Enter your name"
              />
            </div>

            {/* Score Pill */}
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-50 border border-emerald-300 rounded-2xl">
              <span className="text-xs font-bold text-emerald-800">Final Exam Score:</span>
              <span className="text-lg font-mono font-extrabold text-emerald-950">
                {correctCount} / {QUIZ_QUESTIONS.length} ({scorePercentage}%)
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
