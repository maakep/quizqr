type Style = React.CSSProperties;

const merged = (...styleObjects: Style[]): Style => {
  const merged = Object.assign({}, ...styleObjects);
  return merged;
}
export default merged;

export const center: Style = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}
export const text: Style = {
  padding: 10,
  fontSize: '3rem',
}
export const error: Style = merged({
  color: '#ff8b8b',
  textTransform: 'uppercase'
}, text);
export const input: Style = {
  padding: 10,
  height: 130,
  fontSize: '3rem',
  width: '90%',
  border: 'none',
  borderBottom: '1px solid black',
  textAlign: 'center'
}
export const button: Style = {
  height: 100,
  width: '80%',
  alignSelf: 'center',
  fontSize: '3rem',
  margin: 20,
}
