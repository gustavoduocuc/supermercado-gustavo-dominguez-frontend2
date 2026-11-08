export function CategoryChip(props) {
  return (
    <span className="inline-flex items-center rounded-pill bg-accent-soft px-3 py-0.5 text-sm font-semibold text-accent">
      {props.productType}
    </span>
  );
}
