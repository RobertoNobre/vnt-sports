import { Enum } from 'enumify';

class RideInGroup extends Enum {}
export default RideInGroup.initEnum(
  {
    'ALWAYS': { value: 'Always' },
    'SOMETIMES': { value: 'Sometimes' },
    'NEVER': { value: 'Never' }
  }
);

export const RideInGroupCombo =
  RideInGroup.enumValues.map((item) => ({id: item.ordinal, name: item.name, value: item.value}));