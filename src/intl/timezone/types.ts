import timezonesData from './data/timezones.json' with { type: 'json' };
import zoneToCCData from './data/zoneToCC.json' with { type: 'json' };
import CCToCountryNameData from './data/CCToCountryName.json' with {
  type: 'json',
};
export type ZoneToCC = typeof zoneToCCData

export type CCToCountryNameType = typeof CCToCountryNameData

export type TimezonesType = typeof timezonesData

type TimezoneOption<Value extends string | undefined, Label extends string> = {
  value: Value
  label: Label
  offset: string
  time: string
}

export type SelectTimezoneOption<Value extends string | undefined = string> =
  TimezoneOption<Value, string>
