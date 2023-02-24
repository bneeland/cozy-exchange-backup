const COLORS = {
  gray: 'bg-slate-200',
  white: 'bg-white'
}

export default function Button({ icon, label, callback, color }) {
  return (
    <button onClick={callback} className={`${COLORS[color]} hover:bg-slate-300 px-4 py-2 rounded-2xl border-b-4 active:border-b-0 active:border-t-4 border-slate-300 hover:border-slate-400 flex items-center gap-2 transition-colors`}>
      <div className="text-slate-400">{icon}</div>
      <div className="text-slate-800">{label}</div>
    </button>
  )
}
