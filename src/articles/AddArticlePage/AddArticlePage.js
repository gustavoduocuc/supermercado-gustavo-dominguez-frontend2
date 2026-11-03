import { useState } from 'react';
import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';

const emptyDraft = {
  name: '',
  brand: '',
  productType: '',
};

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
      return emptyDraft;
    });
  }

  return (
    <section>
      <h1>Agregar artículo</h1>
      <form onSubmit={submitArticle}>
        <label>
          Nombre
          <input name="name" value={draft.name} onChange={updateDraft} />
        </label>
        <label>
          Marca
          <input name="brand" value={draft.brand} onChange={updateDraft} />
        </label>
        <label>
          Tipo de producto
          <input
            name="productType"
            value={draft.productType}
            onChange={updateDraft}
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
    </section>
  );
}
