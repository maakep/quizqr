type Style = React.CSSProperties;

const merged = (...styleObjects: Style[]): Style => {
    const merged = Object.assign({}, ...styleObjects);
    return merged;
}
export default merged;

export const center: Style = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
}
export const text: Style = {
    padding: 10,
}
export const error: Style = merged({
    color: '#ff8b8b',
    textTransform: 'uppercase'
}, text);
export const input: Style = {
    padding: 10,
}