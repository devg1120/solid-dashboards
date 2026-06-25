import { NumberField } from "@kobalte/core/number-field";
import { ArrowUpIcon } from 'lucide-solid';
import { ArrowDownIcon } from 'lucide-solid';

import "./style.css";
export function NumberField_() {
  return (
    <NumberField class="number-field">
      <NumberField.Label class="number-field__label">
        Quantity
      </NumberField.Label>
      <div class="number-field__group">
        <NumberField.Input class="number-field__input" />
        <NumberField.IncrementTrigger aria-label="Increment" class="number-field__increment"><ArrowUpIcon/></NumberField.IncrementTrigger>
        <NumberField.DecrementTrigger aria-label="Decrement" class="number-field__decrement"><ArrowDownIcon/></NumberField.DecrementTrigger>
      </div>
    </NumberField>
  );
}
