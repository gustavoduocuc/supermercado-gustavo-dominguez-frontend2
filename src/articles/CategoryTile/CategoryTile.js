import { getCategoryTone } from '../categoryTone';

const baseClass = 'flex items-center justify-center font-bold';

const sizeClasses = {
  small: 'size-12 rounded-control text-xl',
  large: 'h-32 w-full rounded-card text-5xl',
};

export function CategoryTile(props) {
  const tone = getCategoryTone(props.productType);
  const sizeClass = sizeClasses[props.size ?? 'large'];

  return (
    <div className={`${baseClass} ${sizeClass} ${tone.toneClass}`} aria-hidden="true">
      {tone.initial}
    </div>
  );
}
