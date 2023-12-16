import { COLORS } from '../consts';
import { getContrastYIQ } from '../utils';

export const Legend = () => {
  return (
    <div className="flex flex-wrap">
      {Object.entries(COLORS).map(([key, value]) => (
        <div
          key={key}
          style={{
            color: getContrastYIQ(value),
            backgroundColor: value,
            flexBasis: '5%',
            flexGrow: 1,
            padding: 2,
            textAlign: 'center',
          }}
        >
          {key}
        </div>
      ))}
    </div>
  );
};
