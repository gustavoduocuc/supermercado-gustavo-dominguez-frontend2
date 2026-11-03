import { useState } from 'react';
import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';

const productTypes = [
  'Abarrotes',
  'Bebidas',
  'Carnes',
  'Congelados',
  'Frescos',
  'Higiene',
  'Lácteos',
  'Limpieza',
  'Panadería',
  'Otros',
];

const emptyDraft = {
  name: '',
  brand: '',
  productType: 'Abarrotes',
  quantity: '1',
};

const fieldClass =
  'rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-base text-[var(--color-text)]';
const labelClass = 'flex flex-col gap-1 text-sm';

function isPositiveInteger(value) {
  return /^\d+$/.test(value) && Number(value) >= 1;
}

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
    if (!isPositiveInteger(draft.quantity)) {
      return;
    }
    inventory.addArticle({
      name: draft.name,
      brand: draft.brand,
      productType: draft.productType,
      quantity: Number(draft.quantity),
    });
    setDraft(function clearDraft() {
      return {
        name: '',
        brand: '',
        productType: 'Abarrotes',
        quantity: '1',
      };
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
          <select
            className={fieldClass}
            name="productType"
            value={draft.productType}
            onChange={updateDraft}
          >
            {productTypes.map(function renderType(productType) {
              return (
                <option key={productType} value={productType}>
                  {productType}
                </option>
              );
            })}
          </select>
        </label>
        <label className={labelClass}>
          Unidades
          <input
            className={fieldClass}
            min="1"
            name="quantity"
            step="1"
            type="number"
            value={draft.quantity}
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
