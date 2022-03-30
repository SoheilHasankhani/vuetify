import { computed, defineComponent } from "vue";
import type { ComputedRef } from 'vue'

import { VCalendarWeekly } from "./VCalendarWeekly";
import { CalendarTimestamp, getEndOfMonth, getStartOfMonth, parseTimestamp } from "@/composables/calendar/timestamp";
// import type { CalendarCategory } from '@/composables/calendar/timestamp'
import { makeTimesProps } from "./composables/times";
import { makeBaseProps, makeWeeksProps } from "./composables/props";
import { makeThemeProps } from "@/composables/theme";
import { makeVariantProps } from "@/composables/variant";

export const VCalendarMonthly = defineComponent({
  name: 'VCalendarMonthly',
  props: {
    categories: Array,
    maxDays: Number,
    ...makeTimesProps(),
    ...makeBaseProps(),
    ...makeWeeksProps(),
    ...makeThemeProps(),
    ...makeVariantProps()
  },
  setup(props, { attrs, slots }) {
    // Computeds
    const staticClass: ComputedRef<string> = computed(() => {
      return 'v-calendar-monthly v-calendar-weekly'
    })

    const parsedStart: ComputedRef<CalendarTimestamp> = computed(() => {
      return getStartOfMonth(parseTimestamp(props.start, true))
    })

    const parsedEnd: ComputedRef<CalendarTimestamp> = computed(() => {
      return getEndOfMonth(parseTimestamp(props.end, true))
    })
    
    const thisProps = {...props, start: props.start, end: props.end, parsedStart: parsedStart.value, parsedEnd: parsedEnd.value}
    return () => (
      <div>
        Monthly
        <VCalendarWeekly class={staticClass} { ...thisProps }></VCalendarWeekly>
      </div>
    )
   
    
  }

})

export type VCalendarMonthly = InstanceType<typeof VCalendarMonthly>
