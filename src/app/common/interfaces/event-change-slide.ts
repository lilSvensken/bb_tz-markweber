import { EventChangeSlideType } from '@common/enums/event-change-slide-type';

export interface EventChangeSlide {
  eventType: EventChangeSlideType;
  currentVideoIndex: number;
}
