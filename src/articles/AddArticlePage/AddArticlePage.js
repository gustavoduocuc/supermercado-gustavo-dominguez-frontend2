import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import { Card } from '../../ui/Card/Card';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { SelectField } from '../../ui/SelectField/SelectField';
import { TextField } from '../../ui/TextField/TextField';
import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';
import { productTypes } from '../productTypes';

const emptyDraft = {
  name: '',
  brand: '',
  productType: 'Abarrotes',
  quantity: '1',
};

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
    <section className="flex flex-col gap-section">
      <PageTitle>Agregar artículo</PageTitle>
      <Card className="w-full max-w-form p-4 md:p-6">
        <form className="flex flex-col gap-4" onSubmit={submitArticle}>
          <TextField label="Nombre" name="name" value={draft.name} onChange={updateDraft} />
          <TextField label="Marca" name="brand" value={draft.brand} onChange={updateDraft} />
          <SelectField
            label="Tipo de producto"
            name="productType"
            options={productTypes}
            value={draft.productType}
            onChange={updateDraft}
          />
          <TextField
            label="Unidades"
            min="1"
            name="quantity"
            step="1"
            type="number"
            value={draft.quantity}
            onChange={updateDraft}
          />
          <div>
            <Button type="submit">Agregar</Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
