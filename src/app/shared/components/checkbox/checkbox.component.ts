import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string;

  id = uuidv4();
  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  constructor() {}

  ngOnInit() {}

  // Step 4: Define what should happen in this component, if something changes outside
  checked: boolean = false;
  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    // Step 5a: bind the changes to the local value
    this.checked = e;

    // Step 5b: Handle what should happen on the outside, if something changes on the inside
    this.onChange(e);
  }
}
