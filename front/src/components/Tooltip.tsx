export const Tooltip = ({ content, emotion, x, y }: any) => {
  const style = {
    top: y + 'px',
    left: x + 'px',
    zIndex: 9999,
  };

  return (
    <div
      style={style}
      className="absolute p-2 bg-primary text-stone-100 rounded-md pointer-events-none z-50 max-w-md"
    >
      <strong>Message</strong>
      <br />
      {content} <br />
      <strong>Emotion: </strong>
      {emotion}
    </div>
  );
};
