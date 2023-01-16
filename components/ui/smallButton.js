const COLORS = {
  gray: 'bg-slate-100',
  white: 'bg-white'
}

export default function SmallButton({ icon, callback, color }) {
  return (
    <button onClick={callback} className={`${COLORS[color]} hover:bg-slate-200 p-1 rounded-md border-b-4 active:border-b-0 active:border-t-4 border-slate-200 hover:border-slate-300 flex items-center transition-colors`}>
      {icon}
    </button>
  )
}
