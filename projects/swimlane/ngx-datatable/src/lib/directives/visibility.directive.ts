import {
  Directive, Output, EventEmitter, ElementRef, HostBinding, NgZone, OnInit, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ResizeSensor } from 'css-element-queries';

import { VisibilityService } from '../services/visibility.service';

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)"
 *      (resized)="onResized($event)">
 * 		</div>
 *
 */
@Directive({ selector: '[visibilityObserver]' })
export class VisibilityDirective implements OnInit, OnDestroy {

  @HostBinding('class.visible') 
  isVisible: boolean = false;

  @Output() visible: EventEmitter<any> = new EventEmitter();
  @Output() resized: EventEmitter<any> = new EventEmitter();
  visibleSubscription: Subscription;
  private resizeSensor: ResizeSensor;
  constructor(private element: ElementRef,
              private zone: NgZone,
              private readonly visibilityService: VisibilityService) { }

  ngOnInit(): void {
    this.visibleSubscription = this.visibilityService.observe(this.element.nativeElement)
    .subscribe((visible: boolean) => {
      this.zone.run(() => {
        if (visible) {
          this.isVisible = visible;
          this.visible.emit(true);
        }
      });
    });
    this.resizeSensor = new ResizeSensor(this.element.nativeElement, () => this.resized.emit());
  }

  ngOnDestroy(): void {
    this.visibilityService.unobserve(this.element.nativeElement);
    if (this.visibleSubscription) {
      this.visibleSubscription.unsubscribe();
    }
    if (this.resizeSensor) {
      this.resizeSensor.detach();
    }
  }
}
