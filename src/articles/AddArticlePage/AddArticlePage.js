import { useState } from 'react';
import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';

const emptyDraft = {
  name: '',
  brand: '',
  productType: '',
};

const fieldClass =
  'rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-base text-[var(--color-text)]';
const labelClass = 'flex flex-col gap-1 text-sm';

export function AddArticlePage() {
  const inventory = useArticleInventory();
  const [draft, setDraft] = useState(emptyDraft);

  function updateDraft(event) {
    const field = event.target.name;
    const value = event.target.value;
    setDraft(function replaceField(currentDraft) {
      return { ...currentDraft, [field]: value };
    });
  }

  function submitArticle(event) {
    event.preventDefault();
    inventory.addArticle({
      name: draft.name,
      brand: draft.brand,
      productType: draft.productType,
    });
    setDraft(function clearDraft() {
      return { name: '', brand: '', productType: '' };
    });
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl">Agregar artículo</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={submitArticle}>
        <label className={labelClass}>
          Nombre
          <input
            className={fieldClass}
            name="name"
            value={draft.name}
            onChange={updateDraft}
          />
        </label>
        <label className={labelClass}>
          Marca
          <input
            className={fieldClass}
            name="brand"
            value={draft.brand}
            onChange={updateDraft}
          />
        </label>
        <label className={labelClass}>
          Tipo de producto
          <input
            className={fieldClass}
            name="productType"
            value={draft.productType}
            onChange={updateDraft}
          />
        </label>
        <button
          className="min-h-11 self-start rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-[var(--color-surface)]"
          type="submit"
        >
          Agregar
        </button>
      </form>
    </section>
  );
}
