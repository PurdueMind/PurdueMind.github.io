// Turns a require.context of an asset folder into { 'file.jpg': url }, so new
// photos just need to be dropped into the folder without touching any code.
// require.context itself has to be called with literal arguments in each
// file, so callers create the context and pass it in.
export function buildImageMap(context) {
  const images = {};
  context.keys().forEach((key) => {
    const mod = context(key);
    images[key.replace('./', '')] = mod && mod.default ? mod.default : mod;
  });
  return images;
}
