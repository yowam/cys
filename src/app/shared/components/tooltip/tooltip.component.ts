import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, Input } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TooltipComponent implements OnInit {
  @Input() tooltipData: TemplateRef<void> | string | false;
  asString: string | false;
  asTemplate: TemplateRef<void> | false;

  ngOnInit() {
    this.asString = typeof this.tooltipData === 'string' ? this.tooltipData : false;
    this.asTemplate = this.tooltipData instanceof TemplateRef ? this.tooltipData : false;
  }
}
