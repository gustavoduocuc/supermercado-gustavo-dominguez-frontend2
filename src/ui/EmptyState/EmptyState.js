export function EmptyState(props) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-card border border-dashed bg-surface px-4 py-10 text-center"
      role={props.role}
    >
      <p className="text-base text-muted">{props.message}</p>
      {props.children}
    </div>
  );
}
